import { useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Works from './components/Works';
import Skills from './components/Skills';
import Contact from './components/Contact';

export default function App() {
  const cursorRef = useRef<HTMLDivElement>(null!);
  const requestRef = useRef<number>();
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  // 自定义光标追踪（平滑跟随）
  const animateCursor = useCallback(() => {
    if (cursorRef.current) {
      const dx = mousePos.current.x - cursorPos.current.x;
      const dy = mousePos.current.y - cursorPos.current.y;
      cursorPos.current.x += dx * 0.08;
      cursorPos.current.y += dy * 0.08;
      cursorRef.current.style.transform = `translate(${cursorPos.current.x - 150}px, ${cursorPos.current.y - 150}px)`;
    }
    requestRef.current = requestAnimationFrame(animateCursor);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateCursor);

    const onMouse = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouse);

    // 滚动进度条
    const bar = document.createElement('div');
    bar.style.cssText =
      'position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,#4488ff,#ff88aa,#4488ff);background-size:200% 100%;z-index:1001;width:0;transition:width 0.1s linear;pointer-events:none;';
    document.body.appendChild(bar);

    const onScroll = () => {
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${(window.scrollY / dh) * 100}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Hero 滚动淡出
    const heroContent = document.querySelector('#hero > .z-\\[2\\]') as HTMLElement | null;
    const onScrollHero = () => {
      const sy = window.scrollY;
      const wh = window.innerHeight;
      if (heroContent && sy < wh) {
        heroContent.style.opacity = String(Math.max(0, 1 - sy / wh * 1.3));
      }
    };
    window.addEventListener('scroll', onScrollHero, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onScrollHero);
      bar.remove();
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animateCursor]);

  return (
    <div className="relative">
      {/* 自定义鼠标光晕 */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(68,136,255,0.06) 0%, rgba(255,136,170,0.03) 40%, transparent 70%)',
        }}
      />

      {/* AI 科技背景粒子 */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[1px] h-[100px] bg-gradient-to-b from-transparent via-[#4488ff]/10 to-transparent" />
        <div className="absolute top-[40%] right-[8%] w-[1px] h-[150px] bg-gradient-to-b from-transparent via-[#ff88aa]/8 to-transparent" />
        <div className="absolute bottom-[20%] left-[20%] w-[80px] h-[1px] bg-gradient-to-r from-transparent via-[#4488ff]/8 to-transparent" />
        <div className="absolute top-[60%] right-[25%] w-[60px] h-[1px] bg-gradient-to-r from-transparent via-[#ff88aa]/8 to-transparent" />
      </div>

      <Navbar />
      <Hero />
      <About />
      <Works />
      <Skills />
      <Contact />

      <footer className="py-10 px-6 text-center border-t border-white/[0.06] relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-[#4488ff]/30 to-transparent" />
        <p className="text-white/35 text-[13px] font-light">
          © 2026 William 曾伟林 · 用心创造体验{' '}
          <span className="text-[#ff4466] inline-block animate-pulse">♥</span>
        </p>
        <p className="text-white/20 text-[10px] mt-2 tracking-[2px] font-mono">
          {'<'} powered by AI · designed with love {'/>'}
        </p>
      </footer>
    </div>
  );
}
