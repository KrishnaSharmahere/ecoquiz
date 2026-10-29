import { QuizRoundResult } from '../types';

export function generateShareCard(result: QuizRoundResult): string {
  const currentUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://ecoquiz.earth';
  
  return [
    `EcoQuiz — Learn the planet. Level up your impact.`,
    `Round: ${result.topic} (${result.difficulty})`,
    `Score: ${result.score} pts | Accuracy: ${result.accuracy}% (${result.correctAnswers}/${result.totalQuestions})`,
    `Time: ${result.timeSpentSeconds}s`,
    `Play EcoQuiz: ${currentUrl}`
  ].join('\n');
}
