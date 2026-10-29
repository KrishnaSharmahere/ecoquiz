import { Question, Topic } from '../types';
import { QUESTIONS_DATA } from '../data/questions';

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Simple deterministic hash from date string to seed PRNG
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getDailyChallengeQuestions(dateStr: string = getTodayDateString()): Question[] {
  const topics: Topic[] = ['Waste', 'Water', 'Energy', 'Climate', 'Biodiversity'];
  const baseHash = simpleHash(dateStr);
  const selected: Question[] = [];

  topics.forEach((topic, idx) => {
    const pool = QUESTIONS_DATA.filter(q => q.topic === topic);
    if (pool.length > 0) {
      const qIndex = (baseHash + idx * 7) % pool.length;
      selected.push(pool[qIndex]);
    }
  });

  return selected;
}
