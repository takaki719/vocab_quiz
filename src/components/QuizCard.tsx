import { useState } from 'react';
import { VocabQuestion } from '@/types/vocab';
import { createBlankSentence } from '@/utils/placeholder';
import Button from './Button';

interface QuizCardProps {
  question: VocabQuestion;
  userAnswer: string;
  onAnswerChange: (answer: string) => void;
  onSubmit: () => void;
  onSkip?: () => void;
  feedback?: {
    show: boolean;
    isCorrect: boolean;
    correctAnswer?: string;
  };
  onNext?: () => void;
  timeLeft?: number;
  isTimerActive?: boolean;
}

export default function QuizCard({ 
  question, 
  userAnswer, 
  onAnswerChange, 
  onSubmit,
  onSkip,
  feedback,
  onNext,
  timeLeft,
  isTimerActive
}: QuizCardProps) {
  const displaySentence = createBlankSentence(question.sentence, question.answer);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer.trim()) {
      onSubmit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !feedback?.show && userAnswer.trim()) {
      onSubmit();
    }
  };

  return (
    <div className="quiz-card max-w-2xl mx-auto">
      {isTimerActive && timeLeft !== undefined && timeLeft > 0 && (
        <div className="mb-4 text-center">
          <div className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold ${
            timeLeft <= 2 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
          }`}>
            ⏰ 残り時間: {timeLeft}秒
          </div>
        </div>
      )}
      <div className="mb-6">
        <p className="text-lg text-gray-800 leading-relaxed">
          {displaySentence}
        </p>
      </div>

      {!feedback?.show ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => onAnswerChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="答えを入力してください..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>
          <div className="flex gap-3">
            <Button 
              type="submit" 
              disabled={!userAnswer.trim()}
              className="flex-1"
            >
              答える
            </Button>
            {onSkip && (
              <Button 
                type="button"
                onClick={onSkip}
                variant="secondary"
                className="flex-1"
              >
                わからない
              </Button>
            )}
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${
            feedback.isCorrect 
              ? 'bg-green-100 border border-green-300' 
              : 'bg-red-100 border border-red-300'
          }`}>
            <div className="flex items-center mb-2">
              <span className={`text-lg font-semibold ${
                feedback.isCorrect ? 'text-green-800' : 'text-red-800'
              }`}>
                {feedback.isCorrect ? '✅ 正解！' : '❌ 不正解'}
              </span>
            </div>
            {!feedback.isCorrect && (
              <p className="text-red-700">
                正解: <span className="font-semibold">{feedback.correctAnswer}</span>
              </p>
            )}
            <p className="text-gray-600 text-sm mt-2">
              あなたの答え: <span className="font-medium">
                {userAnswer === 'わからない' ? '❓ わからない' : 
                 userAnswer === 'タイムアウト' ? '⏰ タイムアウト' : userAnswer}
              </span>
            </p>
          </div>
          {onNext && (
            <Button onClick={onNext} className="w-full">
              次の問題へ ▶
            </Button>
          )}
        </div>
      )}
    </div>
  );
}