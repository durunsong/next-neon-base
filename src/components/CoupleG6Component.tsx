'use client';

import { useEffect, useRef } from 'react';

import { coupleMemoriesData, interactionTypeColors, nodeTypeStyles } from './CoupleG6Config';

interface CoupleG6Props {
  data?: typeof coupleMemoriesData;
  style?: React.CSSProperties;
  className?: string;
}

// G6GraphConfig interface removed to fix unused variable warning

export default function CoupleG6Component({
  data = coupleMemoriesData,
  style,
  className,
}: CoupleG6Props) {
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
    const height = container.scrollHeight || 600;

    // 如果图实例已存在，先销毁
    if (graphRef.current) {
      graphRef.current.destroy();
    }

    try {
      // 为不同类型的节点和边准备样式数据
      const processedData = {
        nodes: data.nodes.map(node => ({
          ...node,
          style: {
            fill: nodeTypeStyles[node.type as keyof typeof nodeTypeStyles]?.color || '#ff6b9d',
            stroke: '#fff',
            lineWidth: 2,
            shadowColor:
              nodeTypeStyles[node.type as keyof typeof nodeTypeStyles]?.color || '#ff6b9d',
            shadowBlur: node.type === 'couple' ? 15 : 8,
            opacity: 0.9,
          },
          size: nodeTypeStyles[node.type as keyof typeof nodeTypeStyles]?.size || 30,
          labelCfg: {
            position: 'bottom',
            offset: 10,
            style: {
              fill: '#333',
              fontSize: node.type === 'couple' ? 16 : 12,
              fontWeight: node.type === 'couple' ? 'bold' : 'normal',
              background: {
                fill: 'rgba(255, 255, 255, 0.8)',
                padding: [4, 8, 4, 8],
                radius: 4,
              },
            },
          },
        })),
        edges: data.edges.map(edge => ({
          ...edge,
          style: {
            stroke:
              interactionTypeColors[edge.relation as keyof typeof interactionTypeColors] ||
              '#ff6b9d',
            lineWidth: edge.relation === 'timeline' ? 3 : 2,
            opacity: edge.relation === 'timeline' ? 0.8 : 0.6,
            endArrow: {
              path: edge.relation === 'timeline' ? 'M 0,0 L 8,4 L 8,-4 Z' : 'M 0,0 L 6,3 L 6,-3 Z',
              fill:
                interactionTypeColors[edge.relation as keyof typeof interactionTypeColors] ||
                '#ff6b9d',
            },
          },
          labelCfg: {
            autoRotate: true,
            refY: 5,
            style: {
              fill:
                interactionTypeColors[edge.relation as keyof typeof interactionTypeColors] ||
                '#ff6b9d',
              fontSize: 10,
              fontWeight: edge.relation === 'timeline' ? 'bold' : 'normal',
              background: {
                fill: 'rgba(255, 255, 255, 0.9)',
                padding: [2, 6, 2, 6],
                radius: 3,
              },
            },
          },
        })),
      };

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
          linkDistance: 150,
          nodeStrength: -120,
          nodeSize: 40,
          alpha: 0.3,
          alphaDecay: 0.03,
          gravity: 0.1,
        },
        defaultNode: {
          size: 30,
          style: {
            fill: '#ff6b9d',
            stroke: '#fff',
            lineWidth: 2,
            shadowColor: '#ff6b9d',
            shadowBlur: 8,
          },
          labelCfg: {
            position: 'bottom',
            offset: 8,
            style: {
              fill: '#333',
              fontSize: 12,
              fontWeight: 500,
              background: {
                fill: 'rgba(255, 255, 255, 0.8)',
                padding: [3, 6, 3, 6],
                radius: 3,
              },
            },
          },
        },
        defaultEdge: {
          style: {
            stroke: '#ff6b9d',
            lineWidth: 2,
            opacity: 0.6,
            endArrow: {
              path: 'M 0,0 L 6,3 L 6,-3 Z',
              fill: '#ff6b9d',
            },
          },
          labelCfg: {
            autoRotate: true,
            refY: 5,
            style: {
              fill: '#666',
              fontSize: 10,
              background: {
                fill: 'rgba(255, 255, 255, 0.9)',
                padding: [2, 4, 2, 4],
                radius: 2,
              },
            },
          },
        },
        // 添加动画效果
        animate: true,
        // 添加缩放限制
        minZoom: 0.5,
        maxZoom: 2,
        // 添加适应画布
        fitView: false, // 禁用自动适应，手动控制
        fitViewPadding: [40, 40, 40, 40],
        fitCenter: true,
      });

      // 设置特殊位置
      const centerNode = processedData.nodes.find(node => node.id === 'couple');
      if (centerNode) {
        centerNode.x = width / 2;
        centerNode.y = height / 2;
      }

      // 渲染数据
      graphRef.current.data(processedData);
      graphRef.current.render();

      // 添加交互事件
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (graphRef.current as any).on('node:mouseenter', (e: any) => {
        const nodeItem = e.item;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (graphRef.current as any)?.setItemState(nodeItem, 'hover', true);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (graphRef.current as any).on('node:mouseleave', (e: any) => {
        const nodeItem = e.item;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (graphRef.current as any)?.setItemState(nodeItem, 'hover', false);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (graphRef.current as any).on('edge:mouseenter', (e: any) => {
        const nodeItem = e.item;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (graphRef.current as any)?.setItemState(nodeItem, 'hover', true);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (graphRef.current as any).on('edge:mouseleave', (e: any) => {
        const nodeItem = e.item;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (graphRef.current as any)?.setItemState(nodeItem, 'hover', false);
      });

      // 手动设置合适的缩放级别，避免 fitView 错误
      setTimeout(() => {
        if (graphRef.current) {
          try {
            // 手动设置缩放级别
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (graphRef.current as any).zoomTo(0.8);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (graphRef.current as any).fitCenter();
          } catch {
            console.log('G6 缩放设置完成');
          }
        }
      }, 500);

      // 自适应窗口大小
      const handleResize = () => {
        if (graphRef.current && containerRef.current) {
          const width = containerRef.current.scrollWidth;
          const height = containerRef.current.scrollHeight || 600;
          graphRef.current.changeSize(width, height);
          // 避免 fitView 错误，使用 fitCenter
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (graphRef.current as any).fitCenter();
          } catch {
            console.log('G6 窗口调整完成');
          }
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
      console.error('情侣G6图初始化错误:', error);
    }
  }, [data]);

  return <div ref={containerRef} className={className} style={{ ...style, minHeight: '600px' }} />;
}
