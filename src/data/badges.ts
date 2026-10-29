import { Badge } from '../types';

export const ALL_BADGES: Badge[] = [
  {
    id: 'badge-first-round',
    name: 'First Round',
    description: 'Complete your first quiz round of EcoQuiz.',
    icon: '🎯',
    category: 'general',
    isUnlocked: false,
    ruleExplanation: 'Completed at least 1 quiz round.'
  },
  {
    id: 'badge-perfect-round',
    name: 'Perfect Round',
    description: 'Achieve 100% accuracy in a round of at least 5 questions.',
    icon: '🌟',
    category: 'accuracy',
    isUnlocked: false,
    ruleExplanation: '100% accuracy with ≥5 questions in a single round.'
  },
  {
    id: 'badge-water-expert',
    name: 'Water Expert',
    description: '80% or more accuracy on Water with 10 or more questions answered.',
    icon: '💧',
    category: 'topic',
    isUnlocked: false,
    ruleExplanation: 'Water accuracy ≥80% with ≥10 questions answered.'
  },
  {
    id: 'badge-daily-devotee',
    name: 'Daily Devotee',
    description: 'Maintain a 7-day consecutive daily play streak.',
    icon: '🔥',
    category: 'streak',
    isUnlocked: false,
    ruleExplanation: 'Active consecutive daily streak reaches 7 days.'
  },
  {
    id: 'badge-five-topics',
    name: 'Five Topics',
    description: 'Answer at least one question correctly in all 5 topics.',
    icon: '🌐',
    category: 'topic',
    isUnlocked: false,
    ruleExplanation: '≥1 correct answer in Waste, Water, Energy, Climate, and Biodiversity.'
  },
  {
    id: 'badge-lightning-reflexes',
    name: 'Lightning Reflexes',
    description: 'Answer 3 questions correctly in a round with over 50% time remaining.',
    icon: '⚡',
    category: 'accuracy',
    isUnlocked: false,
    ruleExplanation: '3 correct answers in one round within first half of the timer.'
  },
  {
    id: 'badge-waste-warrior',
    name: 'Waste Warrior',
    description: '80% or more accuracy on Waste with 10 or more questions answered.',
    icon: '♻️',
    category: 'topic',
    isUnlocked: false,
    ruleExplanation: 'Waste accuracy ≥80% with ≥10 questions answered.'
  },
  {
    id: 'badge-energy-pioneer',
    name: 'Energy Pioneer',
    description: '80% or more accuracy on Energy with 10 or more questions answered.',
    icon: '🔋',
    category: 'topic',
    isUnlocked: false,
    ruleExplanation: 'Energy accuracy ≥80% with ≥10 questions answered.'
  },
  {
    id: 'badge-library-scholar',
    name: 'Library Scholar',
    description: 'Inspect and study at least 10 scientific facts in the Fact Library.',
    icon: '📚',
    category: 'general',
    isUnlocked: false,
    ruleExplanation: 'Explored 10 or more entries in the searchable Fact Library.'
  },
  {
    id: 'badge-earth-guardian',
    name: 'Earth Guardian',
    description: 'Accumulate 1,000 or more total knowledge points to reach top rank.',
    icon: '🌍',
    category: 'general',
    isUnlocked: false,
    ruleExplanation: 'Total lifetime points reach 1,000 or higher.'
  }
];
