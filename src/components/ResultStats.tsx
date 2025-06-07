import { QuizResult } from '@/types/vocab';
import Button from './Button';

interface ResultStatsProps {
  result: QuizResult;
  onReviewMode: () => void;
  onHome: () => void;
  hasIncorrectAnswers: boolean;
}

export default function ResultStats({ 
  result, 
  onReviewMode, 
  onHome, 
  hasIncorrectAnswers 
}: ResultStatsProps) {
  const getScoreColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-600';
    if (accuracy >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreEmoji = (accuracy: number) => {
    if (accuracy >= 90) return '🎉';
    if (accuracy >= 80) return '😊';
    if (accuracy >= 60) return '😐';
    return '😔';
  };

  return (
    <div className="quiz-card max-w-lg mx-auto text-center">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {getScoreEmoji(result.accuracy)} 結果発表
        </h2>
        
        <div className="space-y-3">
          <div className="text-lg">
            <span className="text-gray-600">正解数: </span>
            <span className="font-bold text-blue-600">
              {result.correctCount} / {result.totalQuestions}
            </span>
          </div>
          
          <div className="text-xl">
            <span className="text-gray-600">正答率: </span>
            <span className={`font-bold text-2xl ${getScoreColor(result.accuracy)}`}>
              {result.accuracy}%
            </span>
          </div>
        </div>

        {result.incorrectQuestions.length > 0 && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              {result.incorrectQuestions.length}問の間違いがありました
            </p>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {hasIncorrectAnswers && (
          <Button onClick={onReviewMode} className="w-full">
            🔁 間違えた問題を復習
          </Button>
        )}
        <Button onClick={onHome} variant="secondary" className="w-full">
          🏠 ホームへ戻る
        </Button>
      </div>

      {result.accuracy === 100 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-semibold">
            🏆 パーフェクト！全問正解です！
          </p>
        </div>
      )}
    </div>
  );
}