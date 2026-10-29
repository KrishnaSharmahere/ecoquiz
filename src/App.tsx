import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { MobileTabBar } from './components/MobileTabBar';
import { Footer } from './components/Footer';
import { BadgeToast } from './components/BadgeToast';
import { HomePage } from './pages/HomePage';
import { LibraryPage } from './pages/LibraryPage';
import { AboutPage } from './pages/AboutPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { UserStats, QuizSettings, LeaderboardEntry, Badge } from './types';
import { loadUserStats, loadSettings, loadLeaderboard, saveSettings } from './utils/storage';
import { soundManager } from './utils/sound';

// Code-split PlayPage for Lighthouse mobile performance
const PlayPageLazy = lazy(() =>
  import('./pages/PlayPage').then(module => ({ default: module.PlayPage }))
);

export const App: React.FC = () => {
  // Navigation Router (supports hash-based or path routing)
  const [currentPath, setCurrentPath] = useState<string>('/');

  // Global Persistent State
  const [stats, setStats] = useState<UserStats>(loadUserStats);
  const [settings, setSettings] = useState<QuizSettings>(loadSettings);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(loadLeaderboard);
  const [unlockedToastBadge, setUnlockedToastBadge] = useState<Badge | null>(null);

  // Initialize sound manager
  useEffect(() => {
    soundManager.enabled = settings.soundEnabled;
  }, [settings.soundEnabled]);

  // Synchronize theme
  useEffect(() => {
    if (settings.theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#F8FAF8';
      document.body.style.color = '#0F172A';
    } else {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0B0F12';
      document.body.style.color = '#F8FAFC';
    }
  }, [settings.theme]);

  // Synchronize hash routing across navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      if (['/', '/play', '/library', '/about', '/terms', '/privacy'].includes(hash)) {
        setCurrentPath(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSound = () => {
    const nextState = !settings.soundEnabled;
    const updated = { ...settings, soundEnabled: nextState };
    soundManager.enabled = nextState;
    saveSettings(updated);
    setSettings(updated);
    if (nextState) {
      soundManager.playCorrect();
    }
  };

  const handleToggleTheme = () => {
    const nextTheme: 'dark' | 'light' = settings.theme === 'dark' ? 'light' : 'dark';
    const updated = { ...settings, theme: nextTheme };
    saveSettings(updated);
    setSettings(updated);
  };

  const handleBadgeUnlocked = (badge: Badge) => {
    setUnlockedToastBadge(badge);
    soundManager.playCelebration();
    setTimeout(() => {
      setUnlockedToastBadge(null);
    }, 6000);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors selection:bg-cyan-500/25 selection:text-cyan-300 ${
      settings.theme === 'light' ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#0B0F19] text-[#F8FAFC] cosmos-grid'
    }`}>
      {/* Toast alert on badge unlock */}
      <BadgeToast 
        badge={unlockedToastBadge} 
        onClose={() => setUnlockedToastBadge(null)} 
      />

      {/* Sticky Global Glass Navbar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        settings={settings}
        onToggleSound={handleToggleSound}
        onToggleTheme={handleToggleTheme}
        streak={stats.currentStreak || 0}
      />

      {/* Main Routed Page Content */}
      <main className="flex-1 pb-16 md:pb-0">
        {currentPath === '/' && (
          <HomePage onNavigate={navigateTo} />
        )}

        {currentPath === '/play' && (
          <Suspense fallback={
            <div className="py-28 text-center space-y-3 font-mono text-xs text-slate-400">
              <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mx-auto" />
              <p>Initializing EcoQuiz Engine...</p>
            </div>
          }>
            <PlayPageLazy
              stats={stats}
              settings={settings}
              leaderboard={leaderboard}
              onUpdateStats={setStats}
              onUpdateLeaderboard={setLeaderboard}
              onUpdateSettings={setSettings}
              onBadgeUnlocked={handleBadgeUnlocked}
              onNavigate={navigateTo}
            />
          </Suspense>
        )}

        {currentPath === '/library' && (
          <LibraryPage
            stats={stats}
            onUpdateStats={setStats}
            onNavigate={navigateTo}
          />
        )}

        {currentPath === '/about' && (
          <AboutPage />
        )}

        {currentPath === '/terms' && (
          <TermsPage onNavigate={navigateTo} />
        )}

        {currentPath === '/privacy' && (
          <PrivacyPage onNavigate={navigateTo} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Mobile-Only Sticky Bottom Tab Bar */}
      <MobileTabBar
        currentPath={currentPath}
        onNavigate={navigateTo}
      />
    </div>
  );
};
