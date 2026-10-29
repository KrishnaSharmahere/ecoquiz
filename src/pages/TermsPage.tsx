import React from 'react';
import { SpotlightCard } from '../components/SpotlightCard';

interface TermsPageProps {
  onNavigate: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 select-text">
      
      {/* Header */}
      <div className="space-y-4 border-b border-white/[0.08] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
          Legal &amp; Academic Terms
        </div>
        <h1 className="font-serif font-black text-3xl sm:text-5xl text-[#F8FAFC] tracking-tight">
          Terms &amp; Conditions
        </h1>
        <p className="text-sm text-[#94A3B8] font-mono">
          Effective Date: October 2026 • Version 1.0 (Academic CA1 Release)
        </p>
      </div>

      {/* Narrative Card */}
      <SpotlightCard className="p-6 space-y-3 shadow-xl">
        <h2 className="font-serif font-bold text-lg text-cyan-300">
          1. Academic Project Framework
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed font-sans">
          EcoQuiz is an educational web application designed and developed strictly for academic purposes under course <strong>CHE110 Environmental Studies</strong> (CA1 Group Assignment, Topic 16: <em>Environmental Quiz and Gamification App</em>) at <strong>Lovely Professional University (LPU)</strong>. By accessing or using EcoQuiz, you acknowledge that this service is provided free of charge as a student demonstration and educational study tool.
        </p>
      </SpotlightCard>

      {/* Sections */}
      <div className="space-y-8 text-sm text-slate-300 leading-relaxed font-sans">
        
        <section className="space-y-3">
          <h3 className="font-serif font-bold text-xl text-white">
            2. Permitted Use &amp; Non-Commercial License
          </h3>
          <p>
            EcoQuiz is granted for personal, non-commercial, classroom, and community awareness purposes. You are encouraged to utilize this application for:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
            <li>Classroom warm-ups and environmental science lecture starters.</li>
            <li>Campus eco-club educational tournaments and sustainability events.</li>
            <li>Earth Day awareness exhibitions and public science kiosks.</li>
            <li>Individual self-revision and exam preparation.</li>
          </ul>
          <p>
            Commercial exploitation, resale, unauthorized mirroring for financial gain, or removal of the academic project attribution without explicit consent is strictly prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif font-bold text-xl text-white">
            3. Scientific Figures &amp; Fact Disclaimer
          </h3>
          <p>
            While every effort has been made to synthesize verified metrics from recognized scientific and governmental bodies—including the <em>US EPA WaterSense program</em>, <em>US Department of Energy</em>, <em>Intergovernmental Panel on Climate Change (IPCC)</em>, <em>IUCN Red List</em>, <em>Ramsar Convention</em>, <em>CITES</em>, and India's <em>E-Waste (Management) Rules, 2022</em>—EcoQuiz is an educational student project.
          </p>
          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-200 font-mono text-xs shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <strong>Mandatory Citation Notice:</strong> Check the original source report before quoting any specific figure in formal academic research, peer-reviewed publications, or public policy citations. EcoQuiz does not claim to be an official certifying authority.
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif font-bold text-xl text-white">
            4. Client-Side Execution &amp; Storage Integrity
          </h3>
          <p>
            EcoQuiz operates entirely within your web browser. No gameplay data, scores, player nicknames, or badge records are transmitted to remote servers. All persistence relies upon browser <code className="font-mono text-cyan-300 bg-cyan-500/10 px-1 rounded border border-cyan-500/20">localStorage</code>. 
          </p>
          <p>
            The project team is not liable for data loss arising from browser cache clears, private browsing session closures, or device storage purges. Users may export JSON backups via the Settings panel to preserve their historical progress across sessions.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif font-bold text-xl text-white">
            5. Intellectual Property &amp; Open Learning
          </h3>
          <p>
            The custom visual illustrations, dynamic 3D interactive planetary canvas, game engine logic, and test suites are developed by the student team. Third-party trademarks and organizational acronyms (IPCC, US EPA, IUCN, CITES, LPU) belong to their respective entities and are used solely under nominative fair use for educational reference.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif font-bold text-xl text-white">
            6. Limitation of Liability
          </h3>
          <p>
            The application is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, whether express or implied. The student team and Lovely Professional University disclaim all liability for any direct, indirect, incidental, or consequential damages arising from the use or inability to use this educational software.
          </p>
        </section>

        <section className="space-y-3 border-t border-white/[0.08] pt-6">
          <h3 className="font-serif font-bold text-xl text-white">
            7. Inquiries &amp; Academic Contact
          </h3>
          <p>
            For questions regarding this academic project, source data methodologies, or campus demonstration requests, please contact the student contributors:
          </p>
          <p className="font-mono text-xs text-cyan-300">
            CHE110 CA1 Group Assignment (Topic 16) • First-Year B.Tech Computer Science and Engineering, Lovely Professional University (LPU), Punjab, India.
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
