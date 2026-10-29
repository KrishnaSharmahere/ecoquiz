import React from 'react';
import { soundManager } from '../utils/sound';

interface MobileTabBarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const MobileTabBar: React.FC<MobileTabBarProps> = ({ currentPath, onNavigate }) => {
  const tabs = [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      id: 'play',
      label: 'Play',
      path: '/play',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'library',
      label: 'Library',
      path: '/library',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M6 6h10" />
          <path d="M6 10h10" />
        </svg>
      )
    },
    {
      id: 'about',
      label: 'About',
      path: '/about',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      )
    }
  ];

  const handleTabClick = (path: string) => {
    soundManager.playClick();
    onNavigate(path);
  };

  const handleDemoClick = () => {
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
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0F19]/95 backdrop-blur-2xl border-t border-white/[0.08] px-3 py-1.5 flex items-center justify-around select-none shadow-2xl safe-area-pb"
    >
      {tabs.map(tab => {
        const isActive = currentPath === tab.path;
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.path)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive
                ? 'text-cyan-400'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <div className={`p-1.5 rounded-lg transition-transform ${isActive ? 'scale-110 bg-cyan-500/15 shadow-[0_0_12px_rgba(6,182,212,0.3)]' : ''}`}>
              {tab.icon}
            </div>
            <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-bold text-cyan-300' : 'font-medium'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}

      {/* Demo Tab */}
      <button
        onClick={handleDemoClick}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[#94A3B8] hover:text-[#F8FAFC] transition-all"
      >
        <div className="p-1.5 rounded-lg">
          <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span className="text-[10px] font-medium tracking-tight mt-0.5 text-cyan-300">
          Demo
        </span>
      </button>
    </nav>
  );
};
