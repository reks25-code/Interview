import React from 'react';
import { PlayCircle, BookOpen } from 'lucide-react';

const ModeSelection = ({ onModeSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">RSR Technologies</h1>
          <h2 className="text-3xl text-gray-600 mb-4">Junior Data Scientist Interview</h2>
          <p className="text-gray-500 text-lg">Select your interview mode to begin</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div 
            onClick={() => onModeSelect('practice')}
            className="bg-white rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-2xl transition-all hover:scale-105 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <BookOpen className="w-16 h-16 text-blue-500 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">Practice Mode</h3>
            <p className="text-gray-600 mb-6 text-center">Learn with hints and detailed explanations</p>
            <ul className="text-sm text-gray-500 space-y-3">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Hints available for all questions
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Detailed feedback after each answer
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                No time pressure
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Perfect for learning and preparation
              </li>
            </ul>
          </div>
          
          <div 
            onClick={() => onModeSelect('mock')}
            className="bg-white rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-2xl transition-all hover:scale-105 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <PlayCircle className="w-16 h-16 text-indigo-500 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">Mock Interview</h3>
            <p className="text-gray-600 mb-6 text-center">Real interview simulation</p>
            <ul className="text-sm text-gray-500 space-y-3">
              <li className="flex items-center">
                <span className="text-indigo-500 mr-2">✓</span>
                No hints available
              </li>
              <li className="flex items-center">
                <span className="text-indigo-500 mr-2">✓</span>
                Strict evaluation criteria
              </li>
              <li className="flex items-center">
                <span className="text-indigo-500 mr-2">✓</span>
                Realistic interview experience
              </li>
              <li className="flex items-center">
                <span className="text-indigo-500 mr-2">✓</span>
                Final hiring assessment
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>💡 Tip: Start with Practice Mode to familiarize yourself with the questions</p>
        </div>
      </div>
    </div>
  );
};

export default ModeSelection;