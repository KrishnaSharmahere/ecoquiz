export type Topic = 'Waste' | 'Water' | 'Energy' | 'Climate' | 'Biodiversity';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: string;
  topic: Topic;
  difficulty: Difficulty;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  source: string;
  tag: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'general' | 'topic' | 'streak' | 'accuracy';
  isUnlocked: boolean;
  unlockedAt?: string;
  ruleExplanation: string;
}

export interface LevelInfo {
  level: number;
  title: string;
  minPoints: number;
  maxPoints: number;
  icon: string;
  perk: string;
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  accuracy: number;
  topic: string;
  difficulty: string;
  date: string;
}

export interface TopicStat {
  totalAnswered: number;
  correctAnswered: number;
}

export interface UserStats {
  totalPoints: number;
  roundsPlayed: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  currentStreak: number;
  bestStreak: number;
  lastPlayedDate: string | null;
  dailyCompletedDates: string[];
  topicStats: Record<Topic, TopicStat>;
  unlockedBadgeIds: string[];
  factsExplored: string[];
  bestScore: number;
}

export interface QuizSettings {
  soundEnabled: boolean;
  reducedMotion: boolean;
  theme: 'dark' | 'light';
  playerName: string;
}

export interface QuestionAnswerRecord {
  question: Question;
  selectedOptionIndex: number;
  isCorrect: boolean;
  timeTakenSeconds: number;
  pointsAwarded: number;
}

export interface QuizRoundResult {
  id: string;
  score: number;
  pointsEarned: number;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  timeSpentSeconds: number;
  topic: string;
  difficulty: string;
  isDaily: boolean;
  answers: QuestionAnswerRecord[];
  newlyUnlockedBadges: Badge[];
}
