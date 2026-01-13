import React from 'react';
import ModeSelection from './ModeSelection';
import QuestionDisplay from './QuestionDisplay';
import ResultsSummary from './ResultsSummary';
import ProgressBar from './ProgressBar';
import { useInterview } from '../hooks/useInterview';
import { useStorage } from '../hooks/useStorage';
import Auth from './Auth';
import ResumeUpload from './ResumeUpload';
import SkillSelection from './SkillSelection';

const InterviewApp = () => {
  const {
    mode,
    currentCategory,
    currentQuestionIndex,
    answers,
    interviewComplete,
    totalQuestions,
    startInterview,
    submitAnswer,
    nextQuestion,
    resetInterview
  } = useInterview();

  const { user, saveUser, clearUser } = useStorage();

  // Onboarding: auth -> resume -> skills
  if (!user) return <Auth onComplete={(u) => saveUser(u)} />;
  if (!user.resume) return <ResumeUpload user={user} onSave={(u) => saveUser(u)} />;
  if (!user.skills || user.skills.length === 0) return <SkillSelection user={user} onSave={(u) => saveUser(u)} />;

  if (!mode) return <ModeSelection onModeSelect={(m) => startInterview(m, user.skills)} />;

  // small switch-user button to allow returning to auth screen
  const handleSwitchUser = () => {
    clearUser();
  };

  if (interviewComplete) {
    return <ResultsSummary answers={answers} onReset={resetInterview} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-3xl mx-auto relative">
        <div className="absolute top-4 right-0">
          <button onClick={handleSwitchUser} className="text-sm text-indigo-600 underline">Switch User</button>
        </div>
      
        <ProgressBar
          current={answers.length + 1}
          total={totalQuestions}
          mode={mode}
        />

        <QuestionDisplay
          mode={mode}
          category={currentCategory}
          questionIndex={currentQuestionIndex}
          onAnswerSubmit={submitAnswer}
          onNext={nextQuestion}
        />
      </div>
    </div>
  );
};

export default InterviewApp;
