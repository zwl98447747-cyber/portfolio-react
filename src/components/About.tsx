import { motion } from 'framer-motion';

const stats = [
  { number: '3+', label: '年开发经验' },
  { number: '20+', label: '完成项目' },
  { number: '99%', label: '客户满意度' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  return (
    <section id="about" className="relative pt-[60px] pb-[120px] md:pb-[140px] px-6 max-w-6xl mx-auto">
      <div className="section-label">关于我</div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
      >
        <div>
          <p className="text-[13px] text-white/35 tracking-[3px] uppercase mb-4">
            William · 曾伟林
          </p>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-semibold tracking-[-1.5px] leading-[1.15] mb-6">
            用代码创造体验<br />用设计连接用户
          </h2>
          <p className="text-[16px] text-white/70 leading-relaxed font-light mb-4">
            <strong className="text-white font-medium">3年前端开发经验</strong>，专注于 React 生态与三维交互设计。
            擅长从零构建高性能 Web 应用，追求像素级还原与流畅的交互体验。
          </p>
          <p className="text-[16px] text-white/70 leading-relaxed font-light">
            熟练掌握 <strong className="text-white font-medium">React、TypeScript、Three.js</strong> 等现代技术栈，
            以及 Framer Motion、GSAP 等动效库。热爱探索前沿技术，将创意落地为令人惊叹的数字化体验。
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-3 gap-3 md:gap-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={item}
              className="glass rounded-3xl text-center p-6 md:p-8 transition-all duration-500
                hover:-translate-y-1.5 hover:border-[rgba(68,136,255,0.2)] hover:bg-[rgba(68,136,255,0.03)]
                relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px]
                before:bg-gradient-to-r before:from-transparent before:via-[#4488ff] before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500"
            >
              <div className="text-[clamp(28px,3vw,40px)] font-bold tracking-[-1px] mb-2 bg-gradient-to-r from-white to-[#4488ff] bg-clip-text text-transparent">
                {s.number}
              </div>
              <div className="text-[13px] text-white/35 tracking-[1px]">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
