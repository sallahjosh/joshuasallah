import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects, personal } from '../data/portfolio';
import { ExternalLink, GitBranch } from 'lucide-react';
import PageHero from '../components/PageHero';

/** Single project card */
function ProjectCard({ project }) {
  return (
    <div className="glass rounded-2xl overflow-hidden border border-white/[0.06] group hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 flex flex-col flex-shrink-0 w-[300px] sm:w-[340px]">
      {/* Image */}
      <div className="relative overflow-hidden h-44">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent" />

        {project.featured && (
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/80 text-white border border-primary/50 uppercase tracking-wide backdrop-blur-sm">
            Featured
          </div>
        )}

        {/* Hover links */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0a0a0f]/50">
          {project.live !== '#' && (
            <a href={project.live} target="_blank" rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-colors"
              title="Live Demo">
              <ExternalLink size={15} />
            </a>
          )}
          {project.github !== '#' && (
            <a href={project.github} target="_blank" rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-colors"
              title="GitHub">
              <GitBranch size={15} />
            </a>
          )}
          {project.live === '#' && project.github === '#' && (
            <span className="text-white/40 text-xs">Coming soon</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-white font-bold text-base mb-2 group-hover:text-primary transition-colors">
          {project.live !== '#' ? (
            <a href={project.live} target="_blank" rel="noreferrer"
              className="hover:text-primary transition-colors inline-flex items-center gap-1.5">
              {project.title}
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-60 transition-opacity" />
            </a>
          ) : project.title}
        </h3>
        <p className="text-white/55 text-xs leading-relaxed flex-1 mb-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag text-[10px]">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  // Sticky scroll container for horizontal movement
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Translate the strip from 0 → -(total - viewport)
  // Each card is ~356px wide + 28px gap ≈ 384px; 5 cards = ~1920px
  const totalCards = projects.length;
  const cardW = 368; // card width + gap
  // translateX goes from 0% to enough to show all cards
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0px', `-${(totalCards - 1) * cardW}px`]
  );

  // Height of sticky section = enough scroll distance to traverse all cards
  const stickyHeight = `${totalCards * 100}vh`;

  return (
    <>
      <PageHero title="My Projects" subtitle="Showcasing my work and contributions" />

      {/* ── HORIZONTAL SCROLL SECTION ── */}
      <div ref={containerRef} style={{ height: stickyHeight }} className="relative">
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.07) 0%, transparent 70%), #0a0a0f' }}
        >
          {/* Section label */}
          <div className="max-w-7xl mx-auto px-6 mb-8 w-full">
            <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">
              Scroll to explore
            </p>
            <h2 className="text-white font-black text-3xl md:text-4xl mt-1">
              Featured <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Work</span>
            </h2>
          </div>

          {/* Horizontal track */}
          <div className="relative w-full overflow-visible">
            <motion.div
              style={{ x }}
              className="flex gap-7 pl-6 md:pl-[max(1.5rem,calc((100vw-80rem)/2))]"
            >
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}

              {/* GitHub CTA card */}
              <div className="flex-shrink-0 w-[240px] flex items-center justify-center">
                <a
                  href={personal.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-col items-center gap-3 px-8 py-8 rounded-2xl glass border border-white/10 hover:border-primary/40 text-white/60 hover:text-white transition-all group"
                >
                  <GitBranch size={28} className="group-hover:text-primary transition-colors" />
                  <span className="text-sm font-semibold">View More on GitHub</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="max-w-7xl mx-auto px-6 mt-8 w-full">
            <div className="h-px w-full bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
