import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { FaGithub, FaLinkedin, FaCss3Alt } from 'react-icons/fa';
import {
  SiReact,
  SiVite,
  SiTailwindcss,
  SiJavascript,
  SiPython,
  SiMysql,
  SiPhp,
  SiHtml5,
} from 'react-icons/si';
import LogoLoop from './LogoLoop';
import { personal } from '../data/portfolio';

// Tech stack logos for the scrolling strip
const TECH_LOGOS = [
  { node: <SiHtml5       style={{ color: '#e34f26' }} />, title: 'HTML5' },
  { node: <FaCss3Alt     style={{ color: '#1572b6' }} />, title: 'CSS3' },
  { node: <SiJavascript  style={{ color: '#f7df1e' }} />, title: 'JavaScript' },
  { node: <SiPython      style={{ color: '#3776ab' }} />, title: 'Python' },
  { node: <SiMysql       style={{ color: '#4479a1' }} />, title: 'MySQL' },
  { node: <SiPhp         style={{ color: '#777bb4' }} />, title: 'PHP' },
  { node: <SiReact       style={{ color: '#61dafb' }} />, title: 'React' },
  { node: <SiVite        style={{ color: '#646cff' }} />, title: 'Vite' },
  { node: <SiTailwindcss style={{ color: '#06b6d4' }} />, title: 'Tailwind CSS' },
];

const NAV_LINKS = [
  { label: 'Home',       href: '/' },
  { label: 'About',      href: '/about' },
  { label: 'Skills',     href: '/skills' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects',   href: '/projects' },
  { label: 'Contact',    href: '/contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#09090e] overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      {/* LogoLoop strip */}
      <div className="border-b border-white/[0.06] py-5">
        <p className="text-center text-[10px] uppercase tracking-widest text-white/25 font-medium mb-4">
          Built with
        </p>
        <LogoLoop
          logos={TECH_LOGOS}
          speed={60}
          direction="left"
          logoHeight={22}
          gap={36}
          hoverSpeed={0}
          fadeOut
          fadeOutColor="#09090e"
          scaleOnHover
          ariaLabel="Technologies used"
        />
      </div>

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="font-black text-2xl tracking-tight bg-gradient-to-br from-white via-white to-violet-400 bg-clip-text text-transparent w-fit">
              {personal.initials}
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Aspiring Software Developer from Ghana — building digital
              experiences that matter.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              <a
                href={personal.social.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.04] flex items-center justify-center text-white/50 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10 transition-all"
              >
                <FaGithub size={16} />
              </a>
              <a
                href={personal.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.04] flex items-center justify-center text-white/50 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
              >
                <FaLinkedin size={16} />
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-white/25 text-[10px] uppercase tracking-widest font-semibold mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-white/50 text-sm hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <p className="text-white/25 text-[10px] uppercase tracking-widest font-semibold mb-4">
              Contact
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${personal.email}`}
                  className="text-white/50 text-sm hover:text-white transition-colors break-all"
                >
                  {personal.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${personal.phone.replace(/\s/g, '')}`}
                  className="text-white/50 text-sm hover:text-white transition-colors"
                >
                  {personal.phone}
                </a>
              </li>
              <li>
                <span className="text-white/50 text-sm">{personal.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs flex items-center gap-1.5">
            © {year} {personal.name}. Made with{' '}
            <Heart size={11} className="text-pink-500 fill-pink-500" /> in Ghana
          </p>
          <p className="text-white/20 text-xs">
            Built with React · Vite · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
