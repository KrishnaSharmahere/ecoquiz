import { LevelInfo } from '../types';

export const ECO_LEVELS: LevelInfo[] = [
  {
    level: 1,
    title: 'Seedling',
    minPoints: 0,
    maxPoints: 99,
    icon: '◈',
    perk: 'Grounding roots in core environmental concepts'
  },
  {
    level: 2,
    title: 'Sprout',
    minPoints: 100,
    maxPoints: 299,
    icon: '◇',
    perk: 'Absorbing vital water, waste, and energy metrics'
  },
  {
    level: 3,
    title: 'Sapling',
    minPoints: 300,
    maxPoints: 599,
    icon: '◆',
    perk: 'Mastering treaties, circular flows, and climate thresholds'
  },
  {
    level: 4,
    title: 'Guardian',
    minPoints: 600,
    maxPoints: 999,
    icon: '✦',
    perk: 'Defending biomes and accelerating ecological literacy'
  },
  {
    level: 5,
    title: 'Earth Guardian',
    minPoints: 1000,
    maxPoints: Infinity,
    icon: '⟡',
    perk: 'Highest tier: exceptional planetary science fluency'
  }
];

export function getLevelForPoints(points: number): LevelInfo {
  const safePoints = Math.max(0, points || 0);
  for (let i = ECO_LEVELS.length - 1; i >= 0; i--) {
    if (safePoints >= ECO_LEVELS[i].minPoints) {
      return ECO_LEVELS[i];
    }
  }
  return ECO_LEVELS[0];
}

export function getNextLevel(currentLevel: LevelInfo): LevelInfo | null {
  const next = ECO_LEVELS.find(l => l.level === currentLevel.level + 1);
  return next || null;
}

export function getLevelProgress(points: number): {
  currentLevel: LevelInfo;
  nextLevel: LevelInfo | null;
  progressPercent: number;
  pointsToNext: number;
} {
  const currentLevel = getLevelForPoints(points);
  const nextLevel = getNextLevel(currentLevel);

  if (!nextLevel) {
    return {
      currentLevel,
      nextLevel: null,
      progressPercent: 100,
      pointsToNext: 0
    };
  }

  const range = nextLevel.minPoints - currentLevel.minPoints;
  const earnedInRange = Math.max(0, points - currentLevel.minPoints);
  const progressPercent = Math.min(100, Math.max(0, Math.round((earnedInRange / range) * 100)));
  const pointsToNext = Math.max(0, nextLevel.minPoints - points);

  return {
    currentLevel,
    nextLevel,
    progressPercent,
    pointsToNext
  };
}
