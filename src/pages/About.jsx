import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { personal } from '../data/portfolio';
import { MapPin, Mail, Phone } from 'lucide-react';
import PageHero from '../components/PageHero';

export default function AboutPage() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <>
      <PageHero
        title="About Me"
        subtitle="Get to know me better"
        bg="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1920&q=80"
      />

      <section ref={ref} className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 blur-xl" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] max-w-sm mx-auto lg:mx-0">
                <img
                  src={personal.photo}
                  alt={personal.name}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 glass rounded-xl px-4 py-3 border border-white/10">
                  <p className="text-white font-semibold text-sm">{personal.name}</p>
                  <p className="text-white/50 text-xs mt-0.5">{personal.tagline}</p>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-6"
            >
              {personal.bio.map((p, i) => (
                <p key={i} className="text-white/70 leading-relaxed text-base">
                  {p}
                </p>
              ))}

              {/* Info cards */}
              <div className="grid sm:grid-cols-3 gap-3 mt-2">
                {[
                  { icon: Mail, label: 'Email', value: personal.email.split('@')[0], full: personal.email },
                  { icon: Phone, label: 'Phone', value: personal.phone },
                  { icon: MapPin, label: 'Location', value: personal.location },
                ].map(({ icon: Icon, label, value, full }) => (
                  <div key={label} className="glass rounded-xl p-4 border border-white/[0.06]">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon size={14} className="text-primary" />
                      <span className="text-white/40 text-xs font-medium uppercase tracking-wide">{label}</span>
                    </div>
                    <p className="text-white text-sm font-medium truncate" title={full || value}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-2">
                <a
                  href="/contact"
                  className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 text-sm"
                >
                  Contact Me
                </a>
                <a
                  href="/skills"
                  className="px-6 py-3 rounded-xl font-semibold text-white/80 glass border border-white/10 hover:border-primary/40 hover:text-white transition-all hover:-translate-y-0.5 text-sm"
                >
                  View Skills
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
