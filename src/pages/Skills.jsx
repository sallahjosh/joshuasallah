import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { skills } from '../data/portfolio';
import PageHero from '../components/PageHero';

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

export default function SkillsPage() {
  const [ref, inView] = useInView({ threshold: 0.05 });

  return (
    <>
      <PageHero
        title="My Skills"
        subtitle="Here's what I bring to the table"
      />

      <section
        ref={ref}
        className="py-24 relative"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(6,182,212,0.06) 0%, transparent 70%), transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Cards grid */}
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
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-14 glass rounded-2xl p-6 border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4"
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
