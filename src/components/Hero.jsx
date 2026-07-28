import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Target, Crown, Star, Code2, Database, Globe, Terminal, Cpu, Server } from 'lucide-react';
import { Link } from 'react-router-dom';
import { personal, skills } from '../data/portfolio';

// --- Typing hook (ref-based, no stale closure) ---
function useTyping(words, elRef) {
  useEffect(() => {
    const state = { wordIdx: 0, charIdx: 0, deleting: false, pausing: false };
    let timer;

    function tick() {
      const el = elRef.current;
      if (!el) return;
      const word = words[state.wordIdx];

      if (state.pausing) {
        state.pausing = false;
        state.deleting = true;
        timer = setTimeout(tick, 100);
        return;
      }
      if (!state.deleting) {
        state.charIdx += 1;
        el.textContent = '> ' + word.slice(0, state.charIdx);
        if (state.charIdx === word.length) {
          state.pausing = true;
          timer = setTimeout(tick, 1600);
        } else {
          timer = setTimeout(tick, 100);
        }
      } else {
        state.charIdx -= 1;
        el.textContent = '> ' + word.slice(0, state.charIdx);
        if (state.charIdx === 0) {
          state.deleting = false;
          state.wordIdx = (state.wordIdx + 1) % words.length;
          timer = setTimeout(tick, 400);
        } else {
          timer = setTimeout(tick, 50);
        }
      }
    }
    timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// --- Marquee tech stack ---
const TECH = [
  { name: 'Python', icon: Terminal },
  { name: 'HTML5', icon: Globe },
  { name: 'CSS3', icon: Code2 },
  { name: 'MySQL', icon: Database },
  { name: 'Java', icon: Cpu },
  { name: 'PHP', icon: Server },
];

const StatItem = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
    <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium sm:text-xs">{label}</span>
  </div>
);

// Pre-generate particles outside component
const PARTICLES = Array.from({ length: 18 }, () => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 4}s`,
  size: `${Math.random() * 3 + 2}px`,
}));

export default function Hero() {
  const typingRef = useRef(null);
  useTyping(personal.roles, typingRef);

  return (
    <div className="relative w-full bg-zinc-950 text-white overflow-hidden font-sans min-h-screen">
      {/* Scoped animations */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 35s linear infinite; }
        @keyframes particleDrift {
          0%   { transform: translateY(0) scale(1);   opacity: 0; }
          10%  { opacity: 0.6; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-120vh) scale(0.5); opacity: 0; }
        }
        .particle { animation: particleDrift 14s linear infinite; }
      `}</style>

      {/* Background image with gradient mask */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=1920&q=80')",
          maskImage: 'linear-gradient(180deg, transparent, black 15%, black 75%, transparent)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent, black 15%, black 75%, transparent)',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-[-150px] left-[-100px] w-[500px] h-[500px] rounded-full bg-violet-600 opacity-[0.12] blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[-100px] right-[-80px] w-[400px] h-[400px] rounded-full bg-cyan-500 opacity-[0.10] blur-[100px] pointer-events-none z-0" />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="particle absolute rounded-full bg-violet-400/40 pointer-events-none z-0"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size, animationDelay: p.delay }}
        />
      ))}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 md:pt-36 lg:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pt-4">

            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md hover:bg-white/10 transition-colors">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                  Available for opportunities
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-medium tracking-tighter leading-[0.92]"
              style={{
                maskImage: 'linear-gradient(180deg, black 0%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(180deg, black 0%, black 85%, transparent 100%)',
              }}
            >
              Building Digital<br />
              <span className="bg-gradient-to-br from-white via-white to-[#a78bfa] bg-clip-text text-transparent">
                Experiences
              </span>
              <br />That Matter
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-xl text-lg text-zinc-400 leading-relaxed"
            >
              {personal.tagline} — passionate about crafting efficient,
              user-friendly applications with clean code and modern technologies.
            </motion.p>

            {/* Typing text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex items-center gap-2"
            >
              <span
                ref={typingRef}
                className="font-mono text-base text-violet-400 min-h-[1.5rem]"
              >
                &gt;
              </span>
              <span className="inline-block w-0.5 h-5 bg-violet-400 animate-pulse" />
            </motion.div>

            {/* Tech chips */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2"
            >
              {personal.chips.map((chip) => (
                <span
                  key={chip}
                  className="px-3 py-1 rounded-full text-xs font-medium border border-violet-500/25 bg-violet-500/10 text-violet-300"
                >
                  {chip}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-950 transition-all hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98]"
              >
                Get In Touch
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/projects"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/20"
              >
                <Play className="w-4 h-4 fill-current" />
                View My Work
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="lg:col-span-5 space-y-5 lg:mt-10">

            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl"
            >
              {/* Card glow */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                {/* Top stat */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight text-white">3+</div>
                    <div className="text-sm text-zinc-400">Projects Delivered</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Commitment Level</span>
                    <span className="text-white font-medium">100%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/60">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                  </div>
                </div>

                <div className="h-px w-full bg-white/10 mb-6" />

                {/* Mini stats grid */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <StatItem value="2+" label="Years" />
                  <div className="w-px bg-white/10" />
                  <StatItem value="BSc" label="Degree" />
                  <div className="w-px bg-white/10" />
                  <StatItem value="100%" label="Quality" />
                </div>

                {/* Status pills */}
                <div className="mt-8 flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    AVAILABLE
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                    <Crown className="w-3 h-3 text-yellow-400" />
                    OPEN TO WORK
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Marquee tech strip */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 py-7 backdrop-blur-xl"
            >
              <h3 className="mb-5 px-7 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Technologies I work with
              </h3>
              <div
                className="relative flex overflow-hidden"
                style={{
                  maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                }}
              >
                <div className="animate-marquee flex gap-10 whitespace-nowrap px-4">
                  {[...TECH, ...TECH, ...TECH].map((t, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 opacity-50 transition-all hover:opacity-100 hover:scale-105 cursor-default"
                    >
                      <t.icon className="h-5 w-5 text-white" />
                      <span className="text-base font-bold text-white tracking-tight">{t.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
