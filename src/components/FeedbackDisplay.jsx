import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const FeedbackDisplay = ({ feedback, userAnswer, correctAnswer, onNext }) => {
  const getScoreColor = (score) => {
    if (score >= 4) return 'green';
    if (score >= 3) return 'yellow';
    return 'red';
  };

  const scoreColor = getScoreColor(feedback.score);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className={`p-6 rounded-lg border-2 ${
        scoreColor === 'green' ? 'bg-green-50 border-green-200' :
        scoreColor === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
        'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-center mb-3">
          {scoreColor === 'green' ? <CheckCircle className="w-7 h-7 text-green-600 mr-2" /> :
           scoreColor === 'yellow' ? <AlertCircle className="w-7 h-7 text-yellow-600 mr-2" /> :
           <XCircle className="w-7 h-7 text-red-600 mr-2" />}
          <div>
            <span className="font-bold text-xl text-gray-800">
              Score: {feedback.score}/5
            </span>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={`text-xl ${
                  star <= feedback.score ? 
                    (scoreColor === 'green' ? 'text-green-500' :
                     scoreColor === 'yellow' ? 'text-yellow-500' : 'text-red-500') 
                  : 'text-gray-300'
                }`}>
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className={`text-lg font-medium ${
          scoreColor === 'green' ? 'text-green-800' :
          scoreColor === 'yellow' ? 'text-yellow-800' :
          'text-red-800'
        }`}>
          {feedback.comment}
        </p>
      </div>

      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
        <p className="font-semibold text-gray-700 mb-2 flex items-center">
          <span className="text-blue-500 mr-2">📝</span>
          Your Answer:
        </p>
        <p className="text-gray-700 leading-relaxed bg-white p-4 rounded border border-gray-200">
          {userAnswer}
        </p>
      </div>
      
      <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-200">
        <p className="font-semibold text-gray-700 mb-2 flex items-center">
          <span className="text-indigo-500 mr-2">✅</span>
          Expected Answer:
        </p>
        <p className="text-gray-700 leading-relaxed bg-white p-4 rounded border border-indigo-200">
          {correctAnswer}
        </p>
      </div>
      
      <button
        onClick={onNext}
        className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
      >
        Next Question
        <span className="text-xl">→</span>
      </button>
    </div>
  );
};

export default FeedbackDisplay;