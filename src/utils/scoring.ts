import { Difficulty } from '../types';
import { getTimeLimitForDifficulty } from './badgesEvaluator';

export { getTimeLimitForDifficulty };

export const BASE_POINTS: Record<Difficulty, number> = {
  Easy: 10,
  Medium: 20,
  Hard: 30
};

export const DAILY_CHALLENGE_BONUS = 50;

/**
 * Calculates score for a single question based on:
 * - Base points: Easy 10, Medium 20, Hard 30
 * - Time bonus: up to 10 points scaled to the time left (for correct answers)
 * - Wrong or timed-out answers: 0 points
 */
export function calculateQuestionScore(
  difficulty: Difficulty,
  isCorrect: boolean,
  timeLeftSeconds: number,
  maxTimeSeconds?: number
): { basePoints: number; timeBonus: number; totalPoints: number } {
  if (!isCorrect || timeLeftSeconds <= 0) {
    return { basePoints: 0, timeBonus: 0, totalPoints: 0 };
  }

  const base = BASE_POINTS[difficulty] ?? 10;
  const maxTime = maxTimeSeconds ?? getTimeLimitForDifficulty(difficulty);
  const safeTimeLeft = Math.min(maxTime, Math.max(0, timeLeftSeconds));
  const timeBonus = Math.round((safeTimeLeft / maxTime) * 10);

  return {
    basePoints: base,
    timeBonus,
    totalPoints: base + timeBonus
  };
}
