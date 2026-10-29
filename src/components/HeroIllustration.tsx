import React, { useEffect, useState } from 'react';

interface HeroIllustrationProps {
  scrollProgress?: number;
}

export const HeroIllustration: React.FC<HeroIllustrationProps> = () => {
  const [rotation, setRotation] = useState<number>(0);
  const [scrollFactor, setScrollFactor] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight || 800;
      const factor = Math.min(1, Math.max(0, scrollY / (windowHeight * 1.2)));
      setScrollFactor(factor);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let animId: number;
    const start = performance.now();
    const loop = (now: number) => {
      const elapsed = (now - start) / 1000;
      setRotation(elapsed * 10); // silky continuous planetary revolution
      animId = requestAnimationFrame(loop);
    };

    if (!mediaQuery.matches) {
      animId = requestAnimationFrame(loop);
    }

    return () => {
      mediaQuery.removeEventListener('change', handler);
      window.removeEventListener('scroll', handleScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  // Angles modulated by rotation and scroll
  const primaryAngle = rotation + scrollFactor * 85;
  const secondaryAngle = -rotation * 0.7 - scrollFactor * 110;
  const equatorialExpansion = 1 + scrollFactor * 0.12;
  const atmosphericPulse = 1 + Math.sin(rotation * 0.05) * 0.025;

  return (
    <div className="relative w-full max-w-[480px] mx-auto aspect-square flex items-center justify-center select-none">
      {/* Deep Celestial Blue Aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-indigo-900/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div 
        className="absolute w-72 h-72 rounded-full bg-cyan-400/[0.05] blur-2xl -z-10 pointer-events-none transition-transform duration-700"
        style={{ transform: `scale(${equatorialExpansion})` }}
      />

      {/* Atmospheric Starlight Specks */}
      {!reducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span 
            className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300/60 shadow-[0_0_8px_#38bdf8] animate-pulse"
            style={{ top: '15%', left: '20%' }}
          />
          <span 
            className="absolute w-1 h-1 rounded-full bg-blue-200/50 shadow-[0_0_6px_#60a5fa]"
            style={{ top: '32%', right: '16%' }}
          />
          <span 
            className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/40"
            style={{ bottom: '26%', left: '14%' }}
          />
          <span 
            className="absolute w-1 h-1 rounded-full bg-indigo-300/50"
            style={{ bottom: '36%', right: '18%' }}
          />
        </div>
      )}

      {/* Planetary Astrolabe / Earth System Orrery SVG */}
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full drop-shadow-2xl transition-transform duration-300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Interactive Planetary Astrolabe and Earth System Biosphere Orrery"
      >
        <defs>
          {/* Gradients */}
          <radialGradient id="globeDepth" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#151E32" />
            <stop offset="60%" stopColor="#0E1422" />
            <stop offset="100%" stopColor="#070A0F" />
          </radialGradient>

          <linearGradient id="cyanHorizon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A5F3FC" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          <linearGradient id="silverGleam" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E293B" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#94A3B8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0.5" />
          </linearGradient>

          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ======================================================== */}
        {/* 1. OUTER CELESTIAL COORDINATE DIAL */}
        {/* ======================================================== */}
        <circle
          cx="250"
          cy="250"
          r="230"
          stroke="#38BDF8"
          strokeOpacity="0.2"
          strokeWidth="1.2"
          strokeDasharray="3 6"
        />
        <circle
          cx="250"
          cy="250"
          r="215"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1"
        />

        {/* 12 Astrolabe Radial Markers */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 250 + 215 * Math.cos(angle);
          const y1 = 250 + 215 * Math.sin(angle);
          const x2 = 250 + 227 * Math.cos(angle);
          const y2 = 250 + 227 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#38BDF8"
              strokeOpacity={i % 3 === 0 ? "0.7" : "0.3"}
              strokeWidth={i % 3 === 0 ? "1.6" : "1"}
            />
          );
        })}

        {/* Cardinal Latitude/Longitude Callouts */}
        <text x="250" y="16" fill="#38BDF8" opacity="0.8" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">00°N</text>
        <text x="490" y="253" fill="#38BDF8" opacity="0.8" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">090°E</text>
        <text x="250" y="492" fill="#38BDF8" opacity="0.8" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">180°S</text>
        <text x="12" y="253" fill="#38BDF8" opacity="0.8" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">270°W</text>

        {/* ======================================================== */}
        {/* 2. REVOLVING GIMBAL RINGS & TOPIC NODES */}
        {/* ======================================================== */}
        {/* Outer Gimbal (Primary Axis) */}
        <g transform={`rotate(${primaryAngle}, 250, 250)`}>
          <ellipse
            cx="250"
            cy="250"
            rx="195"
            ry="92"
            stroke="url(#cyanHorizon)"
            strokeWidth="1.6"
            strokeDasharray="160 10 30 10"
            fill="none"
            opacity="0.8"
          />
          {/* Orbital Node: Water (3,000 gal / 11,000 L marker) */}
          <circle cx="445" cy="250" r="5.5" fill="#38BDF8" filter="url(#cyanGlow)" />
          <circle cx="445" cy="250" r="10" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.4" fill="none" />
          <text x="445" y="234" fill="#38BDF8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">WATER</text>

          {/* Orbital Node: Climate (+1.1°C IPCC marker) */}
          <circle cx="55" cy="250" r="5.5" fill="#F43F5E" filter="url(#cyanGlow)" />
          <circle cx="55" cy="250" r="10" stroke="#F43F5E" strokeWidth="1" strokeOpacity="0.4" fill="none" />
          <text x="55" y="234" fill="#F43F5E" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">1.1°C</text>
        </g>

        {/* Inner Counter-Gimbal (Secondary Axis) */}
        <g transform={`rotate(${secondaryAngle}, 250, 250)`}>
          <ellipse
            cx="250"
            cy="250"
            rx="175"
            ry="78"
            stroke="url(#silverGleam)"
            strokeWidth="1.4"
            fill="none"
            opacity="0.85"
          />
          {/* Orbital Node: Energy (75% LED / Energy Standards) */}
          <circle cx="250" cy="172" r="5.5" fill="#FBBF24" filter="url(#cyanGlow)" />
          <circle cx="250" cy="172" r="10" stroke="#FBBF24" strokeWidth="1" strokeOpacity="0.4" fill="none" />
          <text x="250" y="156" fill="#FBBF24" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ENERGY</text>

          {/* Orbital Node: Waste (95% Closed-Loop / Circular Economy) */}
          <circle cx="250" cy="328" r="5.5" fill="#FB923C" filter="url(#cyanGlow)" />
          <circle cx="250" cy="328" r="10" stroke="#FB923C" strokeWidth="1" strokeOpacity="0.4" fill="none" />
          <text x="250" y="348" fill="#FB923C" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CIRCULAR</text>
        </g>

        {/* ======================================================== */}
        {/* 3. CENTRAL PLANETARY BIOSPHERE SPHERE */}
        {/* ======================================================== */}
        {/* Globe Base Plate */}
        <circle
          cx="250"
          cy="250"
          r={120 * atmosphericPulse}
          fill="url(#globeDepth)"
          stroke="#38BDF8"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />

        {/* Atmospheric Glow Ring */}
        <circle
          cx="250"
          cy="250"
          r={124 * atmosphericPulse}
          stroke="#00D2FF"
          strokeOpacity="0.18"
          strokeWidth="3"
        />

        {/* Latitude Lines (Parallels) */}
        <ellipse cx="250" cy="250" rx="120" ry="16" stroke="#38BDF8" strokeOpacity="0.35" strokeWidth="1" />
        <ellipse cx="250" cy="210" rx="113" ry="13" stroke="#38BDF8" strokeOpacity="0.22" strokeWidth="0.8" />
        <ellipse cx="250" cy="290" rx="113" ry="13" stroke="#38BDF8" strokeOpacity="0.22" strokeWidth="0.8" />
        <ellipse cx="250" cy="175" rx="94" ry="10" stroke="#38BDF8" strokeOpacity="0.18" strokeWidth="0.8" strokeDasharray="3 3" />
        <ellipse cx="250" cy="325" rx="94" ry="10" stroke="#38BDF8" strokeOpacity="0.18" strokeWidth="0.8" strokeDasharray="3 3" />

        {/* Longitude Lines (Meridians) */}
        <ellipse cx="250" cy="250" rx="36" ry="120" stroke="#38BDF8" strokeOpacity="0.3" strokeWidth="1" />
        <ellipse cx="250" cy="250" rx="76" ry="120" stroke="#38BDF8" strokeOpacity="0.22" strokeWidth="0.8" />
        <line x1="250" y1="130" x2="250" y2="370" stroke="#38BDF8" strokeOpacity="0.4" strokeWidth="1.2" />

        {/* Dynamic Vector Continents (Fine Celestial Silver-Cyan Ink) */}
        <g stroke="#38BDF8" strokeOpacity="0.8" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Northern Hemisphere landmasses */}
          <path d="M 230 195 Q 242 190 255 198 Q 268 205 278 200 Q 285 212 272 218 Q 258 222 245 216 Q 235 220 228 208 Z" fill="#38BDF8" fillOpacity="0.12" />
          <path d="M 195 210 Q 205 205 215 212 Q 220 225 210 232 Q 200 230 192 222 Z" fill="#38BDF8" fillOpacity="0.08" />
          {/* Southern Hemisphere landmasses */}
          <path d="M 260 260 Q 275 255 285 268 Q 290 285 278 298 Q 265 305 258 290 Q 252 275 260 260 Z" fill="#38BDF8" fillOpacity="0.12" />
          <path d="M 210 270 Q 225 268 230 280 Q 228 295 218 300 Q 205 292 208 280 Z" fill="#38BDF8" fillOpacity="0.08" />
        </g>

        {/* Central Core Specimen Focal Ring */}
        <circle cx="250" cy="250" r="16" stroke="#00D2FF" strokeWidth="1.5" strokeDasharray="4 2" fill="none" opacity="0.8" />
        <circle cx="250" cy="250" r="6" fill="#00D2FF" filter="url(#cyanGlow)" />
        <circle cx="250" cy="250" r="2.5" fill="#070A0F" />

        {/* ======================================================== */}
        {/* 4. VERIFIED METRIC CHIPS ON CORNERS */}
        {/* ======================================================== */}
        <g className="font-mono text-[9px]">
          {/* Metric 1: 56 Questions Peer-Reviewed */}
          <g transform="translate(365, 75)">
            <rect x="0" y="0" width="112" height="30" rx="8" fill="#0F1422" stroke="#38BDF8" strokeOpacity="0.35" strokeWidth="1" />
            <text x="12" y="14" fill="#38BDF8" fontWeight="bold">56 QUESTIONS</text>
            <text x="12" y="24" fill="#94A3B8" fontSize="7">PEER-REVIEWED</text>
          </g>

          {/* Metric 2: 5 Earth Systems */}
          <g transform="translate(25, 75)">
            <rect x="0" y="0" width="112" height="30" rx="8" fill="#0F1422" stroke="#38BDF8" strokeOpacity="0.35" strokeWidth="1" />
            <text x="12" y="14" fill="#38BDF8" fontWeight="bold">5 CORE SYSTEMS</text>
            <text x="12" y="24" fill="#94A3B8" fontSize="7">EMPIRICAL DATA</text>
          </g>

          {/* Metric 3: Zero Telemetry */}
          <g transform="translate(365, 395)">
            <rect x="0" y="0" width="112" height="30" rx="8" fill="#0F1422" stroke="#38BDF8" strokeOpacity="0.35" strokeWidth="1" />
            <text x="12" y="14" fill="#38BDF8" fontWeight="bold">LOCAL CLIENT</text>
            <text x="12" y="24" fill="#94A3B8" fontSize="7">ZERO TELEMETRY</text>
          </g>

          {/* Metric 4: Academic Rigor */}
          <g transform="translate(25, 395)">
            <rect x="0" y="0" width="112" height="30" rx="8" fill="#0F1422" stroke="#38BDF8" strokeOpacity="0.35" strokeWidth="1" />
            <text x="12" y="14" fill="#38BDF8" fontWeight="bold">LPU CHE110</text>
            <text x="12" y="24" fill="#94A3B8" fontSize="7">ASSIGNMENT 16</text>
          </g>
        </g>
      </svg>
    </div>
  );
};
