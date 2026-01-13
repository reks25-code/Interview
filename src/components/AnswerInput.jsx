import React from 'react';

const AnswerInput = ({ value, onChange, onSubmit, mode, hint, showHint, onToggleHint }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey && value.trim()) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Text Area - INCREASED SIZE */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your answer here... (Ctrl + Enter to submit)"
        className="w-full h-64 p-6 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none resize-none text-gray-700 text-lg"
        autoFocus
      />
      
      {/* Hint Button and Character Count - Centered */}
      <div className="flex items-center justify-center gap-8">
        {mode === 'practice' && (
          <button
            onClick={onToggleHint}
            className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-2 transition-colors text-lg"
          >
            <span className="text-2xl">💡</span>
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
        )}
        <div className="text-base text-gray-500">
          {value.length} characters
        </div>
      </div>
      
      {/* Hint Box - Left-aligned text */}
      {showHint && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded animate-fade-in">
          <div className="flex items-start">
            <span className="text-3xl mr-3">💡</span>
            <div className="text-left">
              <p className="font-semibold text-yellow-800 mb-2 text-lg">Hint:</p>
              <p className="text-yellow-700 text-base">{hint}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Submit Button - Centered - INCREASED SIZE */}
      <button
        onClick={onSubmit}
        disabled={!value.trim()}
        className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg text-lg"
      >
        Submit Answer
      </button>
    </div>
  );
};

export default AnswerInput;