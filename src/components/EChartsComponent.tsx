'use client';

import * as echarts from 'echarts';

import { useEffect, useRef } from 'react';

interface EChartsProps {
  option: echarts.EChartsOption;
  style?: React.CSSProperties;
  className?: string;
}

export default function EChartsComponent({ option, style, className }: EChartsProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    // 延迟初始化，避免在主进程中调用
    const timer = setTimeout(() => {
      if (chartRef.current && !chartInstance.current) {
        try {
          chartInstance.current = echarts.init(chartRef.current);
          // 设置图表配置
          chartInstance.current.setOption(option, true);
        } catch (error) {
          console.error('ECharts 初始化错误:', error);
        }
      } else if (chartInstance.current) {
        // 更新已存在的图表
        chartInstance.current.setOption(option, true);
      }
    }, 100);

    // 响应窗口大小变化
    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, [option]);

  return <div ref={chartRef} className={className} style={style} />;
}

// 预设图表配置
export const techStackOption: echarts.EChartsOption = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: '5%',
    left: 'center',
    textStyle: {
      color: '#333',
    },
  },
  series: [
    {
      name: '技术栈',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 35, name: 'Next.js' },
        { value: 25, name: 'Prisma' },
        { value: 20, name: 'Neon DB' },
        { value: 15, name: 'TailwindCSS' },
        { value: 5, name: 'TypeScript' },
      ],
    },
  ],
};

export const performanceOption: echarts.EChartsOption = {
  title: {
    text: '性能指标',
    textStyle: {
      color: '#333',
      fontSize: 16,
    },
  },
  tooltip: {
    trigger: 'axis',
  },
  radar: {
    indicator: [
      { name: '加载速度', max: 100 },
      { name: '响应时间', max: 100 },
      { name: '代码质量', max: 100 },
      { name: '可维护性', max: 100 },
      { name: '可扩展性', max: 100 },
    ],
  },
  series: [
    {
      name: '性能评分',
      type: 'radar',
      data: [
        {
          value: [95, 90, 88, 92, 94],
          name: 'Next Neon Base',
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(79, 70, 229, 0.6)' },
              { offset: 1, color: 'rgba(79, 70, 229, 0.1)' },
            ]),
          },
        },
      ],
    },
  ],
};

export const trendsOption: echarts.EChartsOption = {
  title: {
    text: '开发趋势',
    textStyle: {
      color: '#333',
      fontSize: 16,
    },
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '开发活跃度',
      type: 'line',
      smooth: true,
      data: [10, 25, 35, 45, 60, 80],
      lineStyle: {
        width: 3,
        color: '#4f46e5',
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(79, 70, 229, 0.6)' },
          { offset: 1, color: 'rgba(79, 70, 229, 0.1)' },
        ]),
      },
    },
  ],
};
