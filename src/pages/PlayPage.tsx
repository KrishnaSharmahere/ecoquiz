import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  Question, Topic, Difficulty, UserStats, 
  LeaderboardEntry, QuizSettings, QuizRoundResult, QuestionAnswerRecord, Badge
} from '../types';
import { QUESTIONS_DATA } from '../data/questions';
import { ALL_BADGES } from '../data/badges';
import { getLevelProgress } from '../data/levels';
import { soundManager } from '../utils/sound';
import { 
  saveUserStats, saveLeaderboardEntry, saveSettings, 
  calculateNewStreak, exportDataAsJSON, importDataFromJSON, resetAllData 
} from '../utils/storage';
import { getDailyChallengeQuestions, getTodayDateString } from '../utils/daily';
import { generateShareCard } from '../utils/share';
import { evaluateBadges } from '../utils/badgesEvaluator';
import { calculateQuestionScore, getTimeLimitForDifficulty, DAILY_CHALLENGE_BONUS } from '../utils/scoring';
import { SpotlightCard } from '../components/SpotlightCard';

interface PlayPageProps {
  stats: UserStats;
  settings: QuizSettings;
  leaderboard: LeaderboardEntry[];
  onUpdateStats: (newStats: UserStats) => void;
  onUpdateLeaderboard: (newLeaderboard: LeaderboardEntry[]) => void;
  onUpdateSettings: (newSettings: QuizSettings) => void;
  onBadgeUnlocked: (badge: Badge) => void;
  onNavigate: (path: string) => void;
}

type PlayView = 'setup' | 'quiz' | 'results' | 'stats' | 'badges' | 'leaderboard';

export const PlayPage: React.FC<PlayPageProps> = ({
  stats,
  settings,
  leaderboard,
  onUpdateStats,
  onUpdateLeaderboard,
  onUpdateSettings,
  onBadgeUnlocked
}) => {
  // Navigation & Sub-views
  const [activeTab, setActiveTab] = useState<PlayView>('setup');

  // Setup Form State
  const [playerName, setPlayerName] = useState(settings.playerName || 'Eco Explorer');
  const [selectedTopic, setSelectedTopic] = useState<Topic | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'Mixed'>('Mixed');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [isDailyMode, setIsDailyMode] = useState<boolean>(false);

  // Active Quiz State
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [maxTime, setMaxTime] = useState<number>(15);
  const [roundAnswers, setRoundAnswers] = useState<QuestionAnswerRecord[]>([]);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [roundStartTime, setRoundStartTime] = useState<number>(0);
  const [comboStreak, setComboStreak] = useState<number>(0);

  // Results State
  const [lastResult, setLastResult] = useState<QuizRoundResult | null>(null);
  const [copiedShareCard, setCopiedShareCard] = useState<boolean>(false);

  // Settings Modal / Actions State
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const todayStr = getTodayDateString();
  const isDailyDoneToday = stats.dailyCompletedDates?.includes(todayStr);

  const currentQuestion = activeQuestions[currentIndex];

  // Sync nickname to settings
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPlayerName(val);
    const updated = { ...settings, playerName: val };
    saveSettings(updated);
    onUpdateSettings(updated);
  };

  // Answer Selection
  const handleSelectAnswer = useCallback((optionIndex: number) => {
    if (hasAnswered) return;

    const currentQ = activeQuestions[currentIndex];
    if (!currentQ) return;

    const isCorrect = optionIndex === currentQ.correctIndex;
    const timeSpent = maxTime - Math.max(0, timeLeft);

    const { totalPoints } = calculateQuestionScore(
      currentQ.difficulty,
      isCorrect,
      timeLeft,
      maxTime
    );

    if (isCorrect) {
      soundManager.playCorrect();
      setComboStreak(prev => prev + 1);
    } else {
      soundManager.playWrong();
      setComboStreak(0);
    }

    setSelectedOption(optionIndex);
    setHasAnswered(true);
    setCurrentScore(prev => prev + totalPoints);

    const record: QuestionAnswerRecord = {
      question: currentQ,
      selectedOptionIndex: optionIndex,
      isCorrect,
      timeTakenSeconds: timeSpent,
      pointsAwarded: totalPoints
    };

    setRoundAnswers(prev => [...prev, record]);
  }, [activeQuestions, currentIndex, hasAnswered, timeLeft, maxTime]);

  // Timer Management for Active Question
  useEffect(() => {
    if (activeTab !== 'quiz' || hasAnswered) return;

    if (timeLeft <= 0) {
      handleSelectAnswer(-1);
      return;
    }

    if (timeLeft <= 3 && timeLeft > 0) {
      soundManager.playTimerTick();
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTab, hasAnswered, timeLeft, handleSelectAnswer]);

  // Keyboard Shortcuts: 1-4 for options, Enter to proceed
  useEffect(() => {
    if (activeTab !== 'quiz') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (!hasAnswered) {
        if (['1', '2', '3', '4'].includes(e.key)) {
          e.preventDefault();
          const optionIdx = parseInt(e.key, 10) - 1;
          handleSelectAnswer(optionIdx);
        }
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, hasAnswered, activeQuestions, currentIndex, timeLeft, maxTime, handleSelectAnswer]);

  // Start Regular Quiz
  const handleStartRegularQuiz = () => {
    soundManager.playClick();
    setIsDailyMode(false);
    setComboStreak(0);

    let pool = [...QUESTIONS_DATA];
    if (selectedTopic !== 'All') {
      pool = pool.filter(q => q.topic === selectedTopic);
    }
    if (selectedDifficulty !== 'Mixed') {
      pool = pool.filter(q => q.difficulty === selectedDifficulty);
    }

    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    if (chosen.length === 0) {
      alert('No questions match this specific topic/difficulty filter. Please select Mixed or All.');
      return;
    }

    const firstTimeLimit = getTimeLimitForDifficulty(chosen[0].difficulty);
    setActiveQuestions(chosen);
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setTimeLeft(firstTimeLimit);
    setMaxTime(firstTimeLimit);
    setRoundAnswers([]);
    setCurrentScore(0);
    setRoundStartTime(Date.now());
    setActiveTab('quiz');
  };

  // Start Daily Challenge
  const handleStartDailyChallenge = () => {
    soundManager.playClick();
    setIsDailyMode(true);
    setComboStreak(0);
    const dailyQs = getDailyChallengeQuestions(todayStr);

    const firstTimeLimit = getTimeLimitForDifficulty(dailyQs[0].difficulty);
    setActiveQuestions(dailyQs);
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setTimeLeft(firstTimeLimit);
    setMaxTime(firstTimeLimit);
    setRoundAnswers([]);
    setCurrentScore(0);
    setRoundStartTime(Date.now());
    setActiveTab('quiz');
  };

  // Next Question
  const handleNextQuestion = () => {
    soundManager.playClick();

    if (currentIndex + 1 < activeQuestions.length) {
      const nextQ = activeQuestions[currentIndex + 1];
      const nextLimit = getTimeLimitForDifficulty(nextQ.difficulty);
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
      setTimeLeft(nextLimit);
      setMaxTime(nextLimit);
    } else {
      finishQuizRound();
    }
  };

  // Finalize Quiz Round
  const finishQuizRound = () => {
    const totalQ = activeQuestions.length;
    const correctCount = roundAnswers.filter(a => a.isCorrect).length;
    const accuracy = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
    const timeSpent = Math.max(1, Math.round((Date.now() - roundStartTime) / 1000));

    const isDaily = isDailyMode;
    const eligibleForDailyBonus = isDaily && !isDailyDoneToday;
    const dailyBonus = eligibleForDailyBonus ? DAILY_CHALLENGE_BONUS : 0;
    const finalScore = currentScore + dailyBonus;

    // Confetti burst on perfect round (>=5 questions, 100% accuracy) in high-end celestial tones
    if (accuracy === 100 && totalQ >= 5) {
      soundManager.playCelebration();
      try {
        confetti({
          particleCount: 160,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00F0FF', '#38BDF8', '#60A5FA', '#F8FAFC', '#A5F3FC']
        });
      } catch {
        // Fallback
      }
    }

    const { currentStreak, bestStreak } = calculateNewStreak(stats, todayStr);

    const updatedTopicStats = { ...stats.topicStats };
    roundAnswers.forEach(rec => {
      const t = rec.question.topic;
      if (updatedTopicStats[t]) {
        updatedTopicStats[t].totalAnswered += 1;
        if (rec.isCorrect) {
          updatedTopicStats[t].correctAnswered += 1;
        }
      }
    });

    const newDailyDates = eligibleForDailyBonus
      ? [...(stats.dailyCompletedDates || []), todayStr]
      : (stats.dailyCompletedDates || []);

    const updatedTotalPoints = (stats.totalPoints || 0) + finalScore;
    const updatedBestScore = Math.max(stats.bestScore || 0, finalScore);

    const roundResult: QuizRoundResult = {
      id: `round-${Date.now()}`,
      score: finalScore,
      pointsEarned: finalScore,
      totalQuestions: totalQ,
      correctAnswers: correctCount,
      accuracy,
      timeSpentSeconds: timeSpent,
      topic: isDaily ? 'Daily Challenge' : selectedTopic,
      difficulty: isDaily ? 'Daily' : selectedDifficulty,
      isDaily,
      answers: roundAnswers,
      newlyUnlockedBadges: []
    };

    const preliminaryStats: UserStats = {
      ...stats,
      totalPoints: updatedTotalPoints,
      roundsPlayed: (stats.roundsPlayed || 0) + 1,
      totalQuestionsAnswered: (stats.totalQuestionsAnswered || 0) + totalQ,
      totalCorrectAnswers: (stats.totalCorrectAnswers || 0) + correctCount,
      currentStreak,
      bestStreak,
      lastPlayedDate: todayStr,
      dailyCompletedDates: newDailyDates,
      topicStats: updatedTopicStats,
      bestScore: updatedBestScore
    };

    const { unlockedBadgeIds, newlyUnlocked } = evaluateBadges(preliminaryStats, roundResult);
    const finalStats: UserStats = {
      ...preliminaryStats,
      unlockedBadgeIds
    };

    roundResult.newlyUnlockedBadges = newlyUnlocked;

    saveUserStats(finalStats);
    onUpdateStats(finalStats);

    const entry: LeaderboardEntry = {
      id: `lead-${Date.now()}`,
      playerName: playerName || 'Eco Explorer',
      score: finalScore,
      accuracy,
      topic: isDaily ? 'Daily' : selectedTopic,
      difficulty: isDaily ? 'Mixed' : selectedDifficulty,
      date: todayStr
    };
    const updatedLeaderboard = saveLeaderboardEntry(entry);
    onUpdateLeaderboard(updatedLeaderboard);

    newlyUnlocked.forEach(badge => {
      onBadgeUnlocked(badge);
    });

    setLastResult(roundResult);
    setActiveTab('results');
  };

  // Copy share card
  const handleCopyShareCard = () => {
    if (!lastResult) return;
    const text = generateShareCard(lastResult);
    navigator.clipboard.writeText(text).then(() => {
      setCopiedShareCard(true);
      setTimeout(() => setCopiedShareCard(false), 2500);
    });
  };

  // JSON Export & Import
  const handleExport = () => {
    soundManager.playClick();
    const jsonStr = exportDataAsJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ecoquiz-backup-${todayStr}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ev => {
      const content = ev.target?.result as string;
      const res = importDataFromJSON(content);
      if (res.success && res.data) {
        onUpdateStats(res.data.stats);
        onUpdateSettings(res.data.settings);
        onUpdateLeaderboard(res.data.leaderboard);
        setImportStatus('✓ Backup successfully imported!');
      } else {
        setImportStatus(`✕ ${res.message}`);
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    resetAllData();
    window.location.reload();
  };

  const levelProgress = getLevelProgress(stats.totalPoints || 0);
  const missedQuestions = lastResult?.answers.filter(a => !a.isCorrect) || [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      
      {/* Live Region for Screen Reader Accessibility */}
      <div aria-live="polite" className="sr-only">
        {activeTab === 'quiz' && (
          `Question ${currentIndex + 1} of ${activeQuestions.length}. ${timeLeft} seconds left. Current score ${currentScore}.`
        )}
      </div>

      {/* Top Play Sub-Navigation Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {(['setup', 'stats', 'badges', 'leaderboard'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => {
                soundManager.playClick();
                setActiveTab(tab);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                  : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
              }`}
            >
              {tab === 'setup' ? '◈ Setup' : tab}
            </button>
          ))}
        </div>

        {/* Level Ring Pill + Settings */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[#0F1422] border border-white/[0.08] text-xs font-mono shadow-sm">
            <span className="text-base text-cyan-400">{levelProgress.currentLevel.icon}</span>
            <span className="text-[#F8FAFC] font-bold">{levelProgress.currentLevel.title}</span>
            <span className="text-cyan-400">({stats.totalPoints || 0} pts)</span>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              setShowSettingsModal(true);
            }}
            aria-label="Open settings, backup, and reset dialog"
            className="w-8 h-8 rounded-xl bg-[#0F1422] border border-white/[0.08] text-[#94A3B8] hover:text-white flex items-center justify-center transition-colors text-sm"
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* VIEW 1: QUIZ SETUP */}
      {/* ======================================================== */}
      {activeTab === 'setup' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Round Customization */}
          <SpotlightCard className="lg:col-span-7 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                Round Setup Terminal
              </span>
              <h2 className="font-serif font-black text-2xl text-[#F8FAFC]">
                Customize Your Game
              </h2>
            </div>

            {/* Player Call-sign */}
            <div className="space-y-2">
              <label htmlFor="player-name-input" className="text-xs font-mono uppercase text-[#94A3B8] font-bold block">
                Player Call-sign
              </label>
              <input
                id="player-name-input"
                type="text"
                value={playerName}
                onChange={handleNameChange}
                maxLength={24}
                className="w-full px-4 py-3 rounded-2xl bg-[#070A0F] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 font-medium transition-colors shadow-inner"
              />
            </div>

            {/* Topic Selection */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-[#94A3B8] font-bold block">
                Syllabus Topic
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(['All', 'Waste', 'Water', 'Energy', 'Climate', 'Biodiversity'] as const).map(topic => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedTopic(topic);
                    }}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border font-mono ${
                      selectedTopic === topic
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] font-bold'
                        : 'bg-[#070A0F] text-[#94A3B8] border-white/10 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-[#94A3B8] font-bold block">
                Difficulty Level &amp; Speed
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'Mixed', label: 'Mixed', time: '10–20s' },
                  { id: 'Easy', label: 'Easy', time: '20s/q' },
                  { id: 'Medium', label: 'Medium', time: '15s/q' },
                  { id: 'Hard', label: 'Hard', time: '10s/q' }
                ].map(diff => (
                  <button
                    key={diff.id}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedDifficulty(diff.id as Difficulty | 'Mixed');
                    }}
                    className={`px-3 py-2.5 rounded-xl text-xs transition-all border text-left font-mono ${
                      selectedDifficulty === diff.id
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                        : 'bg-[#070A0F] text-[#94A3B8] border-white/10 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <div className="font-semibold">{diff.label}</div>
                    <div className="text-[10px] opacity-80">{diff.time}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Round Length */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-[#94A3B8] font-bold block">
                Round Length
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, 15].map(cnt => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setQuestionCount(cnt);
                    }}
                    className={`py-2.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                      questionCount === cnt
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                        : 'bg-[#070A0F] text-[#94A3B8] border-white/10 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {cnt} Questions
                  </button>
                ))}
              </div>
            </div>

            {/* Launch Button */}
            <div className="pt-2">
              <button
                onClick={handleStartRegularQuiz}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-base shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 font-mono uppercase tracking-wider"
              >
                <span>Start Practice Round</span>
                <span className="text-xs opacity-90">({questionCount} Questions)</span>
              </button>
            </div>
          </SpotlightCard>

          {/* Right Column: Daily Challenge Banner & Level Ring */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Daily Challenge Card */}
            <SpotlightCard className="p-6 sm:p-7 space-y-4 shadow-xl border border-cyan-400/30">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                  Daily Challenge
                </span>
                <span className="text-xs font-mono text-[#94A3B8]">
                  {todayStr}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif font-black text-2xl text-[#F8FAFC]">
                  Today's Planetary 5
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed font-sans">
                  5 questions chosen deterministically from today's date. Identical for every user globally.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#070A0F]/70 border border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-[#94A3B8]">Streak Completion Bonus:</span>
                <span className="text-cyan-300 font-bold">+50 Bonus Points</span>
              </div>

              {isDailyDoneToday ? (
                <div className="w-full py-3.5 rounded-2xl bg-[#070A0F] border border-white/10 text-[#94A3B8] text-xs font-mono font-bold text-center">
                  ✓ Daily Challenge Completed Today!
                </div>
              ) : (
                <button
                  onClick={handleStartDailyChallenge}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2 font-mono uppercase tracking-wider"
                >
                  <span>Play Daily Challenge</span>
                  <span>⚡</span>
                </button>
              )}
            </SpotlightCard>

            {/* Level & Progress Ring Card */}
            <SpotlightCard className="p-6 flex items-center gap-6 shadow-xl">
              {/* Circular Progress Ring */}
              <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#00F0FF"
                    strokeWidth="8"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * levelProgress.progressPercent) / 100}
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-700"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl text-cyan-300">{levelProgress.currentLevel.icon}</span>
                  <span className="text-[10px] font-mono font-bold text-cyan-300">
                    {levelProgress.progressPercent}%
                  </span>
                </div>
              </div>

              <div className="space-y-1 min-w-0">
                <span className="text-[10px] font-mono uppercase text-[#94A3B8]">
                  Level {levelProgress.currentLevel.level} of 5
                </span>
                <h4 className="font-serif font-bold text-lg text-[#F8FAFC] truncate">
                  {levelProgress.currentLevel.title}
                </h4>
                <p className="text-xs text-[#94A3B8] leading-tight font-sans">
                  {levelProgress.nextLevel ? (
                    <>Need {levelProgress.pointsToNext} pts for {levelProgress.nextLevel.title}</>
                  ) : (
                    <>Maximum Earth Guardian level reached!</>
                  )}
                </p>
              </div>
            </SpotlightCard>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 2: ACTIVE QUIZ TERMINAL */}
      {/* ======================================================== */}
      {activeTab === 'quiz' && currentQuestion && (
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Top Status Bar: Question, Timer, Combo, Running Score */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0F1422] border border-white/[0.08] text-xs font-mono shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="text-cyan-400 font-bold">
                Q {currentIndex + 1} / {activeQuestions.length}
              </span>
              <span className="text-white/20">|</span>
              <span className="text-slate-300 font-medium">
                {currentQuestion.topic} ({currentQuestion.difficulty})
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Combo Multiplier Pill */}
              {comboStreak > 1 && (
                <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold animate-bounce">
                  <span>🔥</span>
                  <span>{comboStreak}x COMBO</span>
                </div>
              )}

              <div className={`flex items-center gap-1.5 font-bold ${
                timeLeft <= 3 ? 'text-rose-400 animate-pulse' : 'text-cyan-300'
              }`}>
                <span>⏱️</span>
                <span>{timeLeft}s</span>
              </div>

              <span className="text-white/20">|</span>

              <div className="text-white font-bold">
                Score: {currentScore}
              </div>
            </div>
          </div>

          {/* Animated Countdown Timer Bar */}
          <div className="w-full h-1.5 rounded-full bg-[#070A0F] overflow-hidden border border-white/5">
            <div
              className={`h-full transition-all duration-1000 ${
                timeLeft <= 3 ? 'bg-rose-500' : 'bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500'
              }`}
              style={{ width: `${(timeLeft / maxTime) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <SpotlightCard className="p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* Prompt & Metadata */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                <span>Tag: {currentQuestion.tag}</span>
                <span>Base: {currentQuestion.difficulty === 'Hard' ? 30 : currentQuestion.difficulty === 'Medium' ? 20 : 10} pts</span>
              </div>
              <h3 className="font-serif font-black text-xl sm:text-2xl text-[#F8FAFC] leading-relaxed">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Four Options with Keyboard Badges */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correctIndex;
                
                let btnStyle = 'bg-[#070A0F] border-white/10 text-slate-200 hover:border-cyan-400/40 hover:bg-[#0B0F19]';

                if (hasAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold shadow-[0_0_20px_rgba(6,182,212,0.25)]';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                  } else {
                    btnStyle = 'bg-[#070A0F]/40 border-white/5 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={hasAnswered}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="w-7 h-7 rounded-xl bg-white/[0.05] border border-white/10 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 shadow-sm">
                        {idx + 1}
                      </span>
                      <span className="text-sm sm:text-base font-medium font-sans">
                        {option}
                      </span>
                    </div>

                    {hasAnswered && (
                      <span className="text-lg font-mono">
                        {isCorrect ? '✓' : isSelected ? '✕' : ''}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Scientific Explanation Callout */}
            {hasAnswered && (
              <div className="pt-6 border-t border-white/[0.08] space-y-4 animate-fadeIn">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#070A0F] border border-cyan-400/30 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                      <span>💡</span>
                      <span>Scientific Explanation</span>
                    </span>
                    <span className="text-[#94A3B8]">
                      Source: <strong className="text-white">{currentQuestion.source}</strong>
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                    {currentQuestion.explanation}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-mono text-[#94A3B8]">
                    Press <kbd className="px-2 py-1 rounded-lg bg-[#070A0F] border border-white/10 text-white font-mono">Enter</kbd> to proceed
                  </span>

                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center gap-2 font-mono uppercase tracking-wider"
                  >
                    <span>{currentIndex + 1 < activeQuestions.length ? 'Next Question →' : 'View Round Results'}</span>
                  </button>
                </div>
              </div>
            )}

          </SpotlightCard>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 3: ROUND RESULTS & LUXURY CREDENTIAL CARD */}
      {/* ======================================================== */}
      {activeTab === 'results' && lastResult && (
        <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
          
          {/* Summary Scorecard / Digital Credential */}
          <SpotlightCard className="p-6 sm:p-10 space-y-6 shadow-2xl text-center border-cyan-400/30">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold">
              <span>{lastResult.accuracy === 100 ? '🌟 PERFECT ROUND!' : '◈ Round Complete'}</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-[#94A3B8] tracking-widest block">
                Official Credential Record
              </span>
              <h2 className="font-serif font-black text-4xl sm:text-5xl text-[#F8FAFC]">
                {lastResult.score} Points
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8] font-mono">
                {lastResult.topic} • {lastResult.difficulty} • {lastResult.timeSpentSeconds}s duration
              </p>
            </div>

            {/* Metrics Trio */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#070A0F] border border-white/10">
              <div>
                <div className="font-serif font-bold text-2xl text-cyan-300">{lastResult.accuracy}%</div>
                <div className="text-[10px] font-mono text-[#94A3B8] uppercase mt-1">Accuracy</div>
              </div>
              <div>
                <div className="font-serif font-bold text-2xl text-white">{lastResult.correctAnswers} / {lastResult.totalQuestions}</div>
                <div className="text-[10px] font-mono text-[#94A3B8] uppercase mt-1">Correct</div>
              </div>
              <div>
                <div className="font-serif font-bold text-2xl text-cyan-300">{stats.currentStreak}d</div>
                <div className="text-[10px] font-mono text-[#94A3B8] uppercase mt-1">Streak</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('setup');
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all font-mono uppercase tracking-wider"
              >
                Play Another Round
              </button>

              <button
                onClick={handleCopyShareCard}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#070A0F] border border-white/10 text-white hover:border-cyan-400/50 font-semibold text-sm transition-all flex items-center justify-center gap-2 font-mono"
              >
                <span>{copiedShareCard ? '✓ Copied Plain Text Card!' : '📋 Copy Share Card'}</span>
              </button>
            </div>
          </SpotlightCard>

          {/* Missed Questions Review */}
          <SpotlightCard className="p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-xl text-[#F8FAFC]">
                Review &amp; Learning Consolidation
              </h3>
              <span className="text-xs font-mono text-[#94A3B8]">
                {missedQuestions.length === 0 ? 'Zero mistakes!' : `${missedQuestions.length} missed questions`}
              </span>
            </div>

            {missedQuestions.length === 0 ? (
              <div className="p-6 rounded-2xl bg-[#070A0F] border border-white/10 text-center space-y-2">
                <span className="text-3xl text-cyan-400">✦</span>
                <p className="text-sm font-serif text-white">Flawless performance!</p>
                <p className="text-xs text-[#94A3B8]">You correctly answered every question in this round.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {missedQuestions.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#070A0F] border border-white/10 space-y-2 text-left">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                      <span>{item.question.topic} • {item.question.difficulty}</span>
                      <span className="text-rose-400 font-bold">Missed</span>
                    </div>
                    <p className="text-sm font-medium text-white font-serif">
                      {item.question.question}
                    </p>
                    <div className="text-xs text-cyan-300 font-medium pt-1 font-mono">
                      Correct Answer: {item.question.options[item.question.correctIndex]}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-white/[0.08] font-sans">
                      {item.question.explanation}
                    </p>
                    <div className="text-[10px] font-mono text-slate-500 pt-1">
                      Source: {item.question.source}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SpotlightCard>

        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 4: USER STATS */}
      {/* ======================================================== */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          <SpotlightCard className="p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="font-serif font-black text-2xl text-[#F8FAFC]">
              Lifetime Player Statistics
            </h3>

            {/* Metrics Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-[#070A0F] border border-white/10">
                <div className="text-xs font-mono uppercase text-[#94A3B8]">Total Points</div>
                <div className="font-serif font-black text-2xl text-cyan-300 mt-1">{stats.totalPoints || 0}</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#070A0F] border border-white/10">
                <div className="text-xs font-mono uppercase text-[#94A3B8]">Rounds Played</div>
                <div className="font-serif font-black text-2xl text-white mt-1">{stats.roundsPlayed || 0}</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#070A0F] border border-white/10">
                <div className="text-xs font-mono uppercase text-[#94A3B8]">Overall Accuracy</div>
                <div className="font-serif font-black text-2xl text-cyan-300 mt-1">
                  {stats.totalQuestionsAnswered > 0
                    ? `${Math.round((stats.totalCorrectAnswers / stats.totalQuestionsAnswered) * 100)}%`
                    : '—'}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#070A0F] border border-white/10">
                <div className="text-xs font-mono uppercase text-[#94A3B8]">Best Streak</div>
                <div className="font-serif font-black text-2xl text-white mt-1">{stats.bestStreak || 0}d</div>
              </div>
            </div>

            {/* Topic Accuracy Breakdown */}
            <div className="space-y-3 pt-4 border-t border-white/[0.08]">
              <h4 className="font-serif font-bold text-lg text-[#F8FAFC]">
                Accuracy By Topic
              </h4>
              <div className="space-y-3">
                {(['Waste', 'Water', 'Energy', 'Climate', 'Biodiversity'] as const).map(topic => {
                  const tStat = stats.topicStats[topic] || { totalAnswered: 0, correctAnswered: 0 };
                  const acc = tStat.totalAnswered > 0 
                    ? Math.round((tStat.correctAnswered / tStat.totalAnswered) * 100) 
                    : 0;

                  return (
                    <div key={topic} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-white font-semibold">{topic}</span>
                        <span className="text-[#94A3B8]">
                          {acc}% ({tStat.correctAnswered}/{tStat.totalAnswered} answered)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#070A0F] border border-white/10 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${acc}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </SpotlightCard>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 5: 10 BADGES SHOWCASE */}
      {/* ======================================================== */}
      {activeTab === 'badges' && (
        <SpotlightCard className="p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-black text-2xl text-[#F8FAFC]">
              Ten Verified Badges
            </h3>
            <span className="text-xs font-mono text-cyan-300 font-bold">
              {stats.unlockedBadgeIds?.length || 0} / {ALL_BADGES.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ALL_BADGES.map(badge => {
              const isUnlocked = stats.unlockedBadgeIds?.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                    isUnlocked
                      ? 'bg-[#070A0F] border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                      : 'bg-[#070A0F]/40 border-white/5 opacity-50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 font-serif ${
                    isUnlocked ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-300' : 'bg-slate-900 border border-white/5 text-slate-600'
                  }`}>
                    {badge.icon}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-serif font-bold text-sm text-white">
                        {badge.name}
                      </h4>
                      {isUnlocked ? (
                        <span className="text-[10px] font-mono text-cyan-300 font-bold">
                          ✓ UNLOCKED
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-500">
                          LOCKED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-snug font-sans">
                      {badge.description}
                    </p>
                    <p className="text-[10px] font-mono text-slate-500 pt-0.5">
                      Rule: {badge.ruleExplanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </SpotlightCard>
      )}

      {/* ======================================================== */}
      {/* VIEW 6: LOCAL DEVICE LEADERBOARD */}
      {/* ======================================================== */}
      {activeTab === 'leaderboard' && (
        <SpotlightCard className="p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="font-serif font-black text-2xl text-[#F8FAFC]">
              Top 20 Device Leaderboard
            </h3>
            <p className="text-xs font-mono text-cyan-300">
              Saved on this device. Not a global leaderboard.
            </p>
          </div>

          {leaderboard.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#070A0F] border border-white/10 text-center space-y-2">
              <span className="text-3xl text-cyan-400">◈</span>
              <p className="text-sm font-serif text-white">No rounds logged on this device yet.</p>
              <p className="text-xs text-[#94A3B8]">Play a round above to establish your personal high scores.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-[#94A3B8]">
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Player</th>
                    <th className="py-2.5 px-3">Score</th>
                    <th className="py-2.5 px-3">Accuracy</th>
                    <th className="py-2.5 px-3">Topic</th>
                    <th className="py-2.5 px-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {leaderboard.map((entry, idx) => (
                    <tr key={entry.id || idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-3 font-bold text-cyan-300">{idx + 1}</td>
                      <td className="py-3 px-3 font-medium text-white">{entry.playerName}</td>
                      <td className="py-3 px-3 font-bold text-cyan-300">{entry.score} pts</td>
                      <td className="py-3 px-3 text-slate-300">{entry.accuracy}%</td>
                      <td className="py-3 px-3 text-slate-300">{entry.topic}</td>
                      <td className="py-3 px-3 text-[#94A3B8]">{entry.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </SpotlightCard>
      )}

      {/* ======================================================== */}
      {/* SETTINGS MODAL */}
      {/* ======================================================== */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0F1422] border border-white/10 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-black text-xl text-white">
                EcoQuiz Preferences &amp; Data
              </h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-xs font-mono text-[#94A3B8] hover:text-white p-1"
              >
                ✕ Close
              </button>
            </div>

            {/* Toggles */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#070A0F] border border-white/5">
                <div>
                  <div className="text-xs font-bold text-white">Sound Effects</div>
                  <div className="text-[11px] text-[#94A3B8]">Soft procedural Web Audio synthesis</div>
                </div>
                <button
                  onClick={() => {
                    const next = !settings.soundEnabled;
                    const upd = { ...settings, soundEnabled: next };
                    soundManager.enabled = next;
                    saveSettings(upd);
                    onUpdateSettings(upd);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold ${
                    settings.soundEnabled ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {settings.soundEnabled ? 'ON' : 'OFF'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#070A0F] border border-white/5">
                <div>
                  <div className="text-xs font-bold text-white">Reduced Motion Override</div>
                  <div className="text-[11px] text-[#94A3B8]">Disable background ambient motion</div>
                </div>
                <button
                  onClick={() => {
                    const next = !settings.reducedMotion;
                    const upd = { ...settings, reducedMotion: next };
                    saveSettings(upd);
                    onUpdateSettings(upd);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold ${
                    settings.reducedMotion ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {settings.reducedMotion ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Backup Export / Import */}
            <div className="space-y-3 pt-2 border-t border-white/[0.08]">
              <span className="text-xs font-mono uppercase text-[#94A3B8] font-bold block">
                Local Data Management
              </span>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleExport}
                  className="py-3 rounded-xl bg-[#070A0F] border border-white/10 hover:border-cyan-400/40 text-xs font-mono font-semibold text-white transition-all"
                >
                  📥 Export JSON
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="py-3 rounded-xl bg-[#070A0F] border border-white/10 hover:border-cyan-400/40 text-xs font-mono font-semibold text-white transition-all"
                >
                  📤 Import JSON
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleImportFile}
                  className="hidden"
                />
              </div>

              {importStatus && (
                <div className="p-3 rounded-xl bg-[#070A0F] border border-white/10 text-xs font-mono text-cyan-300">
                  {importStatus}
                </div>
              )}
            </div>

            {/* Danger Zone: Reset Data */}
            <div className="pt-2 border-t border-white/[0.08]">
              {showResetConfirm ? (
                <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 space-y-3">
                  <p className="text-xs text-rose-200">
                    Are you sure? This will permanently erase your points, streak, badges, and device leaderboard.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleResetData}
                      className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold font-mono"
                    >
                      Yes, Reset Everything
                    </button>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="px-4 py-2 rounded-xl bg-[#070A0F] text-[#94A3B8] text-xs font-mono"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="text-xs font-mono text-rose-400 hover:text-rose-300 transition-colors"
                >
                  ⚠️ Reset All Device Progress...
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
