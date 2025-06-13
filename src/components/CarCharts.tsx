'use client';

import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { CarOutlined, TrophyOutlined, TeamOutlined, GlobalOutlined } from '@ant-design/icons';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import {
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
} from 'echarts/components';
import {
  CanvasRenderer,
} from 'echarts/renderers';
import { motion } from 'framer-motion';

// 注册 ECharts 组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  CanvasRenderer,
]);

const CarCharts: React.FC = () => {
  // 销量数据
  const salesOption = {
    title: {
      text: '月度销量趋势',
      textStyle: {
        color: '#ffffff',
        fontSize: 18,
      },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.8)',
      borderColor: '#4ECDC4',
      textStyle: {
        color: '#ffffff',
      },
    },
    legend: {
      data: ['轿车', 'SUV', '跑车'],
      textStyle: {
        color: '#ffffff',
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
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLine: {
        lineStyle: {
          color: '#4ECDC4',
        },
      },
      axisLabel: {
        color: '#ffffff',
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#4ECDC4',
        },
      },
      axisLabel: {
        color: '#ffffff',
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
    },
    series: [
      {
        name: '轿车',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          color: '#FF6B6B',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255, 107, 107, 0.8)',
            },
            {
              offset: 1,
              color: 'rgba(255, 107, 107, 0.1)',
            },
          ]),
        },
        data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330],
      },
      {
        name: 'SUV',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          color: '#4ECDC4',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(78, 205, 196, 0.8)',
            },
            {
              offset: 1,
              color: 'rgba(78, 205, 196, 0.1)',
            },
          ]),
        },
        data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149],
      },
      {
        name: '跑车',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          color: '#45B7D1',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(69, 183, 209, 0.8)',
            },
            {
              offset: 1,
              color: 'rgba(69, 183, 209, 0.1)',
            },
          ]),
        },
        data: [150, 232, 201, 154, 190, 330, 410, 320, 332, 301, 334, 390],
      },
    ],
  };

  // 品牌分布饼图
  const brandOption = {
    title: {
      text: '品牌市场份额',
      left: 'center',
      textStyle: {
        color: '#ffffff',
        fontSize: 18,
      },
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0,0,0,0.8)',
      borderColor: '#4ECDC4',
      textStyle: {
        color: '#ffffff',
      },
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        color: '#ffffff',
      },
    },
    series: [
      {
        name: '市场份额',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '奔驰' },
          { value: 735, name: '宝马' },
          { value: 580, name: '奥迪' },
          { value: 484, name: '特斯拉' },
          { value: 300, name: '保时捷' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          color: '#ffffff',
        },
      },
    ],
  };

  // 性能雷达图
  const performanceOption = {
    title: {
      text: '车型性能对比',
      textStyle: {
        color: '#ffffff',
        fontSize: 18,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.8)',
      borderColor: '#4ECDC4',
      textStyle: {
        color: '#ffffff',
      },
    },
    legend: {
      data: ['Model S', 'AMG GT', 'M3'],
      textStyle: {
        color: '#ffffff',
      },
    },
    radar: {
      indicator: [
        { name: '加速', max: 10 },
        { name: '操控', max: 10 },
        { name: '舒适', max: 10 },
        { name: '燃油经济性', max: 10 },
        { name: '安全', max: 10 },
        { name: '科技', max: 10 },
      ],
      axisName: {
        color: '#ffffff',
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.5)',
        },
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
    series: [
      {
        name: '性能对比',
        type: 'radar',
        data: [
          {
            value: [9, 8, 7, 9, 8, 10],
            name: 'Model S',
            areaStyle: {
              color: 'rgba(255, 107, 107, 0.3)',
            },
          },
          {
            value: [10, 9, 6, 5, 7, 8],
            name: 'AMG GT',
            areaStyle: {
              color: 'rgba(78, 205, 196, 0.3)',
            },
          },
          {
            value: [8, 9, 7, 6, 8, 7],
            name: 'M3',
            areaStyle: {
              color: 'rgba(69, 183, 209, 0.3)',
            },
          },
        ],
      },
    ],
  };

  const statisticCards = [
    {
      title: '总销量',
      value: 152340,
      icon: <CarOutlined />,
      color: '#FF6B6B',
      suffix: '台',
    },
    {
      title: '品牌数量',
      value: 25,
      icon: <TrophyOutlined />,
      color: '#4ECDC4',
      suffix: '个',
    },
    {
      title: '全球用户',
      value: 892156,
      icon: <TeamOutlined />,
      color: '#45B7D1',
      suffix: '人',
    },
    {
      title: '覆盖国家',
      value: 89,
      icon: <GlobalOutlined />,
      color: '#96CEB4',
      suffix: '个',
    },
  ];

  return (
    <div className="py-20 px-4 md:px-8 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            数据洞察
          </h2>
          <p className="text-gray-300 text-lg">
            深入了解汽车市场趋势与品牌表现
          </p>
        </motion.div>

        {/* 统计卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Row gutter={[16, 16]} className="mb-8">
            {statisticCards.map((card, index) => (
              <Col xs={12} sm={6} key={index}>
                <Card className="glass-effect text-center hover:scale-105 transition-transform duration-300">
                  <div style={{ color: card.color, fontSize: '2rem', marginBottom: '8px' }}>
                    {card.icon}
                  </div>
                  <Statistic
                    title={<span style={{ color: 'white' }}>{card.title}</span>}
                    value={card.value}
                    suffix={card.suffix}
                    valueStyle={{ color: card.color, fontSize: '1.5rem' }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* 图表区域 */}
        <Row gutter={[16, 16]}>
          {/* 销量趋势图 */}
          <Col xs={24} lg={16}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="glass-effect">
                <ReactEChartsCore
                  echarts={echarts}
                  option={salesOption}
                  style={{ height: '400px' }}
                />
              </Card>
            </motion.div>
          </Col>

          {/* 品牌分布饼图 */}
          <Col xs={24} lg={8}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="glass-effect">
                <ReactEChartsCore
                  echarts={echarts}
                  option={brandOption}
                  style={{ height: '400px' }}
                />
              </Card>
            </motion.div>
          </Col>

          {/* 性能雷达图 */}
          <Col xs={24}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="glass-effect">
                <ReactEChartsCore
                  echarts={echarts}
                  option={performanceOption}
                  style={{ height: '500px' }}
                />
              </Card>
            </motion.div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CarCharts; 