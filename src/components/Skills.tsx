import { motion } from 'framer-motion';

const skills = [
  { icon: '⚛️', name: 'React 生态', desc: 'React 18/19、Next.js、Vite、状态管理与服务端渲染，构建高性能 Web 应用', progress: 95 },
  { icon: '🔷', name: 'TypeScript', desc: '类型安全的前端工程化实践，泛型、类型推导与复杂类型体操', progress: 90 },
  { icon: '🎨', name: '3D 可视化', desc: 'Three.js / React Three Fiber、D3.js、WebGL 与 3D 交互体验开发', progress: 88 },
  { icon: '✨', name: '动效开发', desc: 'Framer Motion、GSAP 动画库，流畅的过渡动画与微交互设计', progress: 92 },
  { icon: '🎯', name: 'UI/UX 设计', desc: 'Tailwind CSS、响应式设计、无障碍访问与现代设计系统搭建', progress: 85 },
  { icon: '🔧', name: '工程化工具', desc: 'Webpack / Vite、CI/CD、代码质量与性能优化、Monorepo 架构', progress: 82 },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-[100px] md:py-[140px] px-6 max-w-6xl mx-auto">
      <div className="section-label">核心能力</div>
      <h2 className="section-title">
        专业 <span className="text-gradient">技能</span>
      </h2>
      <p className="text-[17px] text-white/70 max-w-[540px] leading-relaxed font-light mb-14">
        多年实战积累的核心技术能力，覆盖前端开发、三维可视化与工程化实践。
      </p>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {skills.map((s, i) => (
          <motion.div
            key={i}
            variants={item}
            className="glass rounded-3xl p-6 md:p-7 transition-all duration-500
              hover:border-[rgba(68,136,255,0.2)] hover:-translate-y-1 hover:bg-[rgba(68,136,255,0.02)]
              relative overflow-hidden group"
          >
            {/* Mouse glow tracker */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(68,136,255,0.04) 0%, transparent 60%)',
              }}
              onMouseMove={e => {
                const rect = e.currentTarget.parentElement!.getBoundingClientRect();
                (e.currentTarget as HTMLElement).style.setProperty('--mouse-x', ((e.clientX - rect.left) / rect.width * 100) + '%');
                (e.currentTarget as HTMLElement).style.setProperty('--mouse-y', ((e.clientY - rect.top) / rect.height * 100) + '%');
              }}
            />

            <span className="text-[28px] block mb-3.5">{s.icon}</span>
            <h4 className="text-[16px] font-semibold mb-2">{s.name}</h4>
            <p className="text-[13px] text-white/60 leading-relaxed font-light">{s.desc}</p>

            <div className="mt-4 h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.1 }}
                className="h-full rounded-full bg-gradient-to-r from-[#4488ff] to-[#88bbff]"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
