import React, { useState } from 'react';
import { QUESTION_BANK } from '../data/questionBank';
import { CATEGORIES } from '../data/categories';
import { evaluateAnswer } from '../utils/evaluator';
import AnswerInput from './AnswerInput';
import FeedbackDisplay from './FeedbackDisplay';

const QuestionDisplay = ({ mode, category, questionIndex, onAnswerSubmit, onNext }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const questionObj = QUESTION_BANK[category][questionIndex];
  const categoryInfo = CATEGORIES.find(c => c.id === category);

  const handleSubmit = () => {
    const evaluation = evaluateAnswer(userAnswer, questionObj.a, category);
    setFeedback(evaluation);
    onAnswerSubmit({
      category,
      question: questionObj.q,
      userAnswer,
      correctAnswer: questionObj.a,
      score: evaluation.score,
      difficulty: questionObj.difficulty
    });
  };

  const handleNextQuestion = () => {
    setUserAnswer('');
    setFeedback(null);
    setShowHint(false);
    onNext();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 animate-fade-in">
      {/* Category Badge - Centered */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-3xl">{categoryInfo.icon}</span>
          <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-base font-semibold">
            {categoryInfo.name}
          </span>
        </div>
        
        {/* Question - Centered - INCREASED SIZE */}
        <h3 className="text-4xl font-bold text-gray-800 mb-6 leading-relaxed">
          {questionObj.q}
        </h3>
        
        {/* Difficulty Badge - Centered */}
        <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
          questionObj.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
          questionObj.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {questionObj.difficulty.toUpperCase()}
        </span>
      </div>
      
      {!feedback ? (
        <AnswerInput
          value={userAnswer}
          onChange={setUserAnswer}
          onSubmit={handleSubmit}
          mode={mode}
          hint={questionObj.hints}
          showHint={showHint}
          onToggleHint={() => setShowHint(!showHint)}
        />
      ) : (
        <FeedbackDisplay
          feedback={feedback}
          userAnswer={userAnswer}
          correctAnswer={questionObj.a}
          onNext={handleNextQuestion}
        />
      )}
    </div>
  );
};

export default QuestionDisplay;