import React from 'react';
import { SpotlightCard } from '../components/SpotlightCard';

interface PrivacyPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 select-text">
      
      {/* Header */}
      <div className="space-y-4 border-b border-white/[0.08] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
          100% Client-Side Architecture
        </div>
        <h1 className="font-serif font-black text-3xl sm:text-5xl text-[#F8FAFC] tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#94A3B8] font-mono">
          Last Updated: October 2026 • Zero Telemetry Guarantee
        </p>
      </div>

      {/* Privacy Highlight Banner */}
      <SpotlightCard className="p-6 sm:p-8 space-y-3 shadow-2xl border-cyan-400/30">
        <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider">
          <span>🔒</span>
          <span>Zero Server Data Collection</span>
        </div>
        <h2 className="font-serif font-bold text-xl text-white">
          Your Privacy Is Guaranteed by Design
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed font-sans">
          EcoQuiz was built with a strict <strong>offline-first, zero-telemetry architecture</strong>. There are no tracking scripts, no advertisements, no tracking cookies, and no backend database servers. Your personal information, quiz answers, scores, and learning progress never leave your personal web browser.
        </p>
      </SpotlightCard>

      {/* Privacy Policy Breakdown */}
      <div className="space-y-8 text-sm text-slate-300 leading-relaxed font-sans">
        
        <section className="space-y-3">
          <h3 className="font-serif font-bold text-xl text-white">
            1. Information We Do NOT Collect
          </h3>
          <p>
            Unlike typical commercial quiz portals and social apps, EcoQuiz does not harvest or process any of the following:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <SpotlightCard className="p-3.5 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-300">✕ No User Accounts</span>
              <p className="text-xs text-[#94A3B8]">No passwords, email addresses, phone numbers, or social logins are ever required.</p>
            </SpotlightCard>
            <SpotlightCard className="p-3.5 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-300">✕ No Analytics or Telemetry</span>
              <p className="text-xs text-[#94A3B8]">No Google Analytics, Meta Pixel, Hotjar session recorders, or telemetry trackers.</p>
            </SpotlightCard>
            <SpotlightCard className="p-3.5 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-300">✕ No Fingerprinting</span>
              <p className="text-xs text-[#94A3B8]">We do not read canvas hashes, IP logs, or device hardware identifiers.</p>
            </SpotlightCard>
            <SpotlightCard className="p-3.5 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-300">✕ No Commercial Cookies</span>
              <p className="text-xs text-[#94A3B8]">Zero third-party marketing or profiling cookies are deposited on your device.</p>
            </SpotlightCard>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif font-bold text-xl text-white">
            2. How Local Browser Storage Is Utilized
          </h3>
          <p>
            To deliver gamification features without a backend, EcoQuiz utilizes standard HTML5 <code className="font-mono text-cyan-300 bg-cyan-500/10 px-1 rounded border border-cyan-500/20">localStorage</code> strictly on your device. The following data objects are stored under versioned keys (<code className="font-mono text-slate-400">ecoquiz:v1:*</code>):
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
            <li><strong>Player Call-sign:</strong> A nickname chosen locally by you (e.g., &ldquo;Eco Explorer&rdquo;).</li>
            <li><strong>Score &amp; Level Metrics:</strong> Lifetime points, rounds played, accuracy percentages, and current day streak.</li>
            <li><strong>Unlocked Badges:</strong> The IDs of achievement badges you have legitimately unlocked.</li>
            <li><strong>Explored Facts:</strong> IDs of scientific facts inspected in the Library to evaluate the Library Scholar badge.</li>
            <li><strong>Preferences:</strong> Sound effect toggle state, reduced motion override, and theme choice.</li>
            <li><strong>Device Leaderboard:</strong> Top 20 historical scores achieved strictly on this specific device.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif font-bold text-xl text-white">
            3. Full User Control: Export &amp; Erasure
          </h3>
          <p>
            In compliance with international data autonomy standards, you maintain unconditional control over your data:
          </p>
          <SpotlightCard className="p-5 space-y-2">
            <h4 className="font-serif font-bold text-white text-base">
              Portability &amp; Reset Tools
            </h4>
            <p className="text-xs text-slate-300">
              Inside the <strong>Play → Settings (⚙️)</strong> dialog, you can:
            </p>
            <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1 pl-2">
              <li><strong>Export JSON Backup:</strong> Download an offline, readable JSON file containing all your local records.</li>
              <li><strong>Import JSON Backup:</strong> Restore your progress onto another device or browser.</li>
              <li><strong>Reset Progress:</strong> Permanently wipe all EcoQuiz data from your browser storage in one verified click.</li>
            </ol>
          </SpotlightCard>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif font-bold text-xl text-white">
            4. External Embeds &amp; Third-Party Links
          </h3>
          <p>
            The project demo section includes an embedded video container for project evaluation. When activating embedded media or following links to YouTube, Instagram, or GitHub, the privacy policies of those respective third-party platforms apply. EcoQuiz does not share any identifier or browsing behavior with those services.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif font-bold text-xl text-white">
            5. Academic &amp; Children's Privacy
          </h3>
          <p>
            EcoQuiz is designed for university students, educators, and the general public. Because we collect zero personally identifiable information (PII), the application does not knowingly solicit or maintain data from minors under age 13 or 16, fully conforming with COPPA and global privacy expectations.
          </p>
        </section>

        <section className="space-y-3 border-t border-white/[0.08] pt-6">
          <h3 className="font-serif font-bold text-xl text-white">
            6. Policy Updates &amp; Contact
          </h3>
          <p>
            Any future revisions to this policy will be reflected directly on this page with an updated timestamp. For inquiries regarding our zero-telemetry architectural design:
          </p>
          <p className="font-mono text-xs text-cyan-300">
            CHE110 Environmental Studies CA1 • Lovely Professional University, Phagwara, Punjab 144411, India.
          </p>
        </section>

      </div>

      {/* Return to App Button */}
      <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
        <button
          onClick={() => onNavigate('/')}
          className="px-6 py-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white font-mono text-xs font-semibold transition-all flex items-center gap-2"
        >
          ← Return to Home
        </button>
        <button
          onClick={() => onNavigate('/play')}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
        >
          Launch Quiz →
        </button>
      </div>

    </div>
  );
};
