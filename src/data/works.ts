export interface Work {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  stats?: string;
}

export const works: Work[] = [
  {
    id: 'portfolio-3d',
    name: '3D 个人作品集',
    category: 'React · Three.js',
    description: '基于 React + Three.js 构建的沉浸式 3D 个人作品集网站，包含交互式 3D 场景、粒子系统与流畅的滚动动画。',
    image: '/images/portfolio-3d.jpg',
    tags: ['React', 'Three.js', 'Framer Motion'],
    stats: '前端开发 · 3D 交互',
  },
  {
    id: 'ecommerce-platform',
    name: '电商管理平台',
    category: 'React · TypeScript',
    description: '全功能电商后台管理系统，集成数据可视化大屏、实时订单监控、多维度报表分析等模块。',
    image: '/images/ecommerce.jpg',
    tags: ['TypeScript', 'Tailwind', 'Node.js'],
    stats: '全栈开发 · 企业级应用',
  },
  {
    id: 'motion-dashboard',
    name: '数据可视化大屏',
    category: 'D3.js · Canvas',
    description: '高性能实时数据可视化大屏，支持百万级数据点的流畅渲染与动态交互。',
    image: '/images/dashboard.jpg',
    tags: ['D3.js', 'Canvas API', 'WebSocket'],
    stats: '数据可视化 · 实时监控',
  },
  {
    id: 'creative-landing',
    name: '创意品牌落地页',
    category: 'GSAP · 动效设计',
    description: '为高端品牌打造的品牌形象展示页，运用 GSAP 滚动动画与视差效果，打造沉浸式浏览体验。',
    image: '/images/landing.jpg',
    tags: ['GSAP', 'UI/UX', '响应式设计'],
    stats: '动效开发 · 品牌设计',
  },
  {
    id: 'ai-chat-app',
    name: 'AI 对话助手',
    category: 'React · OpenAI',
    description: '集成了大语言模型的智能对话应用，支持流式输出、多轮对话与上下文记忆功能。',
    image: '/images/aichat.jpg',
    tags: ['React', 'OpenAI', 'SSE'],
    stats: 'AI 应用 · 全栈开发',
  },
  {
    id: 'design-system',
    name: '组件库设计系统',
    category: 'React · Storybook',
    description: '企业级 UI 组件库与设计系统，覆盖 50+ 通用组件，支持主题定制与暗色模式。',
    image: '/images/designsys.jpg',
    tags: ['Storybook', 'Rollup', '文档'],
    stats: '组件库 · 设计系统',
  },
];
