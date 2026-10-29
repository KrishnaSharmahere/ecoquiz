import { describe, it, expect } from 'vitest';
import { evaluateBadges } from '../utils/badgesEvaluator';
import { UserStats, QuizRoundResult } from '../types';
import { DEFAULT_STATS } from '../utils/storage';

describe('Ten Badges Evaluation System', () => {
  it('unlocks "First Round" when roundsPlayed >= 1', () => {
    const stats: UserStats = {
      ...DEFAULT_STATS,
      roundsPlayed: 1
    };
    const { unlockedBadgeIds } = evaluateBadges(stats);
    expect(unlockedBadgeIds).toContain('badge-first-round');
  });

  it('unlocks "Perfect Round" on 100% accuracy in a round with at least 5 questions', () => {
    const stats: UserStats = { ...DEFAULT_STATS, roundsPlayed: 1 };
    const round: Partial<QuizRoundResult> = {
      totalQuestions: 5,
      accuracy: 100,
      answers: []
    };
    const { unlockedBadgeIds } = evaluateBadges(stats, round as QuizRoundResult);
    expect(unlockedBadgeIds).toContain('badge-perfect-round');
  });

  it('does NOT unlock "Perfect Round" if fewer than 5 questions were played', () => {
    const stats: UserStats = { ...DEFAULT_STATS, roundsPlayed: 1 };
    const round: Partial<QuizRoundResult> = {
      totalQuestions: 3,
      accuracy: 100,
      answers: []
    };
    const { unlockedBadgeIds } = evaluateBadges(stats, round as QuizRoundResult);
    expect(unlockedBadgeIds).not.toContain('badge-perfect-round');
  });

  it('unlocks "Water Expert" when Water accuracy is at least 80% with 10+ questions answered', () => {
    const statsEligible: UserStats = {
      ...DEFAULT_STATS,
      topicStats: {
        ...DEFAULT_STATS.topicStats,
        Water: { totalAnswered: 10, correctAnswered: 8 }
      }
    };
    const resEligible = evaluateBadges(statsEligible);
    expect(resEligible.unlockedBadgeIds).toContain('badge-water-expert');

    const statsUnderCount: UserStats = {
      ...DEFAULT_STATS,
      topicStats: {
        ...DEFAULT_STATS.topicStats,
        Water: { totalAnswered: 9, correctAnswered: 9 }
      }
    };
    const resUnderCount = evaluateBadges(statsUnderCount);
    expect(resUnderCount.unlockedBadgeIds).not.toContain('badge-water-expert');

    const statsUnderAccuracy: UserStats = {
      ...DEFAULT_STATS,
      topicStats: {
        ...DEFAULT_STATS.topicStats,
        Water: { totalAnswered: 10, correctAnswered: 7 } // 70%
      }
    };
    const resUnderAccuracy = evaluateBadges(statsUnderAccuracy);
    expect(resUnderAccuracy.unlockedBadgeIds).not.toContain('badge-water-expert');
  });

  it('unlocks "Daily Devotee" when currentStreak reaches 7 days', () => {
    const stats: UserStats = {
      ...DEFAULT_STATS,
      currentStreak: 7
    };
    const { unlockedBadgeIds } = evaluateBadges(stats);
    expect(unlockedBadgeIds).toContain('badge-daily-devotee');
  });

  it('unlocks "Five Topics" when user has answered at least 1 correct answer in each topic', () => {
    const stats: UserStats = {
      ...DEFAULT_STATS,
      topicStats: {
        Waste: { totalAnswered: 3, correctAnswered: 1 },
        Water: { totalAnswered: 3, correctAnswered: 2 },
        Energy: { totalAnswered: 2, correctAnswered: 1 },
        Climate: { totalAnswered: 4, correctAnswered: 3 },
        Biodiversity: { totalAnswered: 1, correctAnswered: 1 }
      }
    };
    const { unlockedBadgeIds } = evaluateBadges(stats);
    expect(unlockedBadgeIds).toContain('badge-five-topics');
  });

  it('unlocks "Lightning Reflexes" when answering 3 questions correctly with >50% time left', () => {
    const stats: UserStats = { ...DEFAULT_STATS };
    const round: Partial<QuizRoundResult> = {
      answers: [
        {
          question: { difficulty: 'Easy', topic: 'Water' } as any,
          isCorrect: true,
          timeTakenSeconds: 8, // limit is 20s, 8 <= 10 -> fast!
          selectedOptionIndex: 0,
          pointsAwarded: 16
        },
        {
          question: { difficulty: 'Medium', topic: 'Waste' } as any,
          isCorrect: true,
          timeTakenSeconds: 6, // limit is 15s, 6 <= 7.5 -> fast!
          selectedOptionIndex: 1,
          pointsAwarded: 25
        },
        {
          question: { difficulty: 'Hard', topic: 'Energy' } as any,
          isCorrect: true,
          timeTakenSeconds: 4, // limit is 10s, 4 <= 5 -> fast!
          selectedOptionIndex: 2,
          pointsAwarded: 36
        }
      ]
    };

    const { unlockedBadgeIds } = evaluateBadges(stats, round as QuizRoundResult);
    expect(unlockedBadgeIds).toContain('badge-lightning-reflexes');
  });

  it('unlocks "Library Scholar" when factsExplored has 10 or more entries', () => {
    const stats: UserStats = {
      ...DEFAULT_STATS,
      factsExplored: ['wst-01', 'wst-02', 'wst-03', 'wtr-01', 'wtr-02', 'en-01', 'en-02', 'clm-01', 'clm-02', 'bio-01']
    };
    const { unlockedBadgeIds } = evaluateBadges(stats);
    expect(unlockedBadgeIds).toContain('badge-library-scholar');
  });

  it('unlocks "Earth Guardian" when totalPoints reaches 1000', () => {
    const stats: UserStats = {
      ...DEFAULT_STATS,
      totalPoints: 1000
    };
    const { unlockedBadgeIds } = evaluateBadges(stats);
    expect(unlockedBadgeIds).toContain('badge-earth-guardian');
  });
});
