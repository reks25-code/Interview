export const calculateResults = (answers, categories) => {
  const totalScore = answers.reduce((sum, a) => sum + a.score, 0);
  const maxScore = answers.length * 5;
  const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
  
  // Calculate category-wise scores
  const categoryScores = {};
  categories.forEach(cat => {
    const catAnswers = answers.filter(a => a.category === cat.id);
    if (catAnswers.length > 0) {
      const catScore = catAnswers.reduce((sum, a) => sum + a.score, 0);
      const catMax = catAnswers.length * 5;
      categoryScores[cat.name] = ((catScore / catMax) * 100).toFixed(1);
    }
  });
  
  // Determine hiring recommendation
  let recommendation = '';
  if (percentage >= 80) {
    recommendation = 'Strong Hire';
  } else if (percentage >= 65) {
    recommendation = 'Hire';
  } else if (percentage >= 50) {
    recommendation = 'Hold';
  } else {
    recommendation = 'Reject';
  }

  // Pass / Fail decision (pass if >= 50%)
  const passed = percentage >= 50;
  
  return {
    percentage: percentage.toFixed(1),
    categoryScores,
    recommendation,
    passed,
    totalScore,
    maxScore
  };
};