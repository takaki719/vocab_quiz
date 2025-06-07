'use client';

import { useState, useEffect } from 'react';
import { VocabQuestion, QuizState, QuizResult } from '@/types/vocab';
import { shuffleArray } from '@/utils/shuffle';
import vocabData from '@/data/vocab.json';

const STORAGE_KEY = 'vocab-quiz-incorrect-answers';

export function useQuiz(reviewMode: boolean = false) {
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    correctAnswers: [],
    isCompleted: false,
    reviewMode
  });

  const [currentAnswer, setCurrentAnswer] = useState('');
  const [feedback, setFeedback] = useState<{
    show: boolean;
    isCorrect: boolean;
    correctAnswer?: string;
  }>({ show: false, isCorrect: false });

  // クイズの初期化
  useEffect(() => {
    const initializeQuiz = () => {
      let questions: VocabQuestion[] = [];
      
      if (reviewMode) {
        // 復習モード：保存された間違った問題を読み込み
        const savedIncorrectAnswers = localStorage.getItem(STORAGE_KEY);
        if (savedIncorrectAnswers) {
          questions = JSON.parse(savedIncorrectAnswers);
        }
      } else {
        // 通常モード：vocab.jsonから問題を変換
        questions = Object.entries(vocabData).map(([answer, sentence]) => ({
          answer,
          sentence
        }));
        questions = shuffleArray(questions);
      }

      setQuizState(prev => ({
        ...prev,
        questions,
        userAnswers: new Array(questions.length).fill(''),
        correctAnswers: new Array(questions.length).fill(false)
      }));
    };

    initializeQuiz();
  }, [reviewMode]);

  // 答えを提出
  const submitAnswer = () => {
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    const isCorrect = currentAnswer.toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim();

    // 状態を更新
    const newUserAnswers = [...quizState.userAnswers];
    const newCorrectAnswers = [...quizState.correctAnswers];
    
    newUserAnswers[quizState.currentQuestionIndex] = currentAnswer;
    newCorrectAnswers[quizState.currentQuestionIndex] = isCorrect;

    setQuizState(prev => ({
      ...prev,
      userAnswers: newUserAnswers,
      correctAnswers: newCorrectAnswers
    }));

    // フィードバックを表示
    setFeedback({
      show: true,
      isCorrect,
      correctAnswer: currentQuestion.answer
    });
  };

  // わからない（スキップ）
  const skipQuestion = () => {
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

    // 状態を更新（不正解として扱う）
    const newUserAnswers = [...quizState.userAnswers];
    const newCorrectAnswers = [...quizState.correctAnswers];
    
    newUserAnswers[quizState.currentQuestionIndex] = 'わからない';
    newCorrectAnswers[quizState.currentQuestionIndex] = false;

    setQuizState(prev => ({
      ...prev,
      userAnswers: newUserAnswers,
      correctAnswers: newCorrectAnswers
    }));

    // フィードバックを表示
    setFeedback({
      show: true,
      isCorrect: false,
      correctAnswer: currentQuestion.answer
    });
  };

  // 次の問題へ
  const nextQuestion = () => {
    const nextIndex = quizState.currentQuestionIndex + 1;
    
    if (nextIndex >= quizState.questions.length) {
      // クイズ完了
      setQuizState(prev => ({ ...prev, isCompleted: true }));
      saveIncorrectAnswers();
    } else {
      // 次の問題へ
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: nextIndex
      }));
      setCurrentAnswer('');
      setFeedback({ show: false, isCorrect: false });
    }
  };

  // 間違った問題を保存
  const saveIncorrectAnswers = () => {
    const incorrectQuestions = quizState.questions.filter((_, index) => 
      !quizState.correctAnswers[index]
    );
    
    if (incorrectQuestions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(incorrectQuestions));
    }
  };

  // 結果を計算
  const getResult = (): QuizResult => {
    const correctCount = quizState.correctAnswers.filter(Boolean).length;
    const incorrectQuestions = quizState.questions.filter((_, index) => 
      !quizState.correctAnswers[index]
    );

    return {
      totalQuestions: quizState.questions.length,
      correctCount,
      incorrectQuestions,
      accuracy: Math.round((correctCount / quizState.questions.length) * 100)
    };
  };

  // 復習モードで利用可能な問題があるかチェック
  const hasIncorrectAnswers = (): boolean => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).length > 0 : false;
  };

  // クイズをリセット
  const resetQuiz = () => {
    setQuizState({
      questions: [],
      currentQuestionIndex: 0,
      userAnswers: [],
      correctAnswers: [],
      isCompleted: false,
      reviewMode: false
    });
    setCurrentAnswer('');
    setFeedback({ show: false, isCorrect: false });
  };

  return {
    quizState,
    currentAnswer,
    setCurrentAnswer,
    feedback,
    submitAnswer,
    skipQuestion,
    nextQuestion,
    getResult,
    hasIncorrectAnswers,
    resetQuiz
  };
}