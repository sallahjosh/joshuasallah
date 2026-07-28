import { Link } from 'react-router-dom';
import { GitBranch, Briefcase, AtSign, Mail, Heart } from 'lucide-react';
import { personal } from '../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.05] py-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="font-black text-xl gradient-text">
          {personal.initials}
        </Link>

        {/* Copyright */}
        <p className="text-white/30 text-sm flex items-center gap-1.5">
          © {year} {personal.name}. Made with{' '}
          <Heart size={12} className="text-accent fill-accent" /> in Ghana
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          {[
            { icon: GitBranch, href: personal.social.github },
            { icon: Briefcase, href: personal.social.linkedin },
            { icon: AtSign, href: personal.social.twitter },
            { icon: Mail, href: `mailto:${personal.email}` },
          ].map(({ icon: Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-white/30 hover:text-white transition-colors"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
