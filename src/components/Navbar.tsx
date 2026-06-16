import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '#about', label: '关于' },
  { href: '#works', label: '作品' },
  { href: '#skills', label: '技能' },
  { href: '#contact', label: '联系' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between
        px-5 md:px-7 py-3 w-[92%] max-w-2xl rounded-full border transition-all duration-500
        ${scrolled
          ? 'bg-[#0a0a0a]/85 border-white/[0.1] backdrop-blur-3xl'
          : 'bg-[#0a0a0a]/60 border-white/[0.06] backdrop-blur-xl'
        }`}
    >
      <a href="#hero" className="text-[15px] font-semibold tracking-[-0.3px]">
        William<span className="text-[#4488ff] opacity-60">.</span>
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-6 list-none">
        {links.map(l => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-[13px] text-white/35 hover:text-white transition-colors duration-300
                relative after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2
                after:w-0 after:h-[1.5px] after:bg-[#4488ff] after:rounded-full after:transition-all after:duration-300
                hover:after:w-full"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Hamburger */}
      <button
        aria-label="菜单"
        className="flex md:hidden flex-col gap-[5px] cursor-pointer bg-none border-none p-1"
        onClick={() => setOpen(!open)}
      >
        <motion.span
          animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          className="w-[22px] h-[1.5px] bg-white block rounded-full"
        />
        <motion.span
          animate={open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
          className="w-[22px] h-[1.5px] bg-white block rounded-full"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          className="w-[22px] h-[1.5px] bg-white block rounded-full"
        />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ right: '-100%' }}
            animate={{ right: 0 }}
            exit={{ right: '-100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 w-[70%] h-screen bg-[#0a0a0a]/95 backdrop-blur-3xl
              flex flex-col items-center justify-center gap-10 border-l border-white/[0.06] md:hidden"
          >
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[18px] text-white/60 hover:text-white transition-colors no-underline"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
