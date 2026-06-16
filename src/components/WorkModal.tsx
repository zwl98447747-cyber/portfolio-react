import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Work } from '../data/works';

interface Props {
  work: Work | null;
  onClose: () => void;
}

export default function WorkModal({ work, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (work) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [work, onClose]);

  return (
    <AnimatePresence>
      {work && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-6"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(30px)' }}
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-3xl max-w-lg w-full p-8 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-5 text-white/50 hover:text-white transition-colors bg-none border-none cursor-pointer"
            >
              <X size={22} />
            </button>

            <img
              src={work.image}
              alt={work.name}
              className="w-full max-h-[300px] object-contain rounded-2xl mb-6 bg-black"
            />

            <h3 className="text-[22px] font-semibold tracking-[-0.3px] mb-3">{work.name}</h3>
            <p className="text-[15px] text-white/60 leading-relaxed font-light mb-4">{work.description}</p>

            <div className="flex flex-wrap gap-2">
              {work.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[10px] tracking-[2px] uppercase text-white/40 border border-white/[0.08] px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
