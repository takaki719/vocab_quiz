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
  const [timeLeft, setTimeLeft] = useState(10);
  const [isTimerActive, setIsTimerActive] = useState(false);

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
      
      // タイマーを開始
      if (questions.length > 0) {
        setTimeLeft(5);
        setIsTimerActive(true);
      }
    };

    initializeQuiz();
  }, [reviewMode]);

  // タイマー管理
  useEffect(() => {
    if (!isTimerActive || timeLeft === 0) return;

    const timer = setTimeout(() => {
      if (timeLeft === 1) {
        // タイムアウト - 自動的に間違いとして処理
        handleTimeout();
      } else {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isTimerActive, timeLeft]);

  // タイムアウト処理
  const handleTimeout = () => {
    setIsTimerActive(false);
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

    // 状態を更新（不正解として扱う）
    const newUserAnswers = [...quizState.userAnswers];
    const newCorrectAnswers = [...quizState.correctAnswers];
    
    newUserAnswers[quizState.currentQuestionIndex] = 'タイムアウト';
    newCorrectAnswers[quizState.currentQuestionIndex] = false;

    setQuizState(prev => ({
      ...prev,
      userAnswers: newUserAnswers,
      correctAnswers: newCorrectAnswers
    }));

    // すぐに復習問題として保存
    saveIncorrectAnswer(currentQuestion);

    // フィードバックを表示
    setFeedback({
      show: true,
      isCorrect: false,
      correctAnswer: currentQuestion.answer
    });
  };

  // 答えを提出
  const submitAnswer = () => {
    setIsTimerActive(false);
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

    // 間違いの場合はすぐに復習問題として保存
    if (!isCorrect) {
      saveIncorrectAnswer(currentQuestion);
    }

    // フィードバックを表示
    setFeedback({
      show: true,
      isCorrect,
      correctAnswer: currentQuestion.answer
    });
  };

  // わからない（スキップ）
  const skipQuestion = () => {
    setIsTimerActive(false);
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

    // すぐに復習問題として保存
    saveIncorrectAnswer(currentQuestion);

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
      // 新しい問題のタイマーを開始
      setTimeLeft(5);
      setIsTimerActive(true);
    }
  };

  // 間違った問題を即座に保存
  const saveIncorrectAnswer = (question: VocabQuestion) => {
    const saved = localStorage.getItem(STORAGE_KEY);
    let incorrectQuestions: VocabQuestion[] = saved ? JSON.parse(saved) : [];
    
    // 重複を避けるため、同じ問題が既に存在するかチェック
    const exists = incorrectQuestions.some(q => 
      q.answer === question.answer && q.sentence === question.sentence
    );
    
    if (!exists) {
      incorrectQuestions.push(question);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(incorrectQuestions));
    }
  };

  // 間違った問題を保存（クイズ完了時用・既存互換性のため残す）
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

  // 現在の統計を取得
  const getCurrentStats = () => {
    const answeredQuestions = quizState.currentQuestionIndex;
    const correctCount = quizState.correctAnswers.slice(0, answeredQuestions).filter(Boolean).length;
    const accuracy = answeredQuestions > 0 ? Math.round((correctCount / answeredQuestions) * 100) : 0;
    
    return {
      answered: answeredQuestions,
      correct: correctCount,
      accuracy,
      total: quizState.questions.length
    };
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
    timeLeft,
    isTimerActive,
    submitAnswer,
    skipQuestion,
    nextQuestion,
    getResult,
    getCurrentStats,
    hasIncorrectAnswers,
    resetQuiz
  };
}