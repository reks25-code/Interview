import React from 'react';

const ProgressBar = ({ current, total, mode }) => {
  const progress = Math.min((current / total) * 100, 100);

  return (
    <div className="mb-6 bg-white rounded-lg shadow-md p-5">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          {mode === 'practice' ? '📚 Practice Mode' : '🎯 Mock Interview'}
        </span>
        <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          Question {current} of {total}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-2 text-xs text-gray-500 text-right">
        {progress.toFixed(0)}% Complete
      </div>
    </div>
  );
};

export default ProgressBar;
