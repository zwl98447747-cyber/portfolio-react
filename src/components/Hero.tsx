import { useRef } from 'react';
import { motion } from 'framer-motion';
import Scene3D from './Scene3D';

// 名字逐字跳动
const firstName = 'William'.split('');
const lastName = '曾伟林'.split('');

const letterVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 12,
      delay: 0.5 + i * 0.04,
    },
  }),
};

const letterVariantsCN = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 180,
      damping: 10,
      delay: 1.0 + i * 0.08,
    },
  }),
};

// 技能标签
const platforms = [
  { name: 'React', color: '#61DAFB', label: 'React' },
  { name: 'Three.js', color: '#049EF4', label: 'Three.js' },
  { name: 'TypeScript', color: '#3178C6', label: 'TS' },
  { name: 'Framer Motion', color: '#0055FF', label: 'Motion' },
  { name: 'Tailwind', color: '#06B6D4', label: 'Tailwind' },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* 3D Scene */}
      <Scene3D />

      {/* AI 科技感装饰线 */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4488ff]/20 to-transparent z-[1] pointer-events-none" />
      <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff88aa]/10 to-transparent z-[1] pointer-events-none" />
      <div className="absolute top-1/2 left-[10%] w-px h-[40%] bg-gradient-to-b from-transparent via-[#4488ff]/10 to-transparent z-[1] pointer-events-none" />
      <div className="absolute top-1/2 right-[10%] w-px h-[40%] bg-gradient-to-b from-transparent via-[#ff88aa]/10 to-transparent z-[1] pointer-events-none" />

      {/* 浮动 AI 标签 */}
      <motion.div
        animate={{ y: [0, -8, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[20%] left-[8%] text-[10px] tracking-[4px] text-[#4488ff]/20 font-mono z-[1] pointer-events-none"
      >
        {'<AI />'}
      </motion.div>
      <motion.div
        animate={{ y: [0, 8, 0], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[25%] right-[10%] text-[10px] tracking-[4px] text-[#ff88aa]/15 font-mono z-[1] pointer-events-none"
      >
        {'{ data }'}
      </motion.div>
      <motion.div
        animate={{ rotate: [0, 360], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[35%] right-[20%] text-[16px] text-white/10 z-[1] pointer-events-none"
      >
        ◆
      </motion.div>
      <motion.div
        animate={{ rotate: [360, 0], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[30%] left-[15%] text-[12px] text-white/10 z-[1] pointer-events-none"
      >
        ◇
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#0a0a0a] to-transparent z-[1] pointer-events-none" />

      {/* Content */}
      <div className="relative z-[2] text-center pointer-events-none px-6 max-w-4xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] backdrop-blur-md mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#44ff88] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#44ff88]" />
          </span>
          <span className="text-[11px] tracking-[3px] uppercase text-white/50">
              Creative Developer · 3D Design
          </span>
        </motion.div>

        {/* 名字跳动效果 */}
        <h1 className="mb-3">
          <span className="flex justify-center flex-wrap gap-x-2">
            {firstName.map((letter, i) => (
              <motion.span
                key={`en-${i}`}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.2, y: -8, color: '#4488ff' }}
                className="text-[clamp(44px,10vw,110px)] font-bold tracking-[-4px] leading-[0.95] inline-block cursor-default"
                style={{ transition: 'color 0.2s' }}
              >
                {letter === ' ' ? ' ' : letter}
              </motion.span>
            ))}
          </span>
          <br />
          <span className="flex justify-center flex-wrap gap-x-1">
            {lastName.map((char, i) => (
              <motion.span
                key={`cn-${i}`}
                custom={i}
                variants={letterVariantsCN}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.2, y: -8, color: '#4488ff' }}
                className="text-[clamp(32px,7vw,72px)] font-[200] text-white/70 inline-block cursor-default"
                style={{ transition: 'color 0.2s' }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.4 }}
          className="text-[clamp(15px,1.6vw,20px)] text-white/70 max-w-[560px] mx-auto leading-relaxed font-light"
        >
          创意开发 · 用代码创造视觉体验
          <br />
          专注于 <span className="bg-gradient-to-r from-white via-[#4488ff] to-[#ff88aa] bg-clip-text text-transparent font-medium">3D 交互</span> 与前端工程化
        </motion.p>

        {/* 社交平台图标墙 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.7 }}
          className="mt-8 flex justify-center gap-3 flex-wrap pointer-events-auto"
        >
          {platforms.map((p, i) => (
            <motion.span
              key={p.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8 + i * 0.1, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.15, y: -3 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-medium
                border border-white/[0.08] backdrop-blur-md cursor-default"
              style={{
                background: `${p.color}08`,
                borderColor: `${p.color}20`,
                color: p.color === '#000000' ? '#ffffff' : p.color,
              }}
            >
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ background: p.color }}
              />
              {p.label}
            </motion.span>
          ))}
        </motion.div>

        {/* 按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 2.0 }}
          className="mt-8 flex gap-4 justify-center pointer-events-auto"
        >
          <motion.a
            href="#works"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-7 py-3 rounded-full bg-white text-black text-[14px] font-medium no-underline
              transition-colors duration-300 hover:shadow-[0_8px_40px_rgba(255,255,255,0.15)]"
          >
            查看作品
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-7 py-3 rounded-full border border-white/[0.15] text-white text-[14px] font-medium no-underline
              transition-all duration-300 hover:border-white/40 hover:bg-white/5"
          >
            联系我
          </motion.a>
        </motion.div>
      </div>

      {/* 滚动指示器 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2"
      >
        <div className="w-5 h-8 border border-white/[0.2] rounded-full relative">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[2px] h-[5px] bg-white/70 rounded-full"
          />
        </div>
        <span className="text-[10px] tracking-[3px] uppercase text-white/35">向下探索</span>
      </motion.div>
    </section>
  );
}
