import { Badge, UserStats, QuizRoundResult, Difficulty } from '../types';
import { ALL_BADGES } from '../data/badges';

export function getTimeLimitForDifficulty(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'Easy':
      return 20;
    case 'Medium':
      return 15;
    case 'Hard':
      return 10;
    default:
      return 15;
  }
}

export function evaluateBadges(
  stats: UserStats,
  lastRound?: QuizRoundResult
): { unlockedBadgeIds: string[]; newlyUnlocked: Badge[] } {
  const currentUnlocked = new Set(stats.unlockedBadgeIds || []);
  const newlyUnlocked: Badge[] = [];

  ALL_BADGES.forEach(badge => {
    if (currentUnlocked.has(badge.id)) return;

    let shouldUnlock = false;

    switch (badge.id) {
      case 'badge-first-round':
        shouldUnlock = stats.roundsPlayed >= 1;
        break;

      case 'badge-perfect-round':
        if (lastRound && lastRound.totalQuestions >= 5 && lastRound.accuracy === 100) {
          shouldUnlock = true;
        }
        break;

      case 'badge-water-expert': {
        const waterStats = stats.topicStats?.Water;
        if (waterStats && waterStats.totalAnswered >= 10) {
          const acc = waterStats.correctAnswered / waterStats.totalAnswered;
          shouldUnlock = acc >= 0.8;
        }
        break;
      }

      case 'badge-daily-devotee':
        shouldUnlock = (stats.currentStreak || 0) >= 7;
        break;

      case 'badge-five-topics': {
        const topics = ['Waste', 'Water', 'Energy', 'Climate', 'Biodiversity'] as const;
        const allHaveAtLeastOne = topics.every(t => (stats.topicStats?.[t]?.correctAnswered || 0) >= 1);
        shouldUnlock = allHaveAtLeastOne;
        break;
      }

      case 'badge-lightning-reflexes': {
        if (lastRound && lastRound.answers) {
          const fastCount = lastRound.answers.filter(a => {
            if (!a.isCorrect) return false;
            const maxTime = getTimeLimitForDifficulty(a.question.difficulty);
            return a.timeTakenSeconds <= maxTime / 2;
          }).length;
          shouldUnlock = fastCount >= 3;
        }
        break;
      }

      case 'badge-waste-warrior': {
        const wasteStats = stats.topicStats?.Waste;
        if (wasteStats && wasteStats.totalAnswered >= 10) {
          const acc = wasteStats.correctAnswered / wasteStats.totalAnswered;
          shouldUnlock = acc >= 0.8;
        }
        break;
      }

      case 'badge-energy-pioneer': {
        const energyStats = stats.topicStats?.Energy;
        if (energyStats && energyStats.totalAnswered >= 10) {
          const acc = energyStats.correctAnswered / energyStats.totalAnswered;
          shouldUnlock = acc >= 0.8;
        }
        break;
      }

      case 'badge-library-scholar':
        shouldUnlock = (stats.factsExplored?.length || 0) >= 10;
        break;

      case 'badge-earth-guardian':
        shouldUnlock = (stats.totalPoints || 0) >= 1000;
        break;
    }

    if (shouldUnlock) {
      currentUnlocked.add(badge.id);
      newlyUnlocked.push({
        ...badge,
        isUnlocked: true,
        unlockedAt: new Date().toISOString()
      });
    }
  });

  return {
    unlockedBadgeIds: Array.from(currentUnlocked),
    newlyUnlocked
  };
}
