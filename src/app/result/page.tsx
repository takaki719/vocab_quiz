'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuizResult } from '@/types/vocab';
import ResultStats from '@/components/ResultStats';

export default function Result() {
  const router = useRouter();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [hasIncorrectAnswers, setHasIncorrectAnswers] = useState(false);

  useEffect(() => {
    // 結果データを読み込み
    const savedResult = localStorage.getItem('quiz-result');
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    } else {
      // 結果データがない場合はホームへリダイレクト
      router.push('/');
      return;
    }

    // 復習可能な問題があるかチェック
    const checkIncorrectAnswers = () => {
      const saved = localStorage.getItem('vocab-quiz-incorrect-answers');
      if (saved) {
        const questions = JSON.parse(saved);
        setHasIncorrectAnswers(questions.length > 0);
      }
    };

    checkIncorrectAnswers();
  }, [router]);

  const handleReviewMode = () => {
    router.push('/quiz?mode=review');
  };

  const handleHome = () => {
    // 結果データをクリア
    localStorage.removeItem('quiz-result');
    router.push('/');
  };

  const handleClearReviewQuestions = () => {
    // 復習問題をクリア
    localStorage.removeItem('vocab-quiz-incorrect-answers');
    setHasIncorrectAnswers(false);
  };

  if (!result) {
    return (
      <div className="max-w-lg mx-auto text-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">結果を読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ResultStats
        result={result}
        onReviewMode={handleReviewMode}
        onHome={handleHome}
        hasIncorrectAnswers={hasIncorrectAnswers}
        onClearReviewQuestions={handleClearReviewQuestions}
      />

      {/* 詳細結果（オプション） */}
      {result.incorrectQuestions.length > 0 && (
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              間違えた問題 ({result.incorrectQuestions.length}問)
            </h3>
            <div className="space-y-3">
              {result.incorrectQuestions.map((question, index) => (
                <div key={index} className="border-l-4 border-red-300 pl-4 py-2">
                  <p className="text-gray-700 text-sm mb-1">
                    {question.sentence}
                  </p>
                  <p className="text-red-600 font-semibold text-sm">
                    正解: {question.answer}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                💡 復習モードでこれらの問題を再挑戦できます
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}