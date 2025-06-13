'use client';

import React from 'react';
import { Typography, Row, Col, Card, Timeline, Statistic, Space } from 'antd';
import { 
  CarOutlined, 
  TrophyOutlined, 
  TeamOutlined, 
  GlobalOutlined,
  HistoryOutlined,
  StarOutlined 
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Paragraph } = Typography;

export default function AboutPage() {
  const achievements = [
    {
      title: '全球销量',
      value: 892156,
      suffix: '台',
      icon: <CarOutlined />,
      color: '#FF6B6B'
    },
    {
      title: '服务国家',
      value: 89,
      suffix: '个',
      icon: <GlobalOutlined />,
      color: '#4ECDC4'
    },
    {
      title: '团队成员',
      value: 12580,
      suffix: '人',
      icon: <TeamOutlined />,
      color: '#45B7D1'
    },
    {
      title: '获得奖项',
      value: 156,
      suffix: '个',
      icon: <TrophyOutlined />,
      color: '#96CEB4'
    }
  ];

  const timeline = [
    {
      color: '#FF6B6B',
      children: (
        <div>
          <h4 className="text-white mb-2">2010年 - 公司成立</h4>
          <p className="text-gray-300">在上海成立，专注豪华汽车销售</p>
        </div>
      ),
    },
    {
      color: '#4ECDC4',
      children: (
        <div>
          <h4 className="text-white mb-2">2015年 - 国际化扩张</h4>
          <p className="text-gray-300">业务拓展至全球50个国家</p>
        </div>
      ),
    },
    {
      color: '#45B7D1',
      children: (
        <div>
          <h4 className="text-white mb-2">2018年 - 技术革新</h4>
          <p className="text-gray-300">引入AI智能选车系统</p>
        </div>
      ),
    },
    {
      color: '#96CEB4',
      children: (
        <div>
          <h4 className="text-white mb-2">2020年 - 电动转型</h4>
          <p className="text-gray-300">全面布局新能源汽车市场</p>
        </div>
      ),
    },
    {
      color: '#FFD93D',
      children: (
        <div>
          <h4 className="text-white mb-2">2024年 - 行业领先</h4>
          <p className="text-gray-300">成为全球顶级汽车销售平台</p>
        </div>
      ),
    },
  ];

  const values = [
    {
      icon: '🚀',
      title: '创新驱动',
      description: '持续推动汽车科技创新，引领行业发展'
    },
    {
      icon: '🌟',
      title: '品质至上',
      description: '严格把控每一款车型的品质标准'
    },
    {
      icon: '🤝',
      title: '客户为本',
      description: '以客户需求为中心，提供最优质的服务'
    },
    {
      icon: '🌍',
      title: '可持续发展',
      description: '推广绿色出行，共建美好未来'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* 公司介绍 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <Title level={1} className="text-white mb-6 text-4xl md:text-6xl">
            关于<span className="gradient-text">极速汽车</span>
          </Title>
          <Paragraph className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            极速汽车成立于2010年，是全球领先的豪华汽车销售平台。我们致力于为全球客户提供最顶级的汽车产品和服务体验，
            从经典豪华轿车到前沿电动超跑，每一款车型都代表着工艺与性能的极致追求。
          </Paragraph>
        </motion.div>

        {/* 成就数据 */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <Row gutter={[24, 24]}>
            {achievements.map((item, index) => (
              <Col xs={12} md={6} key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Card className="glass-effect text-center">
                    <div className="text-4xl mb-3" style={{ color: item.color }}>
                      {item.icon}
                    </div>
                    <Statistic
                      title={<span className="text-white">{item.title}</span>}
                      value={item.value}
                      suffix={item.suffix}
                      valueStyle={{ color: item.color, fontSize: '2rem' }}
                    />
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.section>

        {/* 发展历程 */}
        <Row gutter={[48, 48]} className="mb-20">
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="glass-effect h-full">
                <div className="flex items-center mb-6">
                  <HistoryOutlined className="text-3xl mr-3" style={{ color: '#4ECDC4' }} />
                  <Title level={2} className="text-white m-0">发展历程</Title>
                </div>
                <Timeline items={timeline} className="custom-timeline" />
              </Card>
            </motion.div>
          </Col>

          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="glass-effect h-full">
                <div className="flex items-center mb-6">
                  <StarOutlined className="text-3xl mr-3" style={{ color: '#FF6B6B' }} />
                  <Title level={2} className="text-white m-0">核心价值</Title>
                </div>
                <Space direction="vertical" size="large" className="w-full">
                  {values.map((value, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 10 }}
                      className="flex items-start space-x-4 p-4 rounded-lg bg-gray-800/50"
                    >
                      <div className="text-3xl flex-shrink-0">{value.icon}</div>
                      <div>
                        <Title level={4} className="text-white mb-2">{value.title}</Title>
                        <Paragraph className="text-gray-300 m-0">
                          {value.description}
                        </Paragraph>
                      </div>
                    </motion.div>
                  ))}
                </Space>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* 企业愿景 */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="glass-effect">
            <Title level={2} className="text-white mb-6">企业愿景</Title>
            <Paragraph className="text-gray-300 text-lg mb-6 max-w-4xl mx-auto">
              成为全球最受信赖的豪华汽车销售平台，通过持续创新和卓越服务，
              让每一位客户都能找到最适合自己的完美座驾，共同迈向更美好的出行未来。
            </Paragraph>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-6xl mb-4">🎯</div>
                <Title level={4} className="text-white">使命必达</Title>
                <Paragraph className="text-gray-300">
                  为每位客户提供最佳的汽车购买体验
                </Paragraph>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4">🌟</div>
                <Title level={4} className="text-white">追求卓越</Title>
                <Paragraph className="text-gray-300">
                  在服务质量和产品品质上永不妥协
                </Paragraph>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4">🚀</div>
                <Title level={4} className="text-white">引领未来</Title>
                <Paragraph className="text-gray-300">
                  持续推动汽车行业的创新发展
                </Paragraph>
              </div>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
} 