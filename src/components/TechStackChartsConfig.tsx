import * as echarts from 'echarts';

// 技术栈使用统计（柱状图）
export const techUsageOption: echarts.EChartsOption = {
  title: {
    text: '🚀 技术栈使用频率',
    textStyle: {
      color: '#06b6d4',
      fontSize: 18,
      fontWeight: 'bold',
    },
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#06b6d4',
    borderWidth: 2,
    textStyle: {
      color: '#333',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind',
      'Prisma',
      'Antd',
      'ECharts',
      'Zustand',
      'Node.js',
      'PostgreSQL',
      'Redis',
      'Three.js',
    ],
    axisLine: {
      lineStyle: {
        color: '#06b6d4',
      },
    },
    axisLabel: {
      color: '#666',
      rotate: 45,
    },
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#06b6d4',
      },
    },
    axisLabel: {
      color: '#666',
    },
    splitLine: {
      lineStyle: {
        color: '#f0f0f0',
      },
    },
  },
  series: [
    {
      name: '使用频率',
      type: 'bar',
      data: [95, 90, 88, 85, 80, 75, 70, 65, 82, 78, 68, 60],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#06b6d4' },
          { offset: 1, color: '#0891b2' },
        ]),
        borderRadius: [4, 4, 0, 0],
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#0891b2' },
            { offset: 1, color: '#0e7490' },
          ]),
        },
      },
      animationDelay: (idx: number) => idx * 100,
    },
  ],
  animationEasing: 'elasticOut',
  animationDelayUpdate: (idx: number) => idx * 5,
};

// 项目开发进度（折线图）
export const projectProgressOption: echarts.EChartsOption = {
  title: {
    text: '⚡ 项目开发进度',
    textStyle: {
      color: '#8b5cf6',
      fontSize: 18,
      fontWeight: 'bold',
    },
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#8b5cf6',
    borderWidth: 2,
    textStyle: {
      color: '#333',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周'],
    axisLine: {
      lineStyle: {
        color: '#8b5cf6',
      },
    },
    axisLabel: {
      color: '#666',
    },
  },
  yAxis: {
    type: 'value',
    name: '完成度(%)',
    axisLine: {
      lineStyle: {
        color: '#8b5cf6',
      },
    },
    axisLabel: {
      color: '#666',
    },
    splitLine: {
      lineStyle: {
        color: '#f0f0f0',
      },
    },
  },
  series: [
    {
      name: '开发进度',
      type: 'line',
      smooth: true,
      data: [15, 28, 45, 62, 78, 88, 95],
      lineStyle: {
        width: 4,
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#8b5cf6' },
          { offset: 1, color: '#7c3aed' },
        ]),
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(139, 92, 246, 0.6)' },
          { offset: 1, color: 'rgba(139, 92, 246, 0.1)' },
        ]),
      },
      symbol: 'circle',
      symbolSize: 8,
      itemStyle: {
        color: '#8b5cf6',
        borderColor: '#fff',
        borderWidth: 2,
      },
      emphasis: {
        itemStyle: {
          color: '#7c3aed',
          borderColor: '#fff',
          borderWidth: 3,
        },
      },
      animationDelay: 300,
    },
  ],
  animationEasing: 'cubicOut',
};

// 代码提交活跃度热力图
export const commitHeatmapOption: echarts.EChartsOption = {
  title: {
    text: '📊 代码提交活跃度',
    textStyle: {
      color: '#10b981',
      fontSize: 18,
      fontWeight: 'bold',
    },
    left: 'center',
  },
  tooltip: {
    position: 'top',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#10b981',
    borderWidth: 2,
    textStyle: {
      color: '#333',
    },
  },
  grid: {
    height: '50%',
    top: '15%',
  },
  xAxis: {
    type: 'category',
    data: ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'],
    splitArea: {
      show: true,
    },
    axisLabel: {
      color: '#666',
    },
  },
  yAxis: {
    type: 'category',
    data: ['周日', '周六', '周五', '周四', '周三', '周二', '周一'],
    splitArea: {
      show: true,
    },
    axisLabel: {
      color: '#666',
    },
  },
  visualMap: {
    min: 0,
    max: 20,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: '5%',
    inRange: {
      color: ['#dcfce7', '#10b981', '#047857'],
    },
    textStyle: {
      color: '#666',
    },
  },
  series: [
    {
      name: '提交次数',
      type: 'heatmap',
      data: [
        [0, 0, 2],
        [1, 0, 5],
        [2, 0, 3],
        [3, 0, 1],
        [4, 0, 0],
        [5, 0, 2],
        [6, 0, 8],
        [7, 0, 12],
        [8, 0, 15],
        [9, 0, 10],
        [10, 0, 8],
        [11, 0, 3],
        [0, 1, 3],
        [1, 1, 6],
        [2, 1, 4],
        [3, 1, 2],
        [4, 1, 1],
        [5, 1, 3],
        [6, 1, 10],
        [7, 1, 15],
        [8, 1, 18],
        [9, 1, 12],
        [10, 1, 9],
        [11, 1, 4],
        [0, 2, 1],
        [1, 2, 4],
        [2, 2, 2],
        [3, 2, 1],
        [4, 2, 0],
        [5, 2, 2],
        [6, 2, 7],
        [7, 2, 11],
        [8, 2, 14],
        [9, 2, 9],
        [10, 2, 7],
        [11, 2, 2],
        [0, 3, 0],
        [1, 3, 2],
        [2, 3, 1],
        [3, 3, 0],
        [4, 3, 0],
        [5, 3, 1],
        [6, 3, 5],
        [7, 3, 8],
        [8, 3, 12],
        [9, 3, 8],
        [10, 3, 6],
        [11, 3, 1],
        [0, 4, 1],
        [1, 4, 3],
        [2, 4, 2],
        [3, 4, 1],
        [4, 4, 0],
        [5, 4, 2],
        [6, 4, 6],
        [7, 4, 9],
        [8, 8, 13],
        [9, 4, 9],
        [10, 4, 7],
        [11, 4, 2],
        [0, 5, 4],
        [1, 5, 8],
        [2, 5, 6],
        [3, 5, 3],
        [4, 5, 2],
        [5, 5, 5],
        [6, 5, 12],
        [7, 5, 16],
        [8, 5, 20],
        [9, 5, 15],
        [10, 5, 11],
        [11, 5, 6],
        [0, 6, 3],
        [1, 6, 7],
        [2, 6, 5],
        [3, 6, 2],
        [4, 6, 1],
        [5, 6, 4],
        [6, 6, 11],
        [7, 6, 14],
        [8, 6, 18],
        [9, 6, 13],
        [10, 6, 10],
        [11, 6, 5],
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};

// 性能指标仪表盘
export const performanceOption: echarts.EChartsOption = {
  title: {
    text: '⚡ 应用性能指标',
    textStyle: {
      color: '#f59e0b',
      fontSize: 18,
      fontWeight: 'bold',
    },
    left: 'center',
    top: '10%',
  },
  series: [
    {
      name: '性能得分',
      type: 'gauge',
      radius: '80%',
      center: ['50%', '55%'],
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 100,
      splitNumber: 10,
      itemStyle: {
        color: '#f59e0b',
      },
      progress: {
        show: true,
        width: 15,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#fef3c7' },
            { offset: 0.5, color: '#fbbf24' },
            { offset: 1, color: '#f59e0b' },
          ]),
        },
      },
      pointer: {
        show: true,
        length: '60%',
        width: 6,
        itemStyle: {
          color: '#f59e0b',
        },
      },
      axisLine: {
        lineStyle: {
          width: 15,
          color: [
            [0.3, '#ef4444'],
            [0.7, '#f59e0b'],
            [1, '#10b981'],
          ],
        },
      },
      axisTick: {
        distance: -30,
        length: 8,
        lineStyle: {
          color: '#fff',
          width: 2,
        },
      },
      splitLine: {
        distance: -30,
        length: 15,
        lineStyle: {
          color: '#fff',
          width: 4,
        },
      },
      axisLabel: {
        color: 'inherit',
        distance: 15,
        fontSize: 12,
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}分\n🚀',
        color: '#f59e0b',
        fontSize: 20,
        fontWeight: 'bold',
        offsetCenter: [0, '70%'],
      },
      data: [
        {
          value: 92,
          name: '综合得分',
        },
      ],
      animationDuration: 2000,
      animationEasing: 'cubicInOut',
    },
  ],
};

// 技术成长轨迹时间线
export const techGrowthOption: echarts.EChartsOption = {
  title: {
    text: '📈 技术成长轨迹',
    textStyle: {
      color: '#3b82f6',
      fontSize: 18,
      fontWeight: 'bold',
    },
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#3b82f6',
    borderWidth: 2,
    textStyle: {
      color: '#333',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: [
      '基础入门',
      '框架学习',
      '项目实践',
      '架构理解',
      '性能优化',
      '工程化',
      '全栈开发',
      '技术深化',
      '团队协作',
    ],
    axisLine: {
      lineStyle: {
        color: '#3b82f6',
      },
    },
    axisLabel: {
      color: '#666',
      rotate: 45,
    },
  },
  yAxis: {
    type: 'value',
    name: '技术水平',
    axisLine: {
      lineStyle: {
        color: '#3b82f6',
      },
    },
    axisLabel: {
      color: '#666',
    },
    splitLine: {
      lineStyle: {
        color: '#f0f0f0',
      },
    },
  },
  series: [
    {
      name: '技术水平',
      type: 'line',
      smooth: true,
      data: [20, 35, 50, 65, 75, 82, 88, 92, 95],
      lineStyle: {
        width: 4,
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#3b82f6' },
          { offset: 0.5, color: '#1d4ed8' },
          { offset: 1, color: '#1e40af' },
        ]),
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
          { offset: 1, color: 'rgba(59, 130, 246, 0.05)' },
        ]),
      },
      symbol: 'diamond',
      symbolSize: 10,
      itemStyle: {
        color: '#3b82f6',
        borderColor: '#fff',
        borderWidth: 2,
      },
      emphasis: {
        itemStyle: {
          color: '#1d4ed8',
          borderColor: '#fff',
          borderWidth: 3,
          shadowBlur: 10,
          shadowColor: 'rgba(59, 130, 246, 0.5)',
        },
      },
      markPoint: {
        data: [
          { type: 'max', name: '巅峰', symbol: 'pin', symbolSize: 60 },
          { type: 'min', name: '起点', symbol: 'pin', symbolSize: 60 },
        ],
        itemStyle: {
          color: '#16a34a',
        },
        label: {
          color: '#fff',
          fontWeight: 'bold',
        },
      },
      animationDelay: 500,
    },
  ],
  animationEasing: 'elasticOut',
};
