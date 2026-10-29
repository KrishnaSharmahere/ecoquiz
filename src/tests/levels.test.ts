import { describe, it, expect } from 'vitest';
import { getLevelForPoints, getLevelProgress, ECO_LEVELS } from '../data/levels';

describe('Level Thresholds and Progression Rings', () => {
  it('correctly maps 0-99 points to Seedling', () => {
    const lvl0 = getLevelForPoints(0);
    expect(lvl0.title).toBe('Seedling');
    expect(lvl0.level).toBe(1);

    const lvl50 = getLevelForPoints(50);
    expect(lvl50.title).toBe('Seedling');
  });

  it('correctly maps 100-299 points to Sprout', () => {
    const lvl100 = getLevelForPoints(100);
    expect(lvl100.title).toBe('Sprout');
    expect(lvl100.level).toBe(2);

    const lvl250 = getLevelForPoints(250);
    expect(lvl250.title).toBe('Sprout');
  });

  it('correctly maps 300-599 points to Sapling', () => {
    const lvl300 = getLevelForPoints(300);
    expect(lvl300.title).toBe('Sapling');
    expect(lvl300.level).toBe(3);

    const lvl550 = getLevelForPoints(550);
    expect(lvl550.title).toBe('Sapling');
  });

  it('correctly maps 600-999 points to Guardian', () => {
    const lvl600 = getLevelForPoints(600);
    expect(lvl600.title).toBe('Guardian');
    expect(lvl600.level).toBe(4);

    const lvl950 = getLevelForPoints(950);
    expect(lvl950.title).toBe('Guardian');
  });

  it('correctly maps 1000+ points to Earth Guardian (top level)', () => {
    const lvl1000 = getLevelForPoints(1000);
    expect(lvl1000.title).toBe('Earth Guardian');
    expect(lvl1000.level).toBe(5);

    const lvl3500 = getLevelForPoints(3500);
    expect(lvl3500.title).toBe('Earth Guardian');
  });

  it('calculates progress ring percentage and points needed accurately', () => {
    // 0 points: Seedling (0 to 100) -> 0%
    const p0 = getLevelProgress(0);
    expect(p0.progressPercent).toBe(0);
    expect(p0.pointsToNext).toBe(100);

    // 50 points: Seedling halfway to Sprout (100) -> 50%
    const p50 = getLevelProgress(50);
    expect(p50.progressPercent).toBe(50);
    expect(p50.pointsToNext).toBe(50);

    // 100 points: exactly Sprout (range 100 to 300 = 200 pts) -> 0%
    const p100 = getLevelProgress(100);
    expect(p100.currentLevel.title).toBe('Sprout');
    expect(p100.progressPercent).toBe(0);
    expect(p100.pointsToNext).toBe(200);

    // 200 points: halfway through Sprout -> 50%
    const p200 = getLevelProgress(200);
    expect(p200.progressPercent).toBe(50);
    expect(p200.pointsToNext).toBe(100);

    // 1000 points: Earth Guardian (no next level) -> 100%
    const pMax = getLevelProgress(1200);
    expect(pMax.currentLevel.title).toBe('Earth Guardian');
    expect(pMax.nextLevel).toBeNull();
    expect(pMax.progressPercent).toBe(100);
  });
});
