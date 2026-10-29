import React, { useState } from 'react';
import { SpotlightCard } from './SpotlightCard';

interface Scenario {
  id: string;
  title: string;
  unit: string;
  min: number;
  max: number;
  defaultVal: number;
  step: number;
  topic: string;
  source: string;
  calculate: (val: number) => {
    primaryMetric: string;
    primaryLabel: string;
    secondaryMetric: string;
    secondaryLabel: string;
    realWorldEquivalent: string;
  };
}

export const ImpactCalculator: React.FC = () => {
  const scenarios: Scenario[] = [
    {
      id: 'water-tap',
      title: 'Dripping Faucet Leak',
      unit: 'dripping taps fixed',
      min: 1,
      max: 10,
      defaultVal: 2,
      step: 1,
      topic: 'Water Efficiency',
      source: 'US EPA WaterSense',
      calculate: (val: number) => ({
        primaryMetric: `${(val * 11000).toLocaleString()} Litres`,
        primaryLabel: 'Annual Freshwater Conserved',
        secondaryMetric: `${(val * 3000).toLocaleString()} Gallons`,
        secondaryLabel: 'US EPA Standard Volume',
        realWorldEquivalent: `Saves enough clean drinking water to sustain ${val * 15} adults for an entire year.`
      })
    },
    {
      id: 'aluminium-recycle',
      title: 'Aluminium Can Recycling',
      unit: 'cans recycled',
      min: 10,
      max: 500,
      defaultVal: 100,
      step: 10,
      topic: 'Circular Economy',
      source: 'US Department of Energy',
      calculate: (val: number) => ({
        primaryMetric: '95% Less Energy',
        primaryLabel: 'Reduction vs Raw Bauxite Smelting',
        secondaryMetric: `${Math.round(val * 0.17)} kWh`,
        secondaryLabel: 'Electrical Grid Energy Saved',
        realWorldEquivalent: `Generates enough power to run a modern LED television for ${Math.round(val * 2.8)} continuous hours.`
      })
    },
    {
      id: 'led-lighting',
      title: 'LED Bulb Replacement',
      unit: 'incandescents replaced with LEDs',
      min: 2,
      max: 30,
      defaultVal: 8,
      step: 2,
      topic: 'Energy Standards',
      source: 'US Department of Energy',
      calculate: (val: number) => ({
        primaryMetric: '≥ 75% Less Energy',
        primaryLabel: 'Operational Wattage Reduction',
        secondaryMetric: `${val * 180} kWh / yr`,
        secondaryLabel: 'Annual Household Load Avoided',
        realWorldEquivalent: `Prevents approximately ${Math.round(val * 72)} kg of carbon emissions from fossil fuel generation.`
      })
    }
  ];

  const [activeScenarioId, setActiveScenarioId] = useState(scenarios[0].id);
  const [sliderValue, setSliderValue] = useState(scenarios[0].defaultVal);

  const activeScenario = scenarios.find(s => s.id === activeScenarioId) || scenarios[0];
  const results = activeScenario.calculate(sliderValue);

  const handleSelectScenario = (id: string) => {
    const sc = scenarios.find(s => s.id === id);
    if (sc) {
      setActiveScenarioId(id);
      setSliderValue(sc.defaultVal);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
          Interactive Empirical Lab
        </span>
        <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[#F8FAFC] tracking-tight">
          Simulate your planetary impact
        </h2>
        <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
          Drag the interactive slider to see how single household decisions scale into municipal conservation metrics.
        </p>
      </div>

      <SpotlightCard className="p-8 sm:p-12 border border-white/[0.09] shadow-2xl">
        {/* Scenario Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-8 border-b border-white/[0.08]">
          {scenarios.map(sc => {
            const isActive = sc.id === activeScenarioId;
            return (
              <button
                key={sc.id}
                onClick={() => handleSelectScenario(sc.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.35)]'
                    : 'bg-[#070A0F] text-[#94A3B8] hover:text-white border border-white/5'
                }`}
              >
                {sc.title}
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Slider Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-8">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 tracking-wider">
                {activeScenario.topic}
              </span>
              <h3 className="font-serif font-black text-2xl text-white">
                {activeScenario.title}
              </h3>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-[#070A0F] border border-white/10">
              <div className="flex items-center justify-between font-mono">
                <span className="text-xs text-[#94A3B8] uppercase">Input Quantity:</span>
                <span className="text-xl font-bold text-cyan-300">
                  {sliderValue} {activeScenario.unit}
                </span>
              </div>

              {/* Slider Input */}
              <input
                type="range"
                min={activeScenario.min}
                max={activeScenario.max}
                step={activeScenario.step}
                value={sliderValue}
                onChange={e => setSliderValue(Number(e.target.value))}
                className="w-full h-2 bg-[#161F30] rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />

              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>{activeScenario.min} {activeScenario.unit.split(' ')[0]}</span>
                <span>{activeScenario.max} {activeScenario.unit.split(' ')[0]}</span>
              </div>
            </div>

            <div className="text-xs font-mono text-[#94A3B8]">
              Verified Authority: <strong className="text-white">{activeScenario.source}</strong>
            </div>
          </div>

          {/* Results Visualizer Column */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Primary Metric Tile */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0F1829] to-[#0A0F1A] border border-cyan-400/30 space-y-2 shadow-[0_0_25px_rgba(6,182,212,0.15)]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block font-bold">
                {results.primaryLabel}
              </span>
              <div className="font-serif font-black text-3xl sm:text-4xl text-cyan-300 tracking-tight">
                {results.primaryMetric}
              </div>
              <p className="text-xs text-[#94A3B8]">
                Direct municipal savings benchmark.
              </p>
            </div>

            {/* Secondary Metric Tile */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0F1829] to-[#0A0F1A] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                {results.secondaryLabel}
              </span>
              <div className="font-serif font-black text-3xl sm:text-4xl text-[#F8FAFC] tracking-tight">
                {results.secondaryMetric}
              </div>
              <p className="text-xs text-[#94A3B8]">
                Official agency reporting unit.
              </p>
            </div>

            {/* Real World Equivalent Banner */}
            <div className="sm:col-span-2 p-5 rounded-2xl bg-[#070A0F] border border-cyan-500/20 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                <span>🌍</span>
                <span>Real-World Ecological Implication</span>
              </span>
              <p className="text-sm font-serif font-medium text-slate-200 leading-relaxed">
                &ldquo;{results.realWorldEquivalent}&rdquo;
              </p>
            </div>

          </div>

        </div>
      </SpotlightCard>
    </section>
  );
};
