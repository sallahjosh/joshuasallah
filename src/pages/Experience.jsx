import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { experience } from '../data/portfolio';
import { GraduationCap, Briefcase, Calendar } from 'lucide-react';
import PageHero from '../components/PageHero';

export default function ExperiencePage() {
  const [ref, inView] = useInView({ threshold: 0.05 });

  return (
    <>
      <PageHero
        title="My Experience"
        subtitle="Professional journey and achievements"
        bg="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80"
      />

      <section
        ref={ref}
        className="py-24 relative"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(124,58,237,0.06) 0%, transparent 70%), transparent',
        }}
      >
        <div className="max-w-4xl mx-auto px-6">
          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-[22px] md:left-[26px] top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />

            <div className="space-y-10 pl-14 md:pl-16">
              {experience.map((item, i) => {
                const Icon = item.type === 'Education' ? GraduationCap : Briefcase;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -24 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="relative"
                  >
                    {/* Dot */}
                    <div className="absolute -left-[50px] md:-left-[54px] top-4 w-9 h-9 rounded-full bg-dark-3 border-2 border-primary flex items-center justify-center">
                      <Icon size={15} className="text-primary" />
                    </div>

                    {/* Card */}
                    <div className="glass rounded-2xl p-6 border border-white/[0.06] glass-hover">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-3">
                        {item.type}
                      </span>
                      <h3 className="text-white font-bold text-lg mb-1">{item.role}</h3>
                      <p className="text-secondary font-medium text-sm mb-3">{item.company}</p>
                      <div className="flex items-center gap-1.5 text-white/40 text-xs mb-4">
                        <Calendar size={12} />
                        <span>{item.period}</span>
                      </div>
                      {item.description && (
                        <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
