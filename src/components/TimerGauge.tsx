interface TimerGaugeProps {
  timeLeft: number;
  totalTime: number;
  isActive: boolean;
}

export default function TimerGauge({ timeLeft, totalTime, isActive }: TimerGaugeProps) {
  if (!isActive || timeLeft <= 0) return null;

  const progress = (timeLeft / totalTime) * 100;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  const getColor = () => {
    if (progress > 50) return '#10b981'; // green
    if (progress > 25) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="relative">
        <svg width="100" height="100" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={getColor()}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        {/* Timer text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold text-lg ${
            timeLeft <= 5 ? 'text-red-600' : 'text-gray-700'
          }`}>
            {timeLeft}
          </span>
        </div>
      </div>
      <div className="text-sm text-gray-500 mt-1">
        残り時間
      </div>
    </div>
  );
}