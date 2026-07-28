import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, GitBranch, Briefcase, AtSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { personal } from '../data/portfolio';

function useTyping(words) {
  const [text, setText] = useState('');
  const state = useRef({ wordIdx: 0, charIdx: 0, deleting: false, pausing: false });

  useEffect(() => {
    let timer;

    function tick() {
      const s = state.current;
      const current = words[s.wordIdx];

      if (s.pausing) {
        s.pausing = false;
        s.deleting = true;
        timer = setTimeout(tick, 100);
        return;
      }

      if (!s.deleting) {
        // typing forward
        s.charIdx += 1;
        setText(current.slice(0, s.charIdx));
        if (s.charIdx === current.length) {
          s.pausing = true;
          timer = setTimeout(tick, 1600);
        } else {
          timer = setTimeout(tick, 100);
        }
      } else {
        // deleting
        s.charIdx -= 1;
        setText(current.slice(0, s.charIdx));
        if (s.charIdx === 0) {
          s.deleting = false;
          s.wordIdx = (s.wordIdx + 1) % words.length;
          timer = setTimeout(tick, 400);
        } else {
          timer = setTimeout(tick, 50);
        }
      }
    }

    timer = setTimeout(tick, 800);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return text;
}

const Particle = ({ style }) => (
  <div
    className="absolute w-1 h-1 rounded-full bg-primary/40 animate-pulse"
    style={style}
  />
);

// Pre-generate so they don't randomize on re-render
const particles = Array.from({ length: 20 }, () => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 3}s`,
  width: `${Math.random() * 4 + 2}px`,
  height: `${Math.random() * 4 + 2}px`,
}));

export default function Hero() {
  const typed = useTyping(personal.roles);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.18) 0%, transparent 70%), #0a0a0f',
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="glow-orb w-[500px] h-[500px] bg-primary top-[-200px] left-[-100px]" />
      <div className="glow-orb w-[400px] h-[400px] bg-secondary bottom-[-150px] right-[-100px]" />

      {/* Particles */}
      {particles.map((p, i) => (
        <Particle key={i} style={p} />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 text-primary text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          Available for opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight mb-4 leading-[1.05]"
        >
          <span className="gradient-text">{personal.name}</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/60 font-light mb-6"
        >
          {personal.tagline}
        </motion.p>

        {/* Typing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl font-mono text-secondary mb-8 h-8 flex items-center justify-center"
        >
          <span>&gt; </span>
          <span className="ml-1">{typed}</span>
          <span className="ml-0.5 animate-blink text-primary">|</span>
        </motion.div>

        {/* Tech chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {personal.chips.map((chip) => (
            <span key={chip} className="tag">{chip}</span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Link
            to="/contact"
            className="px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            Get In Touch
          </Link>
          <Link
            to="/projects"
            className="px-8 py-3.5 rounded-xl font-semibold text-white/80 glass border border-white/10 hover:border-primary/40 hover:text-white transition-all hover:-translate-y-0.5"
          >
            View My Work
          </Link>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-5 mb-16"
        >
          {[
            { icon: GitBranch, href: personal.social.github, label: 'GitHub' },
            { icon: Briefcase, href: personal.social.linkedin, label: 'LinkedIn' },
            { icon: AtSign, href: personal.social.twitter, label: 'Twitter' },
            { icon: Mail, href: `mailto:${personal.email}`, label: 'Email' },
          ].map(({ icon: Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-primary/50 transition-all hover:-translate-y-0.5"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="/about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 hover:text-white/70 transition-colors group"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
