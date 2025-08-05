// 技术架构关系图数据
export const techArchitectureData = {
  nodes: [
    // 核心应用节点
    { id: 'app', label: 'Next.js 应用', x: 0, y: 0, type: 'core' },

    // 前端技术栈
    { id: 'react', label: '⚛️ React 19', x: -200, y: -100, type: 'frontend' },
    { id: 'nextjs', label: '▲ Next.js 15', x: -150, y: 50, type: 'frontend' },
    { id: 'typescript', label: '📘 TypeScript', x: -100, y: -150, type: 'frontend' },
    { id: 'tailwind', label: '🎨 Tailwind CSS', x: 0, y: -200, type: 'frontend' },
    { id: 'antd', label: '🐜 Ant Design', x: 100, y: -150, type: 'frontend' },
    { id: 'echarts', label: '📊 ECharts', x: 150, y: 50, type: 'frontend' },
    { id: 'threejs', label: '🎯 Three.js', x: 200, y: -100, type: 'frontend' },
    { id: 'zustand', label: '🐻 Zustand', x: 0, y: 200, type: 'frontend' },

    // 后端技术栈
    { id: 'nodejs', label: '🟢 Node.js', x: -250, y: 150, type: 'backend' },
    { id: 'prisma', label: '🔷 Prisma ORM', x: 250, y: 150, type: 'backend' },
    { id: 'postgresql', label: '🐘 PostgreSQL', x: -150, y: 250, type: 'backend' },
    { id: 'redis', label: '🔴 Redis', x: 150, y: 250, type: 'backend' },

    // 开发工具链
    { id: 'eslint', label: '🔍 ESLint', x: -300, y: 0, type: 'devtools' },
    { id: 'prettier', label: '💅 Prettier', x: 300, y: 0, type: 'devtools' },
    { id: 'husky', label: '🐕 Husky', x: 0, y: -300, type: 'devtools' },
    { id: 'turbo', label: '⚡ Turbopack', x: 0, y: 300, type: 'devtools' },

    // 部署和监控
    { id: 'vercel', label: '▲ Vercel', x: -350, y: -200, type: 'deploy' },
    { id: 'docker', label: '🐳 Docker', x: 350, y: -200, type: 'deploy' },
  ],
  edges: [
    // 核心应用连接
    { source: 'app', target: 'react', label: '基于', relation: 'core' },
    { source: 'app', target: 'nextjs', label: '框架', relation: 'core' },
    { source: 'app', target: 'typescript', label: '类型', relation: 'core' },
    { source: 'app', target: 'zustand', label: '状态', relation: 'core' },

    // 前端技术连接
    { source: 'react', target: 'nextjs', label: '框架', relation: 'frontend' },
    { source: 'nextjs', target: 'typescript', label: '开发', relation: 'frontend' },
    { source: 'typescript', target: 'tailwind', label: '样式', relation: 'frontend' },
    { source: 'tailwind', target: 'antd', label: '组件', relation: 'frontend' },
    { source: 'antd', target: 'echarts', label: '图表', relation: 'frontend' },
    { source: 'echarts', target: 'threejs', label: '3D', relation: 'frontend' },

    // 后端技术连接
    { source: 'app', target: 'nodejs', label: '运行时', relation: 'backend' },
    { source: 'app', target: 'prisma', label: '数据层', relation: 'backend' },
    { source: 'prisma', target: 'postgresql', label: '数据库', relation: 'backend' },
    { source: 'app', target: 'redis', label: '缓存', relation: 'backend' },

    // 开发工具连接
    { source: 'app', target: 'eslint', label: '代码质量', relation: 'devtools' },
    { source: 'app', target: 'prettier', label: '代码格式', relation: 'devtools' },
    { source: 'app', target: 'husky', label: 'Git钩子', relation: 'devtools' },
    { source: 'app', target: 'turbo', label: '构建', relation: 'devtools' },

    // 部署连接
    { source: 'app', target: 'vercel', label: '部署', relation: 'deploy' },
    { source: 'app', target: 'docker', label: '容器化', relation: 'deploy' },

    // 交叉连接（技术间相互依赖）
    { source: 'nodejs', target: 'prisma', label: '集成', relation: 'integration' },
    { source: 'react', target: 'antd', label: '组件库', relation: 'integration' },
    { source: 'nextjs', target: 'vercel', label: '最佳实践', relation: 'integration' },
    { source: 'typescript', target: 'eslint', label: '规范', relation: 'integration' },
    { source: 'prisma', target: 'redis', label: '缓存层', relation: 'integration' },
  ],
};

// 技术栈分层数据
export const techStackLayers = [
  { layer: '表现层', technologies: ['React', 'Next.js', 'Tailwind CSS', 'Ant Design'], level: 1 },
  { layer: '逻辑层', technologies: ['TypeScript', 'Zustand', 'ECharts', 'Three.js'], level: 2 },
  { layer: '服务层', technologies: ['Node.js', 'API Routes', 'Middleware'], level: 3 },
  { layer: '数据层', technologies: ['Prisma', 'PostgreSQL', 'Redis'], level: 4 },
  { layer: '工具层', technologies: ['ESLint', 'Prettier', 'Husky', 'Turbopack'], level: 5 },
  { layer: '部署层', technologies: ['Vercel', 'Docker', 'CI/CD'], level: 6 },
];

// 技术栈性能指标
export const performanceMetrics = [
  { metric: '首次内容绘制', value: 1.2, unit: 's', category: '性能' },
  { metric: '最大内容绘制', value: 2.1, unit: 's', category: '性能' },
  { metric: '累积布局偏移', value: 0.05, unit: '', category: '性能' },
  { metric: '首次输入延迟', value: 45, unit: 'ms', category: '交互' },
  { metric: '代码覆盖率', value: 85, unit: '%', category: '质量' },
  { metric: '类型安全性', value: 95, unit: '%', category: '质量' },
  { metric: '构建时间', value: 32, unit: 's', category: '开发' },
  { metric: '热重载速度', value: 0.8, unit: 's', category: '开发' },
];

// 技术架构交互类型配置
export const techInteractionColors = {
  core: '#3b82f6', // 核心 - 蓝色
  frontend: '#06b6d4', // 前端 - 青色
  backend: '#10b981', // 后端 - 绿色
  devtools: '#8b5cf6', // 开发工具 - 紫色
  deploy: '#f59e0b', // 部署 - 橙色
  integration: '#6366f1', // 集成 - 靛蓝
};

// 节点类型配置
export const techNodeStyles = {
  core: {
    size: 50,
    color: '#3b82f6',
    icon: '🚀',
  },
  frontend: {
    size: 35,
    color: '#06b6d4',
    icon: '⚛️',
  },
  backend: {
    size: 35,
    color: '#10b981',
    icon: '🛡️',
  },
  devtools: {
    size: 30,
    color: '#8b5cf6',
    icon: '🔧',
  },
  deploy: {
    size: 32,
    color: '#f59e0b',
    icon: '🌐',
  },
};
