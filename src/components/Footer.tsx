import React from 'react';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
    }
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#070A0F] text-[#94A3B8] mt-28 pb-24 md:pb-12 text-sm select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & Academic Line */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/15 to-indigo-950/40 border border-cyan-400/40 text-cyan-300 flex items-center justify-center font-bold text-sm font-mono tracking-wider shadow-sm">
                EQ
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-[#F8FAFC] tracking-tight">EcoQuiz</span>
                <span className="text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded ml-2 font-bold">
                  LPU • CHE110
                </span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-sm leading-relaxed">
              &ldquo;Learn the planet. Level up your impact.&rdquo; An evidence-grounded gamification app with timed questions, daily challenges, and instant scientific explanations.
            </p>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <p className="text-xs text-[#F8FAFC] font-mono font-medium">
                Academic Context:
              </p>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed font-mono">
                CHE110 Environmental Studies, CA1 group assignment, Topic 16 &ldquo;Environmental Quiz and Gamification App&rdquo;, Lovely Professional University (LPU). First-year B.Tech Computer Science project.
              </p>
            </div>
          </div>

          {/* Column 2: Navigation & Legal Pages */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              Platform &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="#/" 
                  onClick={e => handleNav('/', e)} 
                  className="text-[#94A3B8] hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a 
                  href="#/play" 
                  onClick={e => handleNav('/play', e)} 
                  className="text-[#94A3B8] hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Play Quiz Engine</span>
                </a>
              </li>
              <li>
                <a 
                  href="#/library" 
                  onClick={e => handleNav('/library', e)} 
                  className="text-[#94A3B8] hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Fact Library (56 Sourced Entries)</span>
                </a>
              </li>
              <li>
                <a 
                  href="#/about" 
                  onClick={e => handleNav('/about', e)} 
                  className="text-[#94A3B8] hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <span>About Project &amp; Contributors</span>
                </a>
              </li>
              <li className="pt-2 border-t border-white/5">
                <a 
                  href="#/terms" 
                  onClick={e => handleNav('/terms', e)} 
                  className="text-[#94A3B8] hover:text-cyan-300 transition-colors flex items-center gap-1.5 font-medium"
                >
                  <span>Terms &amp; Conditions</span>
                </a>
              </li>
              <li>
                <a 
                  href="#/privacy" 
                  onClick={e => handleNav('/privacy', e)} 
                  className="text-[#94A3B8] hover:text-cyan-300 transition-colors flex items-center gap-1.5 font-medium"
                >
                  <span>Privacy Policy (Zero-Telemetry)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Exact Placeholders & External Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              Project Channels &amp; Placeholders
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <a 
                href="[GITHUB_REPO_LINK]" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyan-400/40 text-[#F8FAFC] hover:text-cyan-300 transition-all flex items-center justify-between"
              >
                <span>GitHub Repository</span>
                <span className="text-[10px] font-mono text-cyan-400">[GITHUB_REPO_LINK]</span>
              </a>
              <a 
                href="[DEMO_VIDEO_URL]" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyan-400/40 text-[#F8FAFC] hover:text-cyan-300 transition-all flex items-center justify-between"
              >
                <span>Project Demo Video</span>
                <span className="text-[10px] font-mono text-cyan-400">[DEMO_VIDEO_URL]</span>
              </a>
              <a 
                href="[YOUTUBE_SHORTS_LINK]" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyan-400/40 text-[#F8FAFC] hover:text-cyan-300 transition-all flex items-center justify-between"
              >
                <span>YouTube Shorts Preview</span>
                <span className="text-[10px] font-mono text-cyan-400">[YOUTUBE_SHORTS_LINK]</span>
              </a>
              <a 
                href="[INSTAGRAM_LINK]" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyan-400/40 text-[#F8FAFC] hover:text-cyan-300 transition-all flex items-center justify-between"
              >
                <span>Instagram Reel</span>
                <span className="text-[10px] font-mono text-cyan-400">[INSTAGRAM_LINK]</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Team Attribution */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] gap-3">
          <p>
            Team: <strong className="text-[#F8FAFC]">Krishan Chander Khjuriya</strong> (spelled as on the official course list), <strong className="text-[#F8FAFC]">Aman Dadwal</strong>, <strong className="text-[#F8FAFC]">Harsh Srivastava</strong>.
          </p>
          <p className="font-mono text-[11px] text-cyan-400">
            CHE110 • Lovely Professional University (LPU)
          </p>
        </div>
      </div>
    </footer>
  );
};
