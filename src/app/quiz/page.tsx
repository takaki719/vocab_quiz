'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuiz } from '@/hooks/useQuiz';
import QuizCard from '@/components/QuizCard';
import ProgressBar from '@/components/ProgressBar';
import CurrentStats from '@/components/CurrentStats';

export default function Quiz() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reviewMode = searchParams.get('mode') === 'review';
  
  const {
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
    getCurrentStats
  } = useQuiz(reviewMode);

  // クイズが完了したら結果ページへ
  useEffect(() => {
    if (quizState.isCompleted) {
      const result = getResult();
      localStorage.setItem('quiz-result', JSON.stringify(result));
      router.push('/result');
    }
  }, [quizState.isCompleted, getResult, router]);

  // 問題が読み込まれていない場合
  if (quizState.questions.length === 0) {
    return (
      <div className="max-w-lg mx-auto text-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">問題を読み込み中...</p>
        </div>
      </div>
    );
  }

  // 復習モードで問題がない場合
  if (reviewMode && quizState.questions.length === 0) {
    return (
      <div className="max-w-lg mx-auto text-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            復習する問題がありません
          </h2>
          <p className="text-gray-600 mb-6">
            まずは通常モードでクイズに挑戦してみましょう！
          </p>
          <button
            onClick={() => router.push('/')}
            className="btn-primary"
          >
            ホームへ戻る
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {reviewMode ? '🔁 復習モード' : '📝 クイズモード'}
          </h2>
          <button
            onClick={() => router.push('/')}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← ホームへ戻る
          </button>
        </div>
        
        <ProgressBar 
          current={quizState.currentQuestionIndex + 1} 
          total={quizState.questions.length}
        />
        
        <CurrentStats {...getCurrentStats()} />
      </div>

      <QuizCard
        question={currentQuestion}
        userAnswer={currentAnswer}
        onAnswerChange={setCurrentAnswer}
        onSubmit={submitAnswer}
        onSkip={skipQuestion}
        feedback={feedback}
        onNext={nextQuestion}
        timeLeft={timeLeft}
        isTimerActive={isTimerActive}
      />

      {reviewMode && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            💡 復習モード: 以前間違えた問題を再挑戦中
          </p>
        </div>
      )}
    </div>
  );
}