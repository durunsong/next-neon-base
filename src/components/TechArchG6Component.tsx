'use client';

import { useEffect, useRef } from 'react';

import { techArchitectureData, techInteractionColors, techNodeStyles } from './TechArchG6Config';

// G6 相关类型定义
interface G6Event {
  item: G6Item;
  target: G6Item;
}

interface G6Item {
  getEdges(): G6Edge[];
  getSource(): G6Item;
  getTarget(): G6Item;
}

interface G6Edge {
  getSource(): G6Item;
  getTarget(): G6Item;
}

interface G6Graph {
  data(data: unknown): void;
  render(): void;
  on(event: string, callback: (e: G6Event) => void): void;
  setItemState(item: G6Item, state: string, value: boolean): void;
  fitView(): void;
  fitCenter(): void;
  zoom(ratio: number): void;
  changeSize(width: number, height: number): void;
  destroy(): void;
}

interface TechArchG6Props {
  data?: typeof techArchitectureData;
  style?: React.CSSProperties;
  className?: string;
}

export default function TechArchG6Component({
  data = techArchitectureData,
  style,
  className,
}: TechArchG6Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<G6Graph | null>(null);

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
            fill: techNodeStyles[node.type as keyof typeof techNodeStyles]?.color || '#06b6d4',
            stroke: '#fff',
            lineWidth: 2,
            radius: 8,
          },
          labelCfg: {
            style: {
              fill: '#333',
              fontSize: 12,
              fontWeight: 'bold',
              textAlign: 'center',
              textBaseline: 'middle',
            },
            position: 'bottom',
            offset: 10,
          },
          size: techNodeStyles[node.type as keyof typeof techNodeStyles]?.size || 30,
        })),
        edges: data.edges.map(edge => ({
          ...edge,
          style: {
            stroke:
              techInteractionColors[edge.relation as keyof typeof techInteractionColors] ||
              '#06b6d4',
            lineWidth: 2,
            opacity: 0.8,
            endArrow: {
              path: G6.Arrow.triangle(8, 8, 8),
              fill:
                techInteractionColors[edge.relation as keyof typeof techInteractionColors] ||
                '#06b6d4',
            },
          },
          labelCfg: {
            style: {
              fill: '#666',
              fontSize: 10,
              background: {
                fill: '#fff',
                padding: [2, 4, 2, 4],
                radius: 4,
              },
            },
            autoRotate: true,
          },
        })),
      };

      // 创建G6图实例
      const graph = new G6.Graph({
        container: container,
        width,
        height,
        layout: {
          type: 'force',
          preventOverlap: true,
          nodeSize: 40,
          nodeSpacing: 50,
          linkDistance: 120,
          nodeStrength: -300,
          edgeStrength: 0.8,
          collideStrength: 0.8,
          alpha: 0.9,
          alphaDecay: 0.028,
          alphaMin: 0.01,
        },
        defaultNode: {
          type: 'circle',
          style: {
            fill: '#06b6d4',
            stroke: '#fff',
            lineWidth: 2,
          },
          labelCfg: {
            style: {
              fill: '#333',
              fontSize: 12,
              fontWeight: 'bold',
            },
          },
        },
        defaultEdge: {
          type: 'line',
          style: {
            stroke: '#06b6d4',
            lineWidth: 2,
            opacity: 0.8,
          },
        },
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
        },
        animate: true,
        animateCfg: {
          duration: 1000,
          easing: 'easeInOutQuart',
        },
      });

      graphRef.current = graph;

      // 载入数据
      graph.data(processedData);
      graph.render();

      // 节点悬停效果
      graph.on('node:mouseenter', (e: G6Event) => {
        const nodeItem = e.item;

        // 高亮当前节点
        graph.setItemState(nodeItem, 'hover', true);

        // 高亮相关的边和节点
        const relatedEdges = nodeItem.getEdges();
        relatedEdges.forEach((edge: G6Edge) => {
          graph.setItemState(edge as G6Item, 'highlight', true);
          const otherNode = edge.getSource() === nodeItem ? edge.getTarget() : edge.getSource();
          graph.setItemState(otherNode, 'highlight', true);
        });
      });

      graph.on('node:mouseleave', (e: G6Event) => {
        const nodeItem = e.item;

        // 取消高亮
        graph.setItemState(nodeItem, 'hover', false);

        // 取消相关边和节点的高亮
        const relatedEdges = nodeItem.getEdges();
        relatedEdges.forEach((edge: G6Edge) => {
          graph.setItemState(edge as G6Item, 'highlight', false);
          const otherNode = edge.getSource() === nodeItem ? edge.getTarget() : edge.getSource();
          graph.setItemState(otherNode, 'highlight', false);
        });
      });

      // 边悬停效果
      graph.on('edge:mouseenter', (e: G6Event) => {
        const edgeItem = e.item;
        graph.setItemState(edgeItem, 'hover', true);
      });

      graph.on('edge:mouseleave', (e: G6Event) => {
        const edgeItem = e.item;
        graph.setItemState(edgeItem, 'hover', false);
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
            console.log('G6 技术架构图缩放设置完成');
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
            graphRef.current.fitCenter();
          } catch {
            console.log('G6 技术架构图窗口调整完成');
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
      console.error('技术架构G6图初始化错误:', error);
    }
  }, [data]);

  return <div ref={containerRef} className={className} style={{ ...style, minHeight: '600px' }} />;
}
