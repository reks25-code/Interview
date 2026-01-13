import React from 'react';
import { CheckCircle, AlertCircle, Award, Printer, RotateCcw } from 'lucide-react';
import { calculateResults } from '../utils/scoreCalculator';
import { CATEGORIES } from '../data/categories';

const ResultsSummary = ({ answers, onReset }) => {
  const results = calculateResults(answers, CATEGORIES);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        {/* Header Section */}
        <div className="bg-indigo-600 p-8 text-white text-center relative">
          <Award className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h2 className="text-4xl font-bold">Interview Results</h2>
          <p className="mt-2 text-indigo-100">Overall Performance Review</p>
          {/* Pass/Fail Badge */}
          <div className="absolute top-6 right-6">
            {results.passed ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 border border-green-100">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Pass</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-700 border border-red-100">
                <AlertCircle className="w-5 h-5" />
                <span className="font-semibold">Fail</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-8">
          {/* Main Score Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className={`p-6 rounded-xl border-2 text-center ${getScoreColor(results.percentage)}`}>
              <p className="text-sm uppercase tracking-wider font-bold opacity-70">Final Percentage</p>
              <p className="text-5xl font-black mt-2">{results.percentage}%</p>
            </div>
            <div className="p-6 rounded-xl border-2 border-slate-100 bg-slate-50 text-center text-slate-700">
              <p className="text-sm uppercase tracking-wider font-bold opacity-70">Recommendation</p>
              <p className="text-3xl font-bold mt-2">{results.recommendation}</p>
            </div>
          </div>

          {/* Category Breakdown */}
          <h3 className="text-xl font-bold text-slate-800 mb-6">Category Breakdown</h3>
          <div className="space-y-6 mb-10">
            {Object.entries(results.categoryScores).map(([cat, score]) => (
              <div key={cat} className="group">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-slate-700 uppercase text-sm tracking-tight">{cat}</span>
                  <span className="font-bold text-indigo-600">{score}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-4">
                  <div 
                    className="bg-indigo-500 h-4 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Strengths & Improvements */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-4">
              <h4 className="flex items-center text-green-700 font-bold uppercase text-sm">
                <CheckCircle className="w-5 h-5 mr-2" /> Strengths
              </h4>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100 min-h-[100px]">
                {Object.entries(results.categoryScores).filter(([_, s]) => s >= 70).length > 0 ? (
                  Object.entries(results.categoryScores).filter(([_, s]) => s >= 70).map(([cat]) => (
                    <div key={cat} className="text-slate-700 text-sm py-1">• Strong mastery of {cat}</div>
                  ))
                ) : <p className="text-slate-400 text-sm italic">No major strengths identified yet.</p>}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="flex items-center text-amber-700 font-bold uppercase text-sm">
                <AlertCircle className="w-5 h-5 mr-2" /> Areas to Focus
              </h4>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 min-h-[100px]">
                {Object.entries(results.categoryScores).filter(([_, s]) => s < 70).map(([cat]) => (
                  <div key={cat} className="text-slate-700 text-sm py-1">• Review fundamentals in {cat}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            <button 
              onClick={onReset}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
            >
              <RotateCcw className="w-5 h-5" /> Retake Interview
            </button>
            <button 
              onClick={() => window.print()}
              className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Printer className="w-5 h-5" /> Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummary;