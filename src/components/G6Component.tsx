'use client';

import { useEffect, useRef } from 'react';

// 临时简化类型以避免冲突
interface G6Props {
  data: Record<string, unknown>;
  style?: React.CSSProperties;
  className?: string;
}

export default function G6Component({ data, style, className }: G6Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const graphRef = useRef<any>(null);

  useEffect(() => {
    // 确保G6已加载且容器存在
    if (typeof window === 'undefined' || !window.G6 || !containerRef.current) return;

    const G6 = window.G6;

    // 确保容器有尺寸
    const container = containerRef.current;
    const width = container.scrollWidth;
    const height = container.scrollHeight || 550;

    // 如果图实例已存在，先销毁
    if (graphRef.current) {
      graphRef.current.destroy();
    }

    try {
      // 配置G6图
      graphRef.current = new G6.Graph({
        container,
        width,
        height,
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
        },
        layout: {
          type: 'force',
          preventOverlap: true,
          linkDistance: 250, // 增加节点之间的距离
          nodeStrength: -150, // 增加节点间的斥力
          nodeSize: 30,
          alpha: 0.2,
          alphaDecay: 0.02,
          gravity: 0.15, // 减小中心引力，让节点更分散
        },
        defaultNode: {
          size: 30, // 减小节点尺寸
          style: {
            fill: '#4f46e5',
            stroke: '#c9d6ff',
            lineWidth: 1.5, // 减小线宽
            shadowColor: '#4f46e5',
            shadowBlur: 8, // 减小阴影
          },
          labelCfg: {
            position: 'bottom',
            offset: 8, // 减小标签偏移
            style: {
              fill: '#333',
              fontSize: 13, // 增大字体
              fontWeight: 500,
              background: {
                fill: '#ffffff80',
                padding: [2, 4, 2, 4],
              },
            },
          },
        },
        defaultEdge: {
          style: {
            stroke: '#aaa',
            lineWidth: 1, // 减小线宽
            endArrow: true,
          },
          labelCfg: {
            autoRotate: true,
            refY: 5,
            style: {
              fill: '#666',
              fontSize: 11, // 增大字体
              background: {
                fill: '#ffffff80',
                padding: [2, 4, 2, 4],
              },
            },
          },
        },
        // 添加动画效果
        animate: true,
        // 添加缩放限制
        minZoom: 0.2,
        maxZoom: 5,
        // 添加适应画布，但不要自动缩放太多
        fitView: true,
        fitViewPadding: [80, 80, 80, 80], // 增加边距，避免过度缩放
        fitCenter: true, // 居中显示
      });

      // 预先计算节点位置，使其更分散
      const nodes = techStackData.nodes;

      // 将Next.js放在左侧
      const nextjsNode = nodes.find(node => node.id === 'nextjs');
      if (nextjsNode) {
        nextjsNode.x = width * 0.15; // 放在左侧
        nextjsNode.y = height * 0.5; // 垂直居中
      }

      // 特别处理React和Zustand，使其形成三角关系
      const reactNode = nodes.find(node => node.id === 'react');
      if (reactNode) {
        reactNode.x = width * 0.22; // 放在左上方
        reactNode.y = height * 0.2; // 放在更上方
      }

      const zustandNode = nodes.find(node => node.id === 'zustand');
      if (zustandNode) {
        zustandNode.x = width * 0.38; // 放在Next.js右上方
        zustandNode.y = height * 0.3; // 放在上方
      }

      // 特别处理TailwindCSS和Ant Design，避免它们挤在一起
      const tailwindNode = nodes.find(node => node.id === 'tailwind');
      if (tailwindNode) {
        tailwindNode.x = width * 0.5;
        tailwindNode.y = height * 0.2;
      }

      const antdNode = nodes.find(node => node.id === 'antd');
      if (antdNode) {
        antdNode.x = width * 0.65;
        antdNode.y = height * 0.2;
      }

      // 特别处理数据库相关节点
      const prismaNode = nodes.find(node => node.id === 'prisma');
      if (prismaNode) {
        prismaNode.x = width * 0.4;
        prismaNode.y = height * 0.75;
      }

      const neonNode = nodes.find(node => node.id === 'neon');
      if (neonNode) {
        neonNode.x = width * 0.3;
        neonNode.y = height * 0.85;
      }

      const postgresNode = nodes.find(node => node.id === 'postgres');
      if (postgresNode) {
        postgresNode.x = width * 0.5;
        postgresNode.y = height * 0.85;
      }

      // 特别处理可视化相关节点
      const echartsNode = nodes.find(node => node.id === 'echarts');
      if (echartsNode) {
        echartsNode.x = width * 0.8;
        echartsNode.y = height * 0.45;
      }

      const g6Node = nodes.find(node => node.id === 'g6');
      if (g6Node) {
        g6Node.x = width * 0.9;
        g6Node.y = height * 0.35;
      }

      // 特别处理存储相关节点
      const redisNode = nodes.find(node => node.id === 'redis');
      if (redisNode) {
        redisNode.x = width * 0.9;
        redisNode.y = height * 0.65;
      }

      const aliossNode = nodes.find(node => node.id === 'alioss');
      if (aliossNode) {
        aliossNode.x = width * 0.8;
        aliossNode.y = height * 0.75;
      }

      // 处理TypeScript和Vercel
      const tsNode = nodes.find(node => node.id === 'typescript');
      if (tsNode) {
        tsNode.x = width * 0.4;
        tsNode.y = height * 0.5;
      }

      const vercelNode = nodes.find(node => node.id === 'vercel');
      if (vercelNode) {
        vercelNode.x = width * 0.6;
        vercelNode.y = height * 0.6;
      }

      // 其他节点向右侧发散 (如果有的话)
      const otherNodes = nodes.filter(
        node =>
          ![
            'nextjs',
            'react',
            'zustand',
            'tailwind',
            'antd',
            'prisma',
            'neon',
            'postgres',
            'echarts',
            'g6',
            'redis',
            'alioss',
            'typescript',
            'vercel',
          ].includes(node.id)
      );

      // 计算每个节点位置
      otherNodes.forEach(node => {
        const xPosition = width * (0.5 + (Math.random() - 0.5) * 0.3);
        const yPosition = height * (0.5 + (Math.random() - 0.5) * 0.3);

        node.x = xPosition;
        node.y = yPosition;
      });

      // 渲染数据
      graphRef.current.data(techStackData);
      graphRef.current.render();

      // 居中显示，但稍微延迟以确保布局已计算
      setTimeout(() => {
        if (graphRef.current) {
          graphRef.current.fitView();
        }
      }, 200);

      // 自适应窗口大小
      const handleResize = () => {
        if (graphRef.current && containerRef.current) {
          const width = containerRef.current.scrollWidth;
          const height = containerRef.current.scrollHeight || 550;
          graphRef.current.changeSize(width, height);
          graphRef.current.fitView();
        }
      };

      window.addEventListener('resize', handleResize);

      // 清理函数
      return () => {
        window.removeEventListener('resize', handleResize);
        if (graphRef.current) {
          graphRef.current.destroy();
          graphRef.current = null;
        }
      };
    } catch (error) {
      console.error('G6初始化错误:', error);
    }
  }, [data]);

  return <div ref={containerRef} className={className} style={{ ...style, minHeight: '550px' }} />;
}

// 技术栈关系图数据
export const techStackData = {
  nodes: [
    // 核心技术
    { id: 'nextjs', label: 'Next.js 15', x: 10, y: 100 },
    { id: 'react', label: 'React', x: 200, y: 50 },
    { id: 'prisma', label: 'Prisma ORM', x: 300, y: 150 },
    { id: 'neon', label: 'Neon DB', x: 400, y: 150 },
    { id: 'postgres', label: 'PostgreSQL', x: 500, y: 200 },

    // 样式和语言
    { id: 'tailwind', label: 'TailwindCSS', x: 200, y: 200 },
    { id: 'typescript', label: 'TypeScript', x: 300, y: 250 },

    // 部署和服务
    { id: 'vercel', label: 'Vercel', x: 100, y: 300 },

    // 可视化
    { id: 'echarts', label: 'ECharts', x: 400, y: 300 },
    { id: 'g6', label: 'G6', x: 500, y: 250 },

    // 新增: 状态管理、存储和缓存
    { id: 'zustand', label: 'Zustand', x: 150, y: 150 },
    { id: 'alioss', label: 'Ali OSS', x: 250, y: 300 },
    { id: 'redis', label: 'Redis', x: 350, y: 100 },
    { id: 'antd', label: 'Ant Design', x: 450, y: 50 },
  ],
  edges: [
    // 核心框架关系
    { source: 'nextjs', target: 'react', label: '基于' },
    { source: 'nextjs', target: 'vercel', label: '部署' },
    { source: 'nextjs', target: 'prisma', label: '集成' },
    { source: 'prisma', target: 'neon', label: '连接' },
    { source: 'neon', target: 'postgres', label: '基于' },

    // UI和语言
    { source: 'nextjs', target: 'tailwind', label: '样式' },
    { source: 'nextjs', target: 'typescript', label: '语言' },
    { source: 'nextjs', target: 'antd', label: 'UI组件' },

    // 可视化
    { source: 'nextjs', target: 'echarts', label: '可视化' },
    { source: 'nextjs', target: 'g6', label: '图形' },

    // 新增: 状态管理、存储和缓存
    { source: 'nextjs', target: 'zustand', label: '状态管理' },
    { source: 'nextjs', target: 'alioss', label: '对象存储' },
    { source: 'nextjs', target: 'redis', label: '缓存' },
    { source: 'zustand', target: 'react', label: '状态绑定' },
  ],
};
