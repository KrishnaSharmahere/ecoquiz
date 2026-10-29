import React, { useEffect, useState, useRef } from 'react';
import { InteractiveGlobeCanvas } from '../components/InteractiveGlobeCanvas';
import { ImpactCalculator } from '../components/ImpactCalculator';
import { SpotlightCard } from '../components/SpotlightCard';
import { TOPIC_SUMMARIES } from '../data/questions';
import { soundManager } from '../utils/sound';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [counts, setCounts] = useState({ questions: 0, topics: 0, badges: 0, levels: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [activeTopicIndex, setActiveTopicIndex] = useState<number | null>(null);

  const statsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  // Animated counters on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1400;
          const startTime = performance.now();

          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCounts({
              questions: Math.floor(ease * 56),
              topics: Math.floor(ease * 5),
              badges: Math.floor(ease * 10),
              levels: Math.floor(ease * 5)
            });
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, [hasAnimated]);

  // Lazy-load video observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVideoLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const scrollToDemo = () => {
    soundManager.playClick();
    const el = document.getElementById('demo-video-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartPlay = () => {
    soundManager.playClick();
    onNavigate('/play');
  };

  const factsList = [
    {
      metric: '11,000 L',
      fact: 'One dripping tap can waste about 11,000 litres a year.',
      source: 'US EPA WaterSense: more than 3,000 gallons',
      category: 'Water Efficiency',
      tagColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
    },
    {
      metric: '95% Less',
      fact: 'Recycling aluminium uses about 95% less energy than making it from raw ore.',
      source: 'US Department of Energy',
      category: 'Circular Economy',
      tagColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20'
    },
    {
      metric: '75% Less',
      fact: 'LED bulbs use at least 75% less energy than incandescent bulbs.',
      source: 'US Department of Energy',
      category: 'Energy Standards',
      tagColor: 'text-amber-300 bg-amber-400/10 border-amber-400/20'
    },
    {
      metric: '1.1°C',
      fact: 'Global warming has reached about 1.1°C above pre-industrial levels.',
      source: 'IPCC',
      category: 'Climate Science',
      tagColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Pick a topic.',
      desc: 'Focus on Waste, Water, Energy, Climate, Biodiversity, or test your total readiness in a fast Mixed round.'
    },
    {
      number: '02',
      title: 'Beat the timer.',
      desc: 'Answer before the clock expires (10 to 20s). Correct responses earn time bonuses scaled to remaining seconds.'
    },
    {
      number: '03',
      title: 'Learn the science.',
      desc: 'Understand the empirical mechanisms right after every single answer, complete with authoritative source citations.'
    }
  ];

  const features = [
    { title: 'Timed Rounds', desc: '10s, 15s, or 20s per question with quick keyboard shortcuts (1–4, Enter).', icon: '⏱️' },
    { title: 'Instant Explanations', desc: 'No guessing: see the scientific reasoning and exact source after each choice.', icon: '💡' },
    { title: 'Daily Challenge', desc: '5 deterministic questions synced across the globe each day with a +50 bonus.', icon: '📅' },
    { title: '5 Progression Levels', desc: 'From Seedling to Earth Guardian, tracked via calibrated progress rings.', icon: '◈' },
    { title: '10 Verified Badges', desc: 'Milestones like Water Expert, Daily Devotee, and Lightning Reflexes with live alerts.', icon: '🏅' },
    { title: 'Detailed Stats', desc: 'Track accuracy per topic, total points, streak count, and device records.', icon: '📊' },
    { title: 'Fact Library', desc: '56 searchable and filterable scientific facts referenced to IPCC, US EPA, and CITES.', icon: '📚' },
    { title: 'Shareable Results', desc: 'Generate one-click clean text summaries of your scores to share with classmates.', icon: '🔗' }
  ];

  const topicsArray = Object.entries(TOPIC_SUMMARIES);

  return (
    <div className="space-y-24 md:space-y-36">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION WITH 3D INTERACTIVE GLOBE */}
      {/* ======================================================== */}
      <section className="relative min-h-[92vh] flex flex-col justify-center pt-8 pb-16 overflow-hidden">
        
        {/* Soft celestial radial atmospheric illumination */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-cyan-500/[0.07] rounded-full blur-[180px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-blue-600/[0.05] rounded-full blur-[150px] pointer-events-none -z-10" />

        {/* Live Empirical Ticker Tape */}
        <div className="w-full border-y border-white/[0.06] bg-[#070A0F]/60 backdrop-blur-md py-2 overflow-hidden mb-8">
          <div className="flex items-center gap-8 whitespace-nowrap text-[11px] font-mono text-[#94A3B8] animate-marquee">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" /> IPCC AR6: Global warming reached ~1.1°C</span>
            <span>•</span>
            <span className="text-white">US EPA WaterSense: One dripping tap wastes ~11,000 L / year</span>
            <span>•</span>
            <span className="text-cyan-300">Closed-Loop Aluminium: 95% less energy than raw ore</span>
            <span>•</span>
            <span className="text-white">US DOE Standard: LEDs consume ≥75% less power</span>
            <span>•</span>
            <span className="text-indigo-300">IUCN Red List: 44,000+ assessed species threatened</span>
            <span>•</span>
            <span className="text-white">CITES Appendices: International wildlife trade protection</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Editorial Headline & Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Academic Course Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                CHE110 CA1 Group Assignment • Topic 16
              </div>

              {/* Large Headline */}
              <div className="space-y-2">
                <h1 className="font-serif font-black text-4xl sm:text-6xl lg:text-7xl text-[#F8FAFC] tracking-tight leading-[1.04]">
                  <span>Learn the planet.</span><br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 italic">
                    Level up your impact.
                  </span>
                </h1>
              </div>

              {/* Required Exact Subline */}
              <p className="text-xl sm:text-2xl font-serif text-[#F8FAFC] font-medium tracking-tight">
                56 questions. 5 topics. Every answer explained.
              </p>

              <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                A free, browser-based environmental quiz designed to replace vague eco-feelings with empirical planetary numbers through fast, evidence-grounded gamification.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
                <button
                  onClick={handleStartPlay}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(6,182,212,0.35)]"
                >
                  <span>Play now</span>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>

                <button
                  onClick={scrollToDemo}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-[#F8FAFC] font-semibold text-base transition-all flex items-center justify-center gap-2.5"
                >
                  <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Watch the demo</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-[#94A3B8]">
                <span className="flex items-center gap-1.5">
                  <span className="text-cyan-400">✓</span> US EPA &amp; IPCC Sourced
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-cyan-400">✓</span> 100% Local Browser Privacy
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-cyan-400">✓</span> No Login Required
                </span>
              </div>
            </div>

            {/* Right Column: 3D Interactive Canvas Earth System Globe */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <InteractiveGlobeCanvas />
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. LIVE COUNT-UP METRICS (Spotlight Glass) */}
      {/* ======================================================== */}
      <section ref={statsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SpotlightCard className="p-8 sm:p-10 border border-white/[0.08] shadow-[0_8px_32px_-4px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
            
            <div className="text-center pt-4 lg:pt-0">
              <div className="font-serif font-black text-4xl sm:text-5xl text-cyan-400 tracking-tight">
                {counts.questions}
              </div>
              <p className="text-xs uppercase font-mono tracking-widest text-[#94A3B8] mt-2 font-bold">
                Fact-Checked Questions
              </p>
              <p className="text-[11px] text-[#94A3B8]/70 mt-0.5">Every answer explained</p>
            </div>

            <div className="text-center pt-4 lg:pt-0 lg:pl-6">
              <div className="font-serif font-black text-4xl sm:text-5xl text-[#F8FAFC] tracking-tight">
                {counts.topics}
              </div>
              <p className="text-xs uppercase font-mono tracking-widest text-[#94A3B8] mt-2 font-bold">
                Core Planetary Topics
              </p>
              <p className="text-[11px] text-[#94A3B8]/70 mt-0.5">Waste to Biodiversity</p>
            </div>

            <div className="text-center pt-4 lg:pt-0 lg:pl-6">
              <div className="font-serif font-black text-4xl sm:text-5xl text-cyan-400 tracking-tight">
                {counts.badges}
              </div>
              <p className="text-xs uppercase font-mono tracking-widest text-[#94A3B8] mt-2 font-bold">
                Achievement Badges
              </p>
              <p className="text-[11px] text-[#94A3B8]/70 mt-0.5">Clear unlock criteria</p>
            </div>

            <div className="text-center pt-4 lg:pt-0 lg:pl-6">
              <div className="font-serif font-black text-4xl sm:text-5xl text-[#F8FAFC] tracking-tight">
                {counts.levels}
              </div>
              <p className="text-xs uppercase font-mono tracking-widest text-[#94A3B8] mt-2 font-bold">
                Evolutionary Levels
              </p>
              <p className="text-[11px] text-[#94A3B8]/70 mt-0.5">Seedling to Earth Guardian</p>
            </div>

          </div>
        </SpotlightCard>
      </section>

      {/* ======================================================== */}
      {/* 3. EVERYDAY WASTE HIDES IN PLAIN SIGHT (4 CARDS) */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            The Empirical Baseline
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[#F8FAFC] tracking-tight">
            Everyday waste hides in plain sight
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Our daily decisions around water, energy, and consumption are guided by vague assumptions. Here is what peer-reviewed research actually reveals:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {factsList.map((item, idx) => (
            <SpotlightCard
              key={idx}
              className="p-6 transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded border ${item.tagColor}`}>
                    {item.category}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="font-serif font-black text-3xl text-cyan-300 tracking-tight">
                  {item.metric}
                </div>
                <p className="text-sm text-[#F8FAFC] font-medium leading-relaxed">
                  {item.fact}
                </p>
              </div>

              <div className="pt-6 border-t border-white/[0.08] mt-6 space-y-1">
                <span className="text-[10px] font-mono text-[#94A3B8]/70 block">
                  Source Tag:
                </span>
                <span className="text-xs font-mono text-cyan-300 font-semibold block">
                  {item.source}
                </span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. INTERACTIVE IMPACT CALCULATOR (NEW BESPOKE LAB) */}
      {/* ======================================================== */}
      <ImpactCalculator />

      {/* ======================================================== */}
      {/* 5. HOW IT WORKS (3 NUMBERED STEPS WITH CONNECTORS) */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            Cognitive Flow
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#F8FAFC] tracking-tight">
            How it works
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Three steps designed around retrieval practice and immediate feedback consolidation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-[18%] right-[18%] -translate-y-6 h-0.5 border-t-2 border-dashed border-white/10 -z-10" />

          {steps.map((s, idx) => (
            <SpotlightCard
              key={idx}
              className="p-8 relative flex flex-col items-center text-center space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/15 via-blue-600/10 to-indigo-950/40 border border-cyan-400/40 text-cyan-300 font-mono font-black text-xl flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                {s.number}
              </div>
              <h3 className="font-serif font-bold text-xl text-[#F8FAFC]">
                {s.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                {s.desc}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. FEATURE GRID (8 CARDS) */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            Engineered For Retention
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#F8FAFC] tracking-tight">
            Features designed for recall
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Everything needed for classroom warm-ups, campus eco-clubs, and revision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <SpotlightCard
              key={idx}
              className="p-6 space-y-3 hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            >
              <div className="text-3xl">{f.icon}</div>
              <h3 className="font-serif font-bold text-lg text-[#F8FAFC]">
                {f.title}
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {f.desc}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. PROJECT DEMO SECTION (Lazy-Loaded Video) */}
      {/* ======================================================== */}
      <section id="demo-video-section" ref={videoRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            Demonstration
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#F8FAFC] tracking-tight">
            Our project demo
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            A guided walkthrough of the timed quiz mechanics, instant explanations, and local statistics.
          </p>
        </div>

        <SpotlightCard className="p-4 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {videoLoaded ? (
            <div className="relative aspect-video rounded-xl bg-black border border-white/10 overflow-hidden flex items-center justify-center">
              <iframe
                src="[DEMO_VIDEO_URL]"
                title="EcoQuiz Project Demonstration Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none flex items-end p-6">
                <div className="text-left space-y-1">
                  <span className="text-[10px] font-mono uppercase bg-cyan-400 text-slate-950 px-2 py-0.5 rounded font-bold">
                    Demo Video
                  </span>
                  <p className="text-xs text-[#F8FAFC] font-mono">
                    Target URL: [DEMO_VIDEO_URL]
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="aspect-video rounded-xl bg-[#080B10] border border-white/10 flex flex-col items-center justify-center p-6 text-center space-y-3">
              <div className="w-16 h-16 rounded-xl bg-white/[0.04] border border-cyan-400/40 text-cyan-400 flex items-center justify-center text-2xl font-bold">
                ▶
              </div>
              <p className="text-sm text-[#F8FAFC] font-serif">Loading project demo video...</p>
            </div>
          )}

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] gap-2 pt-2">
            <span>Caption: <strong>Our project demo.</strong> CHE110 CA1 Group Assignment (Topic 16).</span>
            <a
              href="[DEMO_VIDEO_URL]"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 hover:underline font-mono"
            >
              Open in external tab →
            </a>
          </div>
        </SpotlightCard>
      </section>

      {/* ======================================================== */}
      {/* 8. TOPIC SHOWCASE (5 CARDS WITH TAP/HOVER REVEAL) */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            Syllabus Curriculum
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#F8FAFC] tracking-tight">
            Explore the five topics
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Hover or tap each card to reveal sample questions and answers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {topicsArray.map(([key, topic], idx) => {
            const isRevealed = activeTopicIndex === idx;

            return (
              <SpotlightCard
                key={key}
                onMouseEnter={() => setActiveTopicIndex(idx)}
                onMouseLeave={() => setActiveTopicIndex(null)}
                onClick={() => setActiveTopicIndex(isRevealed ? null : idx)}
                className="group relative p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer min-h-[300px] shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-xs font-mono font-bold px-2.5 py-0.5 rounded"
                      style={{ color: topic.color, backgroundColor: `${topic.color}15`, border: `1px solid ${topic.color}35` }}
                    >
                      {topic.count} Questions
                    </span>
                    <span className="text-xs text-[#94A3B8] font-mono">
                      #{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[#F8FAFC]">
                    {topic.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                {/* Question & Answer Reveal Area */}
                <div className="mt-6 pt-4 border-t border-white/[0.08] space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8]/60 block">
                    Sample Question:
                  </span>
                  <p className="text-xs font-medium text-[#F8FAFC]">
                    &ldquo;{topic.sampleQuestion}&rdquo;
                  </p>

                  {/* Revealable Answer */}
                  <div className={`transition-all duration-300 overflow-hidden ${
                    isRevealed ? 'max-h-24 opacity-100 pt-2' : 'max-h-0 opacity-0'
                  }`}>
                    <span className="text-[10px] font-mono text-cyan-300 block font-bold">
                      Answer &amp; Source:
                    </span>
                    <p className="text-xs text-cyan-300 font-medium">
                      ✓ {topic.sampleAnswer}
                    </p>
                  </div>

                  {!isRevealed && (
                    <span className="text-[10px] font-mono text-[#94A3B8]/60 block pt-1">
                      (Tap or hover to reveal answer)
                    </span>
                  )}
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. CLOSING BAND */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SpotlightCard className="p-10 sm:p-14 text-center overflow-hidden shadow-[0_8px_32px_rgba(6,182,212,0.15)]">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="font-serif font-black text-3xl sm:text-5xl text-[#F8FAFC] tracking-tight">
              Play EcoQuiz today.
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              Test your knowledge, beat the timer, earn badges, and build lasting literacy across 56 sourced environmental facts.
            </p>
            <div className="pt-2">
              <button
                onClick={handleStartPlay}
                className="px-9 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-base transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.35)]"
              >
                <span>Launch Quiz Round</span>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </SpotlightCard>
      </section>

    </div>
  );
};
