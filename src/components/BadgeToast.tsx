import React from 'react';
import { Badge } from '../types';

interface BadgeToastProps {
  badge: Badge | null;
  onClose: () => void;
}

export const BadgeToast: React.FC<BadgeToastProps> = ({ badge, onClose }) => {
  if (!badge) return null;

  return (
    <div 
      role="status" 
      aria-live="polite"
      className="fixed bottom-20 md:bottom-6 right-4 z-50 max-w-sm sm:max-w-md w-full p-4 rounded-2xl bg-[#0F1422] border-2 border-cyan-400 text-[#F8FAFC] shadow-[0_0_30px_rgba(6,182,212,0.3)] backdrop-blur-2xl animate-bounce select-none"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-2xl shrink-0 shadow-sm">
          {badge.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-cyan-400">
              Badge Unlocked
            </span>
            <button
              onClick={onClose}
              aria-label="Dismiss badge notification"
              className="text-[#94A3B8] hover:text-[#F8FAFC] text-xs font-mono p-1"
            >
              ✕
            </button>
          </div>
          <h4 className="font-serif font-bold text-base text-[#F8FAFC] truncate">
            {badge.name}
          </h4>
          <p className="text-xs text-[#94A3B8] mt-0.5 leading-snug">
            {badge.description}
          </p>
        </div>
      </div>
    </div>
  );
};
