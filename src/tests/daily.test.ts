import { describe, it, expect } from 'vitest';
import { getDailyChallengeQuestions } from '../utils/daily';

describe('Daily Challenge Determinism', () => {
  it('returns exactly 5 questions for any given date string', () => {
    const questions = getDailyChallengeQuestions('2026-10-22');
    expect(questions).toHaveLength(5);
  });

  it('selects exactly one question from each of the 5 syllabus topics', () => {
    const questions = getDailyChallengeQuestions('2026-10-22');
    const topics = questions.map(q => q.topic);
    
    expect(topics).toContain('Waste');
    expect(topics).toContain('Water');
    expect(topics).toContain('Energy');
    expect(topics).toContain('Climate');
    expect(topics).toContain('Biodiversity');
  });

  it('is strictly deterministic: identical date produces identical question IDs across repeated runs', () => {
    const run1 = getDailyChallengeQuestions('2026-11-05');
    const run2 = getDailyChallengeQuestions('2026-11-05');

    const ids1 = run1.map(q => q.id);
    const ids2 = run2.map(q => q.id);

    expect(ids1).toEqual(ids2);
  });

  it('different dates yield varied combinations', () => {
    const day1 = getDailyChallengeQuestions('2026-01-01');
    const day2 = getDailyChallengeQuestions('2026-06-15');

    const idsDay1 = day1.map(q => q.id).join(',');
    const idsDay2 = day2.map(q => q.id).join(',');

    // Very unlikely to be completely identical
    expect(idsDay1).not.toBe(idsDay2);
  });
});
