export const evaluateAnswer = (userAnswer, correctAnswer, category) => {
  const userLower = userAnswer.toLowerCase().trim();
  const correctLower = correctAnswer.toLowerCase();
  
  // Special handling for behavioral questions
  if (category === 'behavioral') {
    const wordCount = userAnswer.split(' ').filter(word => word.length > 0).length;
    if (wordCount < 20) {
      return { score: 2, comment: "Your answer is too brief. Provide more details using the STAR method." };
    }
    if (wordCount < 50) {
      return { score: 3, comment: "Good start, but could be more detailed. Include specific examples." };
    }
    if (wordCount < 100) {
      return { score: 4, comment: "Well-articulated answer with good detail." };
    }
    return { score: 5, comment: "Excellent! Comprehensive answer with specific examples and insights." };
  }
  
  // Keyword matching for technical questions
  const keywords = correctLower.split(/[\s,.:;!?()]+/).filter(word => word.length > 2);
  const matchedKeywords = keywords.filter(kw => userLower.includes(kw)).length;
  const matchPercentage = keywords.length > 0 ? matchedKeywords / keywords.length : 0;
  
  if (matchPercentage >= 0.7) {
    return { score: 5, comment: "Excellent! Your answer demonstrates strong understanding." };
  }
  if (matchPercentage >= 0.5) {
    return { score: 4, comment: "Good answer! You got the main concepts right." };
  }
  if (matchPercentage >= 0.3) {
    return { score: 3, comment: "Partially correct. You're on the right track but missing some key points." };
  }
  if (matchPercentage >= 0.15) {
    return { score: 2, comment: "Your answer shows some understanding but misses several important concepts." };
  }
  return { score: 1, comment: "Incorrect. Please review this topic to strengthen your understanding." };
};