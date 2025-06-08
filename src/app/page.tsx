'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';

export default function Home() {
  const router = useRouter();
  const [hasReviewQuestions, setHasReviewQuestions] = useState(false);

  useEffect(() => {
    // 復習可能な問題があるかチェック
    const checkReviewQuestions = () => {
      const saved = localStorage.getItem('vocab-quiz-incorrect-answers');
      if (saved) {
        const questions = JSON.parse(saved);
        setHasReviewQuestions(questions.length > 0);
      } else {
        setHasReviewQuestions(false);
      }
    };

    checkReviewQuestions();

    // ページがフォーカスされた時に再チェック（他のページから戻ってきた時）
    const handleFocus = () => checkReviewQuestions();
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const startNormalQuiz = () => {
    router.push('/quiz');
  };

  const startReviewQuiz = () => {
    router.push('/quiz?mode=review');
  };

  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            📘 Vocab Quiz
          </h2>
          <p className="text-gray-600 leading-relaxed">
            英語の語彙力を向上させましょう！<br />
            文中の空欄を埋める問題に挑戦してください。
          </p>
        </div>

        <div className="space-y-4">
          <Button onClick={startNormalQuiz} className="w-full">
            ▶ 通常モードで始める
          </Button>
          
          {hasReviewQuestions && (
            <Button 
              onClick={startReviewQuiz} 
              variant="secondary" 
              className="w-full"
            >
              🔁 間違い復習モード
            </Button>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
            <div>
              <div className="font-semibold text-blue-600">✨ 特徴</div>
              <ul className="text-left mt-2 space-y-1">
                <li>• 即座にフィードバック</li>
                <li>• 復習モード搭載</li>
                <li>• レスポンシブ対応</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-green-600">📊 学習効果</div>
              <ul className="text-left mt-2 space-y-1">
                <li>• 語彙力向上</li>
                <li>• 文脈理解強化</li>
                <li>• 反復学習促進</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}