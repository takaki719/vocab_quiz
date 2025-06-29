'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';

export default function Home() {
  const router = useRouter();
  const [hasReviewQuestions, setHasReviewQuestions] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [timerDuration, setTimerDuration] = useState(30);

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
    const params = new URLSearchParams();
    if (!timerEnabled) {
      params.set('timer', 'false');
    } else {
      params.set('duration', timerDuration.toString());
    }
    const url = params.toString() ? `/quiz?${params.toString()}` : '/quiz';
    router.push(url);
  };

  const startReviewQuiz = () => {
    const params = new URLSearchParams({ mode: 'review' });
    if (!timerEnabled) {
      params.set('timer', 'false');
    } else {
      params.set('duration', timerDuration.toString());
    }
    router.push(`/quiz?${params.toString()}`);
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
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">
                ⏰ タイマー機能
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={timerEnabled}
                  onChange={(e) => setTimerEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            {timerEnabled && (
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  制限時間: {timerDuration}秒
                </label>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={timerDuration}
                  onChange={(e) => setTimerDuration(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>5秒</span>
                  <span>30秒</span>
                  <span>60秒</span>
                </div>
              </div>
            )}
            <p className="text-xs text-gray-500">
              {timerEnabled ? `各問題${timerDuration}秒の制限時間があります` : 'タイマーなしでじっくり考えられます'}
            </p>
          </div>
          
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