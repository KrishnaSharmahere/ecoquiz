import React, { useState, useMemo } from 'react';
import { QUESTIONS_DATA } from '../data/questions';
import { CITED_SOURCES, SOURCE_DISCLAIMER_NOTE } from '../data/sources';
import { Topic, Difficulty, UserStats } from '../types';
import { soundManager } from '../utils/sound';
import { saveUserStats } from '../utils/storage';
import { SpotlightCard } from '../components/SpotlightCard';

interface LibraryPageProps {
  stats: UserStats;
  onUpdateStats: (newStats: UserStats) => void;
  onNavigate: (path: string) => void;
}

export const LibraryPage: React.FC<LibraryPageProps> = ({
  stats,
  onUpdateStats
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<Topic | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [studyMode, setStudyMode] = useState(false);
  const [revealedStudyIds, setRevealedStudyIds] = useState<string[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  const filteredQuestions = useMemo(() => {
    return QUESTIONS_DATA.filter(q => {
      const matchesTopic = selectedTopic === 'All' || q.topic === selectedTopic;
      const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      
      const qLower = q.question.toLowerCase();
      const expLower = q.explanation.toLowerCase();
      const tagLower = q.tag.toLowerCase();
      const srcLower = q.source.toLowerCase();
      const correctAns = q.options[q.correctIndex].toLowerCase();
      const queryLower = searchQuery.toLowerCase().trim();

      const matchesSearch = queryLower === '' ||
        qLower.includes(queryLower) ||
        expLower.includes(queryLower) ||
        tagLower.includes(queryLower) ||
        srcLower.includes(queryLower) ||
        correctAns.includes(queryLower);

      return matchesTopic && matchesDifficulty && matchesSearch;
    });
  }, [searchQuery, selectedTopic, selectedDifficulty]);

  // Track fact inspection for the Library Scholar badge
  const handleInspectFact = (factId: string) => {
    soundManager.playClick();

    if (studyMode) {
      setRevealedStudyIds(prev => 
        prev.includes(factId) ? prev.filter(id => id !== factId) : [...prev, factId]
      );
    }

    const currentExplored = stats.factsExplored || [];
    if (!currentExplored.includes(factId)) {
      const updatedFacts = [...currentExplored, factId];
      const updated = { ...stats, factsExplored: updatedFacts };
      saveUserStats(updated);
      onUpdateStats(updated);
    }
  };

  const handleToggleBookmark = (factId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClick();
    setBookmarkedIds(prev =>
      prev.includes(factId) ? prev.filter(id => id !== factId) : [...prev, factId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
          Empirical Knowledge Intelligence Archive
        </span>
        <h1 className="font-serif font-black text-3xl sm:text-5xl text-[#F8FAFC] tracking-tight">
          Environmental Fact Library
        </h1>
        <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-sans">
          Search and examine all 56 peer-reviewed environmental questions, correct answers, scientific mechanisms, and official treaty citations.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <SpotlightCard className="p-6 sm:p-8 space-y-6 shadow-2xl">
        
        {/* Search Bar + Study Mode Toggle Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search keywords, numbers, laws, or sources (e.g. 11,000 litres, LED, EPR, CITES, methane)..."
              className="w-full pl-11 pr-14 py-3.5 rounded-2xl border border-white/10 bg-[#070A0F] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
            />
            <span className="absolute left-4 top-3.5 text-base text-cyan-400 font-mono">
              ⌕
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3.5 text-xs font-mono text-[#94A3B8] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Study Mode Toggle Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              setStudyMode(!studyMode);
            }}
            className={`w-full sm:w-auto px-5 py-3.5 rounded-2xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 border ${
              studyMode
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-[#070A0F] text-[#94A3B8] border-white/10 hover:text-white'
            }`}
          >
            <span>{studyMode ? '🎓 Study Mode: ON (Answers Hidden)' : '📖 Study Flashcard Mode'}</span>
          </button>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/[0.08]">
          {/* Topic Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-mono uppercase text-[#94A3B8] mr-1 font-bold">
              Topic:
            </span>
            {(['All', 'Waste', 'Water', 'Energy', 'Climate', 'Biodiversity'] as const).map(topic => (
              <button
                key={topic}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedTopic(topic);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border font-mono ${
                  selectedTopic === topic
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    : 'bg-[#070A0F] text-[#94A3B8] border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Difficulty Filters */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono uppercase text-[#94A3B8] mr-1 font-bold">
              Difficulty:
            </span>
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map(diff => (
              <button
                key={diff}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedDifficulty(diff);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border font-mono ${
                  selectedDifficulty === diff
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    : 'bg-[#070A0F] text-[#94A3B8] border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] pt-2 border-t border-white/5">
          <span>Showing {filteredQuestions.length} of {QUESTIONS_DATA.length} verified facts</span>
          <span>Facts explored: {stats.factsExplored?.length || 0} / 56</span>
        </div>
      </SpotlightCard>

      {/* Questions Grid with Spotlight Effect */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuestions.map((q, idx) => {
          const isExplored = stats.factsExplored?.includes(q.id);
          const isBookmarked = bookmarkedIds.includes(q.id);
          const isRevealedInStudy = revealedStudyIds.includes(q.id);
          const showAnswer = !studyMode || isRevealedInStudy;

          return (
            <SpotlightCard
              key={q.id || idx}
              onClick={() => handleInspectFact(q.id)}
              className={`p-6 transition-all cursor-pointer flex flex-col justify-between hover:-translate-y-1 shadow-lg ${
                isExplored ? 'border-cyan-400/30' : 'border-white/[0.08]'
              }`}
            >
              <div className="space-y-4">
                {/* Meta header */}
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-cyan-300 font-bold">
                    {q.topic}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      q.difficulty === 'Hard' ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30' :
                      q.difficulty === 'Medium' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' :
                      'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                    }`}>
                      {q.difficulty}
                    </span>
                    <button
                      onClick={e => handleToggleBookmark(q.id, e)}
                      title="Bookmark this scientific fact"
                      className="text-base text-slate-400 hover:text-cyan-300 transition-colors"
                    >
                      {isBookmarked ? '★' : '☆'}
                    </button>
                  </div>
                </div>

                {/* Question Prompt */}
                <h3 className="font-serif font-bold text-base text-[#F8FAFC] leading-snug">
                  {q.question}
                </h3>

                {/* Verified Answer Highlight / Study Reveal */}
                {showAnswer ? (
                  <div className="p-3.5 rounded-2xl bg-[#070A0F] border border-cyan-400/20 space-y-1 animate-fadeIn">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                      ✓ Verified Answer
                    </span>
                    <p className="text-xs font-semibold text-slate-200">
                      {q.options[q.correctIndex]}
                    </p>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-[#070A0F] border border-dashed border-white/15 text-center">
                    <span className="text-xs font-mono text-cyan-300 font-semibold">
                      Click to reveal verified answer →
                    </span>
                  </div>
                )}

                {/* Scientific Explanation */}
                {showAnswer && (
                  <p className="text-xs text-slate-300 leading-relaxed font-sans animate-fadeIn">
                    {q.explanation}
                  </p>
                )}
              </div>

              {/* Source Tag & Citation */}
              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#94A3B8]">Source:</span>
                <span className="text-cyan-300 font-bold truncate max-w-[200px]" title={q.source}>
                  {q.source}
                </span>
              </div>
            </SpotlightCard>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* SOURCES SECTION (Exact 10 Sources + Required Disclaimer) */}
      {/* ======================================================== */}
      <SpotlightCard className="p-8 sm:p-10 space-y-8 shadow-2xl">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            Authoritative Citations
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#F8FAFC]">
            Cited Scientific Frameworks &amp; Treaties
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-sans">
            EcoQuiz sources every data point, threshold, and metric directly from official publications and peer-reviewed releases of these organizations:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CITED_SOURCES.map((source, idx) => (
            <div
              key={source.id || idx}
              className="p-4 rounded-2xl bg-[#070A0F] border border-white/5 space-y-2 hover:border-cyan-400/40 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center border border-cyan-400/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                #{idx + 1}
              </div>
              <h4 className="font-serif font-bold text-sm text-[#F8FAFC]">
                {source.name}
              </h4>
              <p className="text-[11px] font-mono text-cyan-400 font-semibold">
                {source.focus}
              </p>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed font-sans">
                {source.description}
              </p>
            </div>
          ))}
        </div>

        {/* Required Mandatory Disclaimer Note */}
        <div className="p-4 rounded-2xl bg-[#070A0F] border border-cyan-400/30 text-center shadow-[0_0_20px_rgba(6,182,212,0.1)]">
          <p className="text-xs sm:text-sm text-cyan-200 font-mono font-bold">
            &ldquo;{SOURCE_DISCLAIMER_NOTE}&rdquo;
          </p>
        </div>
      </SpotlightCard>

    </div>
  );
};
