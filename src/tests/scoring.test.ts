import { describe, it, expect } from 'vitest';
import { calculateQuestionScore, BASE_POINTS, getTimeLimitForDifficulty, DAILY_CHALLENGE_BONUS } from '../utils/scoring';

describe('EcoQuiz Scoring Logic', () => {
  it('assigns correct base points by difficulty', () => {
    expect(BASE_POINTS.Easy).toBe(10);
    expect(BASE_POINTS.Medium).toBe(20);
    expect(BASE_POINTS.Hard).toBe(30);
  });

  it('assigns correct time limits by difficulty: Easy 20s, Medium 15s, Hard 10s', () => {
    expect(getTimeLimitForDifficulty('Easy')).toBe(20);
    expect(getTimeLimitForDifficulty('Medium')).toBe(15);
    expect(getTimeLimitForDifficulty('Hard')).toBe(10);
  });

  it('awards 0 points for wrong answers regardless of difficulty or time left', () => {
    const resEasy = calculateQuestionScore('Easy', false, 15, 20);
    expect(resEasy.totalPoints).toBe(0);

    const resHard = calculateQuestionScore('Hard', false, 8, 10);
    expect(resHard.totalPoints).toBe(0);
  });

  it('awards 0 points when time has expired (timeout <= 0)', () => {
    const resTimeout = calculateQuestionScore('Medium', true, 0, 15);
    expect(resTimeout.totalPoints).toBe(0);
  });

  it('calculates full base points + maximum time bonus (10 pts) when answered instantly', () => {
    // Easy: 10 base + 10 time bonus = 20
    const resEasy = calculateQuestionScore('Easy', true, 20, 20);
    expect(resEasy.basePoints).toBe(10);
    expect(resEasy.timeBonus).toBe(10);
    expect(resEasy.totalPoints).toBe(20);

    // Medium: 20 base + 10 time bonus = 30
    const resMedium = calculateQuestionScore('Medium', true, 15, 15);
    expect(resMedium.basePoints).toBe(20);
    expect(resMedium.timeBonus).toBe(10);
    expect(resMedium.totalPoints).toBe(30);

    // Hard: 30 base + 10 time bonus = 40
    const resHard = calculateQuestionScore('Hard', true, 10, 10);
    expect(resHard.basePoints).toBe(30);
    expect(resHard.timeBonus).toBe(10);
    expect(resHard.totalPoints).toBe(40);
  });

  it('scales time bonus linearly with remaining time', () => {
    // Half time remaining on Easy (10s out of 20s) -> 5 time bonus
    const resHalf = calculateQuestionScore('Easy', true, 10, 20);
    expect(resHalf.basePoints).toBe(10);
    expect(resHalf.timeBonus).toBe(5);
    expect(resHalf.totalPoints).toBe(15);

    // Quarter time remaining on Medium (approx 3.75s out of 15s) -> 3 time bonus
    const resQuarter = calculateQuestionScore('Medium', true, 4, 15);
    expect(resQuarter.basePoints).toBe(20);
    expect(resQuarter.timeBonus).toBe(Math.round((4 / 15) * 10)); // 3
    expect(resQuarter.totalPoints).toBe(23);
  });

  it('confirms the daily challenge completion bonus is 50 points', () => {
    expect(DAILY_CHALLENGE_BONUS).toBe(50);
  });
});
