interface CurrentStatsProps {
  answered: number;
  correct: number;
  accuracy: number;
  total: number;
}

export default function CurrentStats({ answered, correct, accuracy, total }: CurrentStatsProps) {
  if (answered === 0) {
    return null; // まだ問題に答えていない場合は非表示
  }

  const getAccuracyColor = (acc: number) => {
    if (acc >= 80) return 'text-green-600';
    if (acc >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAccuracyBgColor = (acc: number) => {
    if (acc >= 80) return 'bg-green-50 border-green-200';
    if (acc >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className={`p-4 rounded-lg border ${getAccuracyBgColor(accuracy)} mb-4`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-sm">
            <span className="text-gray-600">正解数: </span>
            <span className="font-semibold text-blue-600">
              {correct} / {answered}
            </span>
          </div>
          
          <div className="text-sm">
            <span className="text-gray-600">現在の正答率: </span>
            <span className={`font-bold ${getAccuracyColor(accuracy)}`}>
              {accuracy}%
            </span>
          </div>
        </div>

        <div className="text-xs text-gray-500">
          残り {total - answered} 問
        </div>
      </div>
      
      {/* 正答率バー */}
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              accuracy >= 80 ? 'bg-green-500' : 
              accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${accuracy}%` }}
          />
        </div>
      </div>
    </div>
  );
}