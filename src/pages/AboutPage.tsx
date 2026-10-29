import React from 'react';
import { SpotlightCard } from '../components/SpotlightCard';

export const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Krishan Chander Khjuriya',
      initials: 'KC',
      institutionLine: 'B.Tech Computer Science, Lovely Professional University'
    },
    {
      name: 'Aman Dadwal',
      initials: 'AD',
      institutionLine: 'B.Tech Computer Science, Lovely Professional University'
    },
    {
      name: 'Harsh Srivastava',
      initials: 'HS',
      institutionLine: 'B.Tech Computer Science, Lovely Professional University'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* 1. Header & Project Story */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
          CHE110 CA1 Group Assignment • Topic 16
        </div>
        <h1 className="font-serif font-black text-3xl sm:text-5xl text-[#F8FAFC] tracking-tight">
          The EcoQuiz Project Story
        </h1>
        <p className="text-base text-[#94A3B8] leading-relaxed font-sans">
          Developed for CHE110 Environmental Studies, CA1 group assignment, Topic 16 &ldquo;Environmental Quiz and Gamification App&rdquo; at Lovely Professional University (LPU). A first-year B.Tech Computer Science initiative.
        </p>
      </section>

      {/* 2. Problem & Objective Narrative */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* The Problem */}
        <SpotlightCard className="p-8 space-y-4 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center text-xl font-bold font-mono">
            !
          </div>
          <h2 className="font-serif font-bold text-2xl text-white">
            The Problem
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            Everyday choices about water, energy, waste, and climate are guided by vague feelings rather than numbers. Because household resource flows remain hidden behind municipal infrastructure and bills, citizens struggle to prioritize high-impact conservation actions.
          </p>
        </SpotlightCard>

        {/* The Objective */}
        <SpotlightCard className="p-8 space-y-4 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 flex items-center justify-center text-xl font-bold font-mono shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            ◈
          </div>
          <h2 className="font-serif font-bold text-2xl text-white">
            The Objective
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            Help students and the public remember real environmental numbers and understand why they matter, through short games that reward consistent learning. Ground environmental habits in empirical data verified by international scientific treaties.
          </p>
        </SpotlightCard>
      </section>

      {/* 3. The Design Approach & Pedagogy */}
      <SpotlightCard className="p-8 sm:p-10 space-y-6 shadow-xl">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            Methodology &amp; Pedagogy
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
            Our Design Approach
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed font-sans">
          <p>
            We avoided generic templates and common eco clichés in favor of a cinematic, editorial visual identity. Using a deep velvet cosmos slate accented with electric celestial cyan, archival typography, and an interactive 3D planetary canvas, the interface treats planetary science with gravity and prestige.
          </p>
          <p>
            Pedagogically, retrieval practice with immediate feedback ensures memory consolidation. Timed questions create focus, instant explanations ensure error-correction, and daily deterministic challenges create healthy learning habits.
          </p>
        </div>
      </SpotlightCard>

      {/* 4. How the App Works */}
      <SpotlightCard className="p-8 space-y-4 shadow-xl">
        <h2 className="font-serif font-bold text-xl text-white">
          How The App Works
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          EcoQuiz operates 100% in the client browser with <strong>zero backend servers</strong> and <strong>no user login</strong>. All game history, total points, streaks, level tiers, and unlocked badges are stored safely in browser <code className="font-mono text-cyan-300 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">localStorage</code> under versioned keys.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          Your progress can be exported at any time into a portable offline JSON backup file, and restored on another browser or device with built-in format validation.
        </p>
      </SpotlightCard>

      {/* 5. Target Applications */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            Real-World Impact
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-white">
            Practical Applications
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SpotlightCard className="p-5 text-center space-y-2">
            <span className="text-2xl block">🏛️</span>
            <h3 className="font-serif font-bold text-base text-white">Classroom Warm-ups</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Quick 2-minute introductory rounds to stimulate discussion at the start of college lectures.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-5 text-center space-y-2">
            <span className="text-2xl block text-cyan-300">◇</span>
            <h3 className="font-serif font-bold text-base text-white">Campus Eco-Clubs</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Friendly competitive challenges and device tournaments during university sustainability drives.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-5 text-center space-y-2">
            <span className="text-2xl block">📢</span>
            <h3 className="font-serif font-bold text-base text-white">Awareness Drives</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Interactive kiosk quizzes for Earth Day and sustainability festivals that visitors can play instantly.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-5 text-center space-y-2">
            <span className="text-2xl block">📋</span>
            <h3 className="font-serif font-bold text-base text-white">Exam Revision</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Targeted revision tool for students preparing for CHE110 and environmental studies exams.
            </p>
          </SpotlightCard>
        </div>
      </section>

      {/* 6. Team Section (Exact Rule: member name, B.Tech Computer Science, Lovely Professional University, initials avatar. NO roles, photos, quotes, bios) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            Project Contributors
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-white">
            Project Team
          </h2>
          <p className="text-xs text-[#94A3B8] font-mono">
            CHE110 Environmental Studies • Lovely Professional University (LPU)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => (
            <SpotlightCard
              key={idx}
              className="p-8 text-center space-y-4 hover:-translate-y-1 shadow-2xl"
            >
              {/* Initials Avatar */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 font-serif font-black text-2xl flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(6,182,212,0.35)] border border-cyan-300/40">
                {member.initials}
              </div>

              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-white">
                  {member.name}
                </h3>
                <p className="text-xs text-[#94A3B8] font-medium">
                  {member.institutionLine}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 7. Footer Project Links */}
      <SpotlightCard className="p-6 text-center space-y-3 shadow-xl">
        <span className="text-xs font-mono uppercase text-cyan-400 font-bold">
          Project Repository &amp; Media
        </span>
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
          <a
            href="[GITHUB_REPO_LINK]"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-cyan-300 underline"
          >
            [GITHUB_REPO_LINK]
          </a>
          <a
            href="[YOUTUBE_SHORTS_LINK]"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-cyan-300 underline"
          >
            [YOUTUBE_SHORTS_LINK]
          </a>
          <a
            href="[INSTAGRAM_LINK]"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-cyan-300 underline"
          >
            [INSTAGRAM_LINK]
          </a>
        </div>
      </SpotlightCard>

    </div>
  );
};
