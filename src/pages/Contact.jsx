import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { personal, references } from '../data/portfolio';
import { Mail, Phone, MapPin, Send, GitBranch, Briefcase, AtSign, User } from 'lucide-react';
import PageHero from '../components/PageHero';

export default function ContactPage() {
  const [ref, inView] = useInView({ threshold: 0.05 });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/contact.php', {
        method: 'POST',
        body: new FormData(e.target),
      });
      const raw = await res.text();
      let data;
      try { data = JSON.parse(raw); } catch { data = { ok: false }; }
      if (res.ok && data?.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus(null), 5000);
  };

  const inputClass =
    'w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary/60 focus:bg-white/[0.07] transition-all';

  return (
    <>
      <PageHero
        title="Get In Touch"
        subtitle="Have a question or want to work together?"
      />

      <section ref={ref} className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[380px_1fr] gap-10">
            {/* Left info panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-6"
            >
              {/* Contact details */}
              <div className="glass rounded-2xl p-6 border border-white/[0.06]">
                <h3 className="text-white font-bold text-base mb-5">Contact Details</h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
                    { icon: Phone, label: 'Phone', value: personal.phone, href: `tel:${personal.phone.replace(/\s/g, '')}` },
                    { icon: MapPin, label: 'Location', value: personal.location, href: null },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={15} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-white/40 text-xs font-medium uppercase tracking-wide mb-0.5">{label}</p>
                        {href ? (
                          <a href={href} className="text-white text-sm hover:text-primary transition-colors break-all">
                            {value}
                          </a>
                        ) : (
                          <p className="text-white text-sm">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social */}
                <div className="flex gap-3 mt-6 pt-5 border-t border-white/[0.06]">
                  {[
                    { icon: GitBranch, href: personal.social.github },
                    { icon: Briefcase, href: personal.social.linkedin },
                    { icon: AtSign, href: personal.social.twitter },
                  ].map(({ icon: Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-primary/50 transition-all"
                    >
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </div>

              {/* References */}
              <div className="glass rounded-2xl p-6 border border-white/[0.06]">
                <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
                  <User size={15} className="text-secondary" /> References
                </h3>
                <div className="space-y-4">
                  {references.map((r) => (
                    <div key={r.name} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <p className="text-white font-semibold text-sm">{r.name}</p>
                      <p className="text-white/50 text-xs mt-0.5">{r.title}</p>
                      <a
                        href={`tel:${r.phone.replace(/-/g, '')}`}
                        className="text-secondary text-xs mt-1 flex items-center gap-1 hover:text-white transition-colors"
                      >
                        <Phone size={11} />
                        {r.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass rounded-2xl p-8 border border-white/[0.06]"
            >
              <h3 className="text-white font-bold text-xl mb-6">Send Me a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/50 text-xs font-medium uppercase tracking-wide mb-2">Your Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs font-medium uppercase tracking-wide mb-2">Your Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="block text-white/50 text-xs font-medium uppercase tracking-wide mb-2">Subject</label>
                  <input type="text" name="subject" value={form.subject} onChange={handleChange} required placeholder="Project inquiry" className={inputClass} />
                </div>

                <div>
                  <label className="block text-white/50 text-xs font-medium uppercase tracking-wide mb-2">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={6} placeholder="Tell me about your project..." className={`${inputClass} resize-none`} />
                </div>

                {status === 'success' && (
                  <p className="text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2">
                    ✓ Message sent! I'll get back to you soon.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
                    ✗ Something went wrong. Please email me directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 disabled:opacity-60 transition-all hover:shadow-lg hover:shadow-primary/30 text-sm"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
