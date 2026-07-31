import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { skills } from '../data/portfolio';
import PageHero from '../components/PageHero';
import {
  SiHtml5, SiPython, SiJavascript, SiPhp,
  SiTailwindcss, SiReact, SiMysql, SiVite,
} from 'react-icons/si';
import { FaCss3Alt, FaJava } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { SiFramer } from 'react-icons/si';

// Icon map for individual skill items
const SKILL_ICONS = {
  'HTML5':            <SiHtml5      className="text-[#e34f26]" />,
  'Python':           <SiPython     className="text-[#3776ab]" />,
  'Java':             <FaJava       className="text-[#f89820]" />,
  'PHP':              <SiPhp        className="text-[#777bb4]" />,
  'HTML5 & CSS3':     <><SiHtml5 className="text-[#e34f26]" /><FaCss3Alt className="text-[#1572b6] ml-1" /></>,
  'JavaScript':       <SiJavascript className="text-[#f7df1e]" />,
  'Responsive Design':<SiTailwindcss className="text-[#06b6d4]" />,
  'SQL':              <SiMysql      className="text-[#4479a1]" />,
  'Database Design':  <SiMysql      className="text-[#4479a1]" />,
  'UI for Databases': <SiMysql      className="text-[#4479a1]" />,
  'MySQL':            <SiMysql      className="text-[#4479a1]" />,
  'React':            <SiReact      className="text-[#61dafb]" />,
  'Vite':             <SiVite       className="text-[#646cff]" />,
  'Tailwind CSS':     <SiTailwindcss className="text-[#06b6d4]" />,
  'Framer Motion':    <SiFramer     className="text-white" />,
};

// Built-with tools shown at the bottom
const BUILT_WITH = [
  { label: 'React',       icon: <SiReact       className="text-[#61dafb]" /> },
  { label: 'Vite',        icon: <SiVite        className="text-[#646cff]" /> },
  { label: 'Tailwind CSS',icon: <SiTailwindcss className="text-[#06b6d4]" /> },
  { label: 'Framer Motion', icon: <SiFramer    className="text-white/70" /> },
  { label: 'GitHub',      icon: <FaGithub      className="text-white/70" /> },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

export default function SkillsPage() {
  const [ref, inView] = useInView({ threshold: 0.05 });
  const [builtRef, builtInView] = useInView({ threshold: 0.1 });

  return (
    <>
      <PageHero title="My Skills" subtitle="Here's what I bring to the table" />

      <section
        ref={ref}
        className="py-24 relative"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(6,182,212,0.06) 0%, transparent 70%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">

          {/* Skill cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((s, i) => (
              <motion.div
                key={s.category}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="glass rounded-2xl p-6 border border-white/[0.06] glass-hover group cursor-default"
              >
                {/* Category icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/[0.08] flex items-center justify-center text-xl mb-5 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                  {s.icon}
                </div>
                <h3 className="text-white font-bold text-base mb-4 relative pb-3">
                  {s.category}
                  <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                </h3>
                <ul className="space-y-2.5">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-white/60 group-hover:text-white/80 transition-colors"
                    >
                      {/* React-icon if available, else dot */}
                      {SKILL_ICONS[item] ? (
                        <span className="text-base flex-shrink-0 flex items-center">{SKILL_ICONS[item]}</span>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                      )}
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Built-with tools strip */}
          <motion.div
            ref={builtRef}
            initial={{ opacity: 0, y: 20 }}
            animate={builtInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-14 glass rounded-2xl p-6 border border-white/[0.06]"
          >
            <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold mb-5 text-center">
              This portfolio is built with
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {BUILT_WITH.map(({ label, icon }) => (
                <div key={label} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group">
                  <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-6 glass rounded-2xl p-6 border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div>
              <p className="text-white font-semibold text-lg">Always Learning</p>
              <p className="text-white/50 text-sm mt-0.5">
                Constantly expanding my skill set to stay current with industry trends
              </p>
            </div>
            <a
              href="/projects"
              className="flex-shrink-0 px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all text-sm"
            >
              See Projects →
            </a>
          </motion.div>

        </div>
      </section>
    </>
  );
}
