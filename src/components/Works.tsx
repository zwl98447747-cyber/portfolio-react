import { useState } from 'react';
import { motion } from 'framer-motion';
import { works } from '../data/works';
import WorkModal from './WorkModal';

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

export default function Works() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="works" className="py-[100px] md:py-[140px] px-6 max-w-6xl mx-auto">
      <div className="section-label">代表作品</div>
      <h2 className="section-title">
        运营案例 <span className="text-gradient">精选</span>
      </h2>
      <p className="text-[17px] text-white/70 max-w-[540px] leading-relaxed font-light mb-14">
        横跨 3D 交互、数据可视化、AI 应用等多个领域的前端开发实战。
      </p>

      {/* Work cards — square grid */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {works.map((work, i) => (
          <motion.div
            key={work.id}
            custom={i}
            variants={cardVariants}
            onClick={() => setSelected(i)}
            className="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer
              bg-[#181818] border border-white/[0.06] transition-all duration-500
              hover:border-white/[0.15] hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
          >
            {/* Image */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={work.image}
                alt={work.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700
                  group-hover:scale-110"
              />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.9)] via-[rgba(0,0,0,0.3)] to-transparent z-[1]" />

            {/* Meta badge */}
            <div className="absolute top-3 right-3 z-[2] opacity-0 translate-y-[-8px]
              group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
              <span className="px-3 py-1.5 text-[10px] bg-black/60 backdrop-blur-md rounded-full
                border border-white/[0.06] text-white/70">
                {work.stats}
              </span>
            </div>

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-5 z-[2]">
              <span className="inline-block text-[10px] tracking-[2px] uppercase text-white/50
                border border-white/[0.1] px-3 py-1 rounded-full mb-2.5 backdrop-blur-md bg-black/30">
                {work.tags[0]}
              </span>
              <h3 className="text-[18px] md:text-[20px] font-semibold tracking-[-0.3px] mb-1">
                {work.name}
              </h3>
              <p className="text-[13px] text-white/60 leading-relaxed font-light line-clamp-2">
                {work.category}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      <WorkModal
        work={selected !== null ? works[selected] : null}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
