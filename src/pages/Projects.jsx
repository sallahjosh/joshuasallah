import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { projects, personal } from '../data/portfolio';
import { ExternalLink, GitBranch } from 'lucide-react';
import PageHero from '../components/PageHero';

export default function ProjectsPage() {
  const [ref, inView] = useInView({ threshold: 0.05 });

  return (
    <>
      <PageHero
        title="My Projects"
        subtitle="Showcasing my work and contributions"
      />

      <section
        ref={ref}
        className="py-24 relative"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(6,182,212,0.05) 0%, transparent 70%), transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl overflow-hidden border border-white/[0.06] group hover:border-primary/30 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 flex flex-col"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/80 text-white border border-primary/50 uppercase tracking-wide backdrop-blur-sm">
                      Featured
                    </div>
                  )}

                  {/* Hover links */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dark/50">
                    {project.live !== '#' && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="w-11 h-11 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    {project.github !== '#' && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="w-11 h-11 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-colors"
                        title="GitHub"
                      >
                        <GitBranch size={16} />
                      </a>
                    )}
                    {project.live === '#' && project.github === '#' && (
                      <span className="text-white/40 text-xs">Coming soon</span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {project.live !== '#' ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-primary transition-colors inline-flex items-center gap-1.5"
                      >
                        {project.title}
                        <ExternalLink size={13} className="opacity-0 group-hover:opacity-60 transition-opacity" />
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed flex-1 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* GitHub CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <a
              href={personal.social.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-white/80 glass border border-white/10 hover:border-primary/40 hover:text-white transition-all hover:-translate-y-0.5 text-sm"
            >
              <GitBranch size={16} />
              View More on GitHub
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
