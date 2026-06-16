import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, X } from 'lucide-react';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Contact() {
  const [showWechat, setShowWechat] = useState(false);

  return (
    <section id="contact" className="pt-[80px] pb-[60px] px-6 max-w-6xl mx-auto text-center">
      <div className="section-label justify-center">保持联系</div>
      <h2 className="section-title">
        找到 <span className="text-gradient">我</span>
      </h2>

      {/* 联系方式 */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row justify-center gap-4 mt-10 max-w-xl mx-auto"
      >
        <motion.a
          variants={item}
          href="#"
          onClick={e => { e.preventDefault(); setShowWechat(true); }}
          whileHover={{ scale: 1.03 }}
          className="inline-flex items-center gap-3.5 px-7 py-4 glass rounded-full no-underline text-white
            transition-all duration-400 hover:border-white/[0.2] hover:bg-white/5 cursor-pointer"
        >
          <MessageCircle size={18} className="text-white/70" />
          <div className="text-left">
            <div className="text-[10px] text-white/35 tracking-[1.5px] uppercase">微信</div>
            <div className="text-[14px] font-medium">Li77nk</div>
          </div>
        </motion.a>

        <motion.a
          variants={item}
          href="mailto:919904965@qq.com"
          whileHover={{ scale: 1.03 }}
          className="inline-flex items-center gap-3.5 px-7 py-4 glass rounded-full no-underline text-white
            transition-all duration-400 hover:border-white/[0.2] hover:bg-white/5"
        >
          <Mail size={18} className="text-white/70" />
          <div className="text-left">
            <div className="text-[10px] text-white/35 tracking-[1.5px] uppercase">邮箱</div>
            <div className="text-[14px] font-medium">919904965@qq.com</div>
          </div>
        </motion.a>
      </motion.div>

      {/* Wechat 弹窗 */}
      {showWechat && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(30px)' }}
          onClick={e => { if (e.target === e.currentTarget) setShowWechat(false); }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-3xl p-8 max-w-sm w-full relative text-center"
          >
            <button
              onClick={() => setShowWechat(false)}
              className="absolute top-4 right-5 text-white/50 hover:text-white transition-colors bg-none border-none cursor-pointer"
            >
              <X size={22} />
            </button>
            <h3 className="text-[20px] font-semibold mb-2">微信：Li77nk</h3>
            <p className="text-[14px] text-white/50 mb-4">扫码添加好友</p>
            <div className="w-[180px] h-[180px] mx-auto rounded-2xl flex items-center justify-center text-[13px] text-white/40 border border-white/[0.08]"
              style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
              微信二维码<br />（请加微信）
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
