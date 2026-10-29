import React, { useState } from 'react';
import { soundManager } from '../utils/sound';
import { QuizSettings } from '../types';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  settings: QuizSettings;
  onToggleSound: () => void;
  onToggleTheme: () => void;
  streak: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  settings,
  onToggleSound,
  onToggleTheme,
  streak
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Play', path: '/play' },
    { label: 'Library', path: '/library' },
    { label: 'About', path: '/about' }
  ];

  const handleNav = (path: string) => {
    soundManager.playClick();
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    soundManager.playClick();
    if (currentPath === '/') {
      const el = document.getElementById('demo-video-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    onNavigate('/');
    setTimeout(() => {
      const el = document.getElementById('demo-video-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-xl border-b border-white/[0.08] text-[#F8FAFC] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Academic Tag */}
        <button
          onClick={() => handleNav('/')}
          className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
        >
          {/* Prestige Monogram Mark */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/15 via-blue-600/10 to-indigo-950/40 border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:border-cyan-300 transition-all font-mono font-bold text-sm tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            EQ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-xl text-[#F8FAFC] tracking-tight group-hover:text-cyan-300 transition-colors">
                EcoQuiz
              </span>
              <span className="text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded font-bold border border-cyan-500/30">
                CHE110
              </span>
            </div>
            <p className="text-[11px] text-[#94A3B8] tracking-tight hidden sm:block font-medium">
              Learn the planet. Level up your impact.
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.02] border border-white/5">
          {navItems.map(item => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_20px_rgba(6,182,212,0.35)]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* Demo Button */}
          <button
            onClick={handleDemoClick}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 flex items-center gap-1.5 transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Demo</span>
          </button>
        </nav>

        {/* Right Utility Bar: Streak + Theme + Sound + CTA */}
        <div className="flex items-center gap-2">
          {/* Streak Badge */}
          <div 
            title={`Active streak: ${streak} consecutive days`}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono font-bold"
          >
            <span>🔥</span>
            <span>{streak}d</span>
          </div>

          {/* Procedural Audio Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              soundManager.playClick();
            }}
            aria-label={settings.soundEnabled ? 'Mute procedural sound synthesis' : 'Enable procedural sound synthesis'}
            className="w-9 h-9 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs text-[#94A3B8] hover:text-white flex items-center justify-center transition-colors"
          >
            {settings.soundEnabled ? '🔊' : '🔇'}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              onToggleTheme();
              soundManager.playClick();
            }}
            aria-label={`Switch to ${settings.theme === 'dark' ? 'light' : 'dark'} mode`}
            className="w-9 h-9 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs text-[#94A3B8] hover:text-white flex items-center justify-center transition-colors"
          >
            {settings.theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Fast Launch Quiz CTA (Desktop) */}
          <button
            onClick={() => handleNav('/play')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all transform hover:-translate-y-0.5 ml-1"
          >
            <span>Play Quiz</span>
            <span>→</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 text-white flex items-center justify-center"
          >
            <span className="text-base">{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0B0F19]/95 backdrop-blur-2xl px-4 py-4 space-y-2 animate-fadeIn">
          {navItems.map(item => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold'
                    : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            onClick={handleDemoClick}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-[#94A3B8] hover:bg-white/5 hover:text-white flex items-center gap-2"
          >
            <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Watch Demo Video</span>
          </button>
        </div>
      )}
    </header>
  );
};
