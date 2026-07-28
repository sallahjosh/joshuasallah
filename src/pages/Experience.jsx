import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { experience } from '../data/portfolio';
import { GraduationCap, Briefcase, Calendar, Trophy } from 'lucide-react';
import PageHero from '../components/PageHero';

const HACK_IMAGES = [
  { src: '/img/hack.jpeg',  alt: 'Hackathon team photo' },
  { src: '/img/hack1.jpeg', alt: 'Hackathon presentation' },
  { src: '/img/hack2.jpeg', alt: 'Hackathon working session' },
  { src: '/img/hack3.jpeg', alt: 'Hackathon award ceremony' },
];

export default function ExperiencePage() {
  const [timelineRef, timelineInView] = useInView({ threshold: 0.05 });
  const [hackRef, hackInView]         = useInView({ threshold: 0.05 });

  return (
    <>
      <PageHero
        title="My Experience"
        subtitle="Professional journey and achievements"
        bg="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80"
      />

      {/* ── TIMELINE ── */}
      <section
        ref={timelineRef}
        className="py-24 relative"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(124,58,237,0.06) 0%, transparent 70%), transparent',
        }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[22px] md:left-[26px] top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />

            <div className="space-y-10 pl-14 md:pl-16">
              {experience.map((item, i) => {
                const Icon = item.type === 'Education' ? GraduationCap : Briefcase;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -24 }}
                    animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[50px] md:-left-[54px] top-4 w-9 h-9 rounded-full bg-[#1a1a27] border-2 border-primary flex items-center justify-center">
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

      {/* ── HACKATHON ACHIEVEMENT ── */}
      <section
        ref={hackRef}
        className="py-20 relative border-t border-white/[0.05]"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 70%), transparent',
        }}
      >
        <div className="max-w-4xl mx-auto px-6">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hackInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-4 mb-10"
          >
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Trophy size={18} className="text-yellow-400" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h2 className="text-white font-bold text-xl">Hackathon Achievement</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-500/15 text-yellow-400 border border-yellow-500/25 uppercase tracking-wide">
                  🥈 2nd Place
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
                I participated in a hackathon with some of my colleagues and we placed{' '}
                <strong className="text-white">2nd</strong>. Our project,{' '}
                <a
                  href="https://careerpilot-rose.vercel.app/auth"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:text-secondary underline underline-offset-2 font-semibold transition-colors"
                >
                  Career-Pilot
                </a>
                , is a career guidance platform that helps students discover career paths, build CVs,
                and prepare for job applications.
              </p>
            </div>
          </motion.div>

          {/* 2×2 photo grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {HACK_IMAGES.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 20 }}
                animate={hackInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                className="group relative overflow-hidden rounded-xl border border-white/[0.07] aspect-square"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
