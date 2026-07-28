import { motion } from 'framer-motion';

/**
 * Shared hero banner for all inner pages (About, Skills, Experience, Projects, Contact).
 */
export default function PageHero({ title, subtitle }) {
  return (
    <section className="relative h-[45vh] min-h-[320px] flex items-center justify-center overflow-hidden mt-[72px]"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.22) 0%, transparent 70%), #0a0a0f' }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Purple-cyan gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-secondary text-sm font-mono font-medium tracking-widest uppercase mb-3"
        >
          Portfolio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/60 text-lg max-w-lg mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
