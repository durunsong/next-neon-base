import * as echarts from 'echarts';

// 情侣见面次数统计（柱状图）
export const meetingsOption: echarts.EChartsOption = {
  title: {
    text: '💕 每月见面次数',
    textStyle: {
      color: '#ff6b9d',
      fontSize: 18,
      fontWeight: 'bold',
    },
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#ff6b9d',
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
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    axisLine: {
      lineStyle: {
        color: '#ff6b9d',
      },
    },
    axisLabel: {
      color: '#666',
    },
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#ff6b9d',
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
      name: '见面次数',
      type: 'bar',
      data: [8, 12, 15, 10, 18, 22, 25, 20, 16, 14, 11, 9],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#ff6b9d' },
          { offset: 1, color: '#ffc0cb' },
        ]),
        borderRadius: [4, 4, 0, 0],
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#ff1493' },
            { offset: 1, color: '#ff69b4' },
          ]),
        },
      },
      animationDelay: (idx: number) => idx * 100,
    },
  ],
  animationEasing: 'elasticOut',
  animationDelayUpdate: (idx: number) => idx * 5,
};

// 拍照记录天数（折线图）
export const photosOption: echarts.EChartsOption = {
  title: {
    text: '📸 一起拍照的日子',
    textStyle: {
      color: '#6b9aff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#6b9aff',
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
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    axisLine: {
      lineStyle: {
        color: '#6b9aff',
      },
    },
    axisLabel: {
      color: '#666',
    },
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#6b9aff',
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
      name: '拍照次数',
      type: 'line',
      smooth: true,
      data: [5, 8, 12, 15, 20, 35, 28],
      lineStyle: {
        width: 4,
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#6b9aff' },
          { offset: 1, color: '#9d7afe' },
        ]),
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(107, 154, 255, 0.6)' },
          { offset: 1, color: 'rgba(107, 154, 255, 0.1)' },
        ]),
      },
      symbol: 'circle',
      symbolSize: 8,
      itemStyle: {
        color: '#6b9aff',
        borderColor: '#fff',
        borderWidth: 2,
      },
      emphasis: {
        itemStyle: {
          color: '#4338ca',
          borderColor: '#fff',
          borderWidth: 3,
        },
      },
      animationDelay: 300,
    },
  ],
  animationEasing: 'cubicOut',
};

// 消息互动频率（热力图）
export const messagesOption: echarts.EChartsOption = {
  title: {
    text: '💬 消息互动热力图',
    textStyle: {
      color: '#8b5cf6',
      fontSize: 18,
      fontWeight: 'bold',
    },
    left: 'center',
  },
  tooltip: {
    position: 'top',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#8b5cf6',
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
    max: 50,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: '5%',
    inRange: {
      color: ['#f3e8ff', '#8b5cf6', '#6d28d9'],
    },
    textStyle: {
      color: '#666',
    },
  },
  series: [
    {
      name: '消息数量',
      type: 'heatmap',
      data: [
        [0, 0, 5],
        [1, 0, 12],
        [2, 0, 8],
        [3, 0, 15],
        [4, 0, 25],
        [5, 0, 35],
        [6, 0, 40],
        [7, 0, 30],
        [8, 0, 20],
        [9, 0, 35],
        [10, 0, 45],
        [11, 0, 25],
        [0, 1, 8],
        [1, 1, 18],
        [2, 1, 12],
        [3, 1, 20],
        [4, 1, 30],
        [5, 1, 40],
        [6, 1, 45],
        [7, 1, 35],
        [8, 1, 25],
        [9, 1, 40],
        [10, 1, 50],
        [11, 1, 30],
        [0, 2, 6],
        [1, 2, 15],
        [2, 2, 10],
        [3, 2, 18],
        [4, 2, 28],
        [5, 2, 38],
        [6, 2, 42],
        [7, 2, 32],
        [8, 2, 22],
        [9, 2, 38],
        [10, 2, 48],
        [11, 2, 28],
        [0, 3, 4],
        [1, 3, 10],
        [2, 3, 6],
        [3, 3, 12],
        [4, 3, 22],
        [5, 3, 32],
        [6, 3, 38],
        [7, 3, 28],
        [8, 3, 18],
        [9, 3, 32],
        [10, 3, 42],
        [11, 3, 22],
        [0, 4, 3],
        [1, 4, 8],
        [2, 4, 4],
        [3, 4, 10],
        [4, 4, 20],
        [5, 4, 30],
        [6, 4, 35],
        [7, 4, 25],
        [8, 4, 15],
        [9, 4, 30],
        [10, 4, 40],
        [11, 4, 20],
        [0, 5, 10],
        [1, 5, 20],
        [2, 5, 15],
        [3, 5, 25],
        [4, 5, 35],
        [5, 5, 45],
        [6, 5, 50],
        [7, 5, 40],
        [8, 5, 30],
        [9, 5, 45],
        [10, 5, 55],
        [11, 5, 35],
        [0, 6, 12],
        [1, 6, 22],
        [2, 6, 18],
        [3, 6, 28],
        [4, 6, 38],
        [5, 6, 48],
        [6, 6, 52],
        [7, 6, 42],
        [8, 6, 32],
        [9, 6, 48],
        [10, 6, 58],
        [11, 6, 38],
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

// 感情指数仪表盘
export const loveIndexOption: echarts.EChartsOption = {
  title: {
    text: '❤️ 感情指数',
    textStyle: {
      color: '#e11d48',
      fontSize: 18,
      fontWeight: 'bold',
    },
    left: 'center',
    top: '10%',
  },
  series: [
    {
      name: '感情指数',
      type: 'gauge',
      radius: '80%',
      center: ['50%', '55%'],
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 100,
      splitNumber: 10,
      itemStyle: {
        color: '#e11d48',
      },
      progress: {
        show: true,
        width: 15,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#fecaca' },
            { offset: 0.5, color: '#f87171' },
            { offset: 1, color: '#e11d48' },
          ]),
        },
      },
      pointer: {
        show: true,
        length: '60%',
        width: 6,
        itemStyle: {
          color: '#e11d48',
        },
      },
      axisLine: {
        lineStyle: {
          width: 15,
          color: [
            [0.3, '#ff6b6b'],
            [0.7, '#ffa726'],
            [1, '#66bb6a'],
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
        formatter: '{value}%\n💕',
        color: '#e11d48',
        fontSize: 20,
        fontWeight: 'bold',
        offsetCenter: [0, '70%'],
      },
      data: [
        {
          value: 88,
          name: '今日指数',
        },
      ],
      animationDuration: 2000,
      animationEasing: 'cubicInOut',
    },
  ],
};

// 恋爱里程碑时间线
export const milestonesOption: echarts.EChartsOption = {
  title: {
    text: '💝 恋爱里程碑',
    textStyle: {
      color: '#f59e0b',
      fontSize: 18,
      fontWeight: 'bold',
    },
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#f59e0b',
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
      '相识',
      '表白',
      '第一次约会',
      '确定关系',
      '第一次吵架',
      '和好',
      '一起旅行',
      '见家长',
      '周年纪念',
    ],
    axisLine: {
      lineStyle: {
        color: '#f59e0b',
      },
    },
    axisLabel: {
      color: '#666',
      rotate: 45,
    },
  },
  yAxis: {
    type: 'value',
    name: '幸福指数',
    axisLine: {
      lineStyle: {
        color: '#f59e0b',
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
      name: '幸福指数',
      type: 'line',
      smooth: true,
      data: [60, 85, 75, 95, 30, 88, 92, 78, 98],
      lineStyle: {
        width: 4,
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#f59e0b' },
          { offset: 0.5, color: '#f97316' },
          { offset: 1, color: '#ea580c' },
        ]),
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(245, 158, 11, 0.3)' },
          { offset: 1, color: 'rgba(245, 158, 11, 0.05)' },
        ]),
      },
      symbol: 'diamond',
      symbolSize: 10,
      itemStyle: {
        color: '#f59e0b',
        borderColor: '#fff',
        borderWidth: 2,
      },
      emphasis: {
        itemStyle: {
          color: '#d97706',
          borderColor: '#fff',
          borderWidth: 3,
          shadowBlur: 10,
          shadowColor: 'rgba(245, 158, 11, 0.5)',
        },
      },
      markPoint: {
        data: [
          { type: 'max', name: '最高点', symbol: 'pin', symbolSize: 60 },
          { type: 'min', name: '最低点', symbol: 'pin', symbolSize: 60 },
        ],
        itemStyle: {
          color: '#dc2626',
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
