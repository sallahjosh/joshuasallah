import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { personal } from '../data/portfolio';
import { MapPin, Mail, Phone, Trophy, ExternalLink } from 'lucide-react';
import PageHero from '../components/PageHero';

const HACK_IMAGES = [
  { src: '/img/hack.jpeg',  alt: 'Hackathon team photo' },
  { src: '/img/hack1.jpeg', alt: 'Hackathon presentation' },
  { src: '/img/hack2.jpeg', alt: 'Hackathon working session' },
  { src: '/img/hack3.jpeg', alt: 'Hackathon award ceremony' },
];

export default function AboutPage() {
  const [bioRef, bioInView]   = useInView({ threshold: 0.1 });
  const [hackRef, hackInView] = useInView({ threshold: 0.05 });
  const [studyRef, studyInView] = useInView({ threshold: 0.05 });

  return (
    <>
      <PageHero
        title="About Me"
        subtitle="Get to know me better"
        bg="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1920&q=80"
      />

      {/* ── BIO SECTION ── */}
      <section ref={bioRef} className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Profile photo — clean square box */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={bioInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              {/* Decorative glow behind the box */}
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-primary/25 via-secondary/10 to-accent/10 blur-xl" />

              {/* Square photo container */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-square max-w-sm mx-auto lg:mx-0 shadow-2xl">
                <img
                  src="/img/about.jpeg"
                  alt={personal.name}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => { e.target.src = '/img/josh.jpeg'; }}
                />
                {/* Bottom overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 glass rounded-xl px-4 py-3 border border-white/10">
                  <p className="text-white font-semibold text-sm">{personal.name}</p>
                  <p className="text-white/50 text-xs mt-0.5">{personal.tagline}</p>
                </div>
              </div>
            </motion.div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={bioInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-6"
            >
              {personal.bio.map((p, i) => (
                <p key={i} className="text-white/70 leading-relaxed text-base">{p}</p>
              ))}

              {/* Info cards */}
              <div className="grid sm:grid-cols-3 gap-3 mt-2">
                {[
                  { icon: Mail,  label: 'Email',    value: personal.email.split('@')[0], full: personal.email },
                  { icon: Phone, label: 'Phone',    value: personal.phone },
                  { icon: MapPin,label: 'Location', value: personal.location },
                ].map(({ icon: Icon, label, value, full }) => (
                  <div key={label} className="glass rounded-xl p-4 border border-white/[0.06]">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon size={14} className="text-primary" />
                      <span className="text-white/40 text-xs font-medium uppercase tracking-wide">{label}</span>
                    </div>
                    <p className="text-white text-sm font-medium truncate" title={full || value}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-2">
                <a href="/contact"
                  className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 text-sm">
                  Contact Me
                </a>
                <a href="/skills"
                  className="px-6 py-3 rounded-xl font-semibold text-white/80 glass border border-white/10 hover:border-primary/40 hover:text-white transition-all hover:-translate-y-0.5 text-sm">
                  View Skills
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HACKATHON SECTION ── */}
      <section
        ref={hackRef}
        className="py-20 relative border-t border-white/[0.05]"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 70%)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
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
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-white font-bold text-xl">Hackathon Achievement</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-500/15 text-yellow-400 border border-yellow-500/25 uppercase tracking-wide">
                  🥈 2nd Place
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
                I participated in a hackathon with some of my colleagues and we placed <strong className="text-white">2nd</strong>. 
                Our project,{' '}
                <a
                  href="https://careerpilot-rose.vercel.app/auth"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:text-secondary underline underline-offset-2 font-semibold transition-colors"
                >
                  Career-Pilot
                </a>
                , is a career guidance platform that helps students discover career paths, build CVs, and prepare for job applications.
              </p>
            </div>
          </motion.div>

          {/* Photo grid — 2×2 on desktop, scroll on mobile */}
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

      {/* ── STUDYBUDDY AI SECTION ── */}
      <section
        ref={studyRef}
        className="py-20 relative border-t border-white/[0.05]"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(6,182,212,0.05) 0%, transparent 70%)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={studyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl border border-white/[0.07] overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left — image */}
              <div className="relative overflow-hidden aspect-video md:aspect-auto min-h-[220px]">
                <img
                  src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80"
                  alt="StudyBuddy AI"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0f]/60 md:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 to-transparent md:hidden" />
              </div>

              {/* Right — content */}
              <div className="p-8 flex flex-col justify-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-secondary/10 text-secondary border border-secondary/20 uppercase tracking-wide">
                    Department Project
                  </span>
                </div>

                <h3 className="text-white font-bold text-xl leading-snug">
                  <a
                    href="https://study-buddy-ai-olive.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-secondary transition-colors inline-flex items-center gap-2 group"
                  >
                    StudyBuddy AI
                    <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </h3>

                <p className="text-white/60 text-sm leading-relaxed">
                  I was tasked by my department to create an AI-powered study platform designed to help
                  students learn, revise, and prepare for their studies more effectively.
                </p>

                <div className="flex flex-wrap gap-2 mt-1">
                  {['AI', 'React', 'Node.js', 'OpenAI'].map((tag) => (
                    <span key={tag} className="tag text-xs">{tag}</span>
                  ))}
                </div>

                <a
                  href="https://study-buddy-ai-olive.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:-translate-y-0.5 w-fit"
                >
                  <ExternalLink size={14} />
                  Visit StudyBuddy AI
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
