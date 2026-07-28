import { FaCss3Alt } from 'react-icons/fa';
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

export default function Footer() {
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

      {/* Main footer body — removed per user request */}
    </footer>
  );
}
