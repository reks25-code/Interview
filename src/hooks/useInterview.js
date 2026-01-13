import { useState } from 'react';
import { QUESTION_BANK } from '../data/questionBank';

export const useInterview = () => {
  const [mode, setMode] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [interviewComplete, setInterviewComplete] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState(null);

  const totalQuestions = (selectedCategories || Object.keys(QUESTION_BANK)).reduce(
    (sum, key) => sum + (QUESTION_BANK[key]?.length || 0),
    0
  );

  const startInterview = (selectedMode, categories = null) => {
    setMode(selectedMode);
    const keys = categories && categories.length > 0 ? categories : Object.keys(QUESTION_BANK);
    setSelectedCategories(keys);
    setCurrentCategory(keys[0]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setInterviewComplete(false);
  };

  const submitAnswer = (answer) => {
    setAnswers(prev => [...prev, answer]);
  };

  const nextQuestion = () => {
    if (!currentCategory || !QUESTION_BANK[currentCategory]) return;

    const categoryQuestions = QUESTION_BANK[currentCategory];

    if (currentQuestionIndex < categoryQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      return;
    }

    const currentCategoryIndex = (selectedCategories || Object.keys(QUESTION_BANK)).findIndex(
      c => c === currentCategory
    );

    const categoriesList = selectedCategories || Object.keys(QUESTION_BANK);

    if (currentCategoryIndex < categoriesList.length - 1) {
      const nextCategory = categoriesList[currentCategoryIndex + 1];
      setCurrentCategory(nextCategory);
      setCurrentQuestionIndex(0);
    } else {
      setInterviewComplete(true);
    }
  };

  const resetInterview = () => {
    setMode(null);
    setCurrentCategory(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setInterviewComplete(false);
  };

  return {
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
  };
};
