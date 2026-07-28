import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { personal } from '../data/portfolio';
import GooeyNav from './GooeyNav';

const NAV_ITEMS = [
  { label: 'Home',       href: '/' },
  { label: 'About',      href: '/about' },
  { label: 'Skills',     href: '/skills' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects',   href: '/projects' },
  { label: 'Contact',    href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Derive active index from current route
  const activeIndex = NAV_ITEMS.findIndex((l) =>
    l.href === '/' ? location.pathname === '/' : location.pathname === l.href
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b border-white/[0.06] shadow-2xl' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-black text-2xl gradient-text tracking-tight flex-shrink-0">
            {personal.initials}
          </Link>

          {/* ── Desktop: GooeyNav ── */}
          <div className="hidden md:flex items-center">
            <GooeyNav
              items={NAV_ITEMS}
              initialActiveIndex={activeIndex >= 0 ? activeIndex : 0}
              particleCount={12}
              particleDistances={[80, 8]}
              particleR={80}
              animationTime={500}
              timeVariance={250}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>

          {/* Hire Me CTA — desktop */}
          <div className="hidden md:block flex-shrink-0">
            <Link
              to="/contact"
              className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              Hire Me
            </Link>
          </div>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] z-40 glass border-b border-white/[0.06] px-6 py-6 flex flex-col gap-2 md:hidden"
          >
            {NAV_ITEMS.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className={`text-base font-medium py-3 px-2 border-b border-white/[0.05] transition-colors ${
                  (l.href === '/' ? location.pathname === '/' : location.pathname === l.href)
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="mt-2 text-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-primary to-secondary"
            >
              Hire Me
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
