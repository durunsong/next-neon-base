'use client';

import React from 'react';
import { Button, Row, Col, Card, Typography, Space } from 'antd';
import { 
  CarOutlined, 
  ThunderboltOutlined, 
  SafetyOutlined, 
  GlobalOutlined,
  RocketOutlined,
  StarOutlined 
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CarImageViewer from '@/components/CarImageViewer';
import CarCharts from '@/components/CarCharts';

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const features = [
    {
      icon: <ThunderboltOutlined />,
      title: '极速性能',
      description: '顶级引擎技术，0-100km/h加速仅需2.8秒',
      color: '#FF6B6B',
    },
    {
      icon: <SafetyOutlined />,
      title: '安全保障',
      description: '五星安全评级，全方位主动安全系统',
      color: '#4ECDC4',
    },
    {
      icon: <GlobalOutlined />,
      title: '全球服务',
      description: '89个国家和地区，24小时专业服务',
      color: '#45B7D1',
    },
    {
      icon: <RocketOutlined />,
      title: '创新科技',
      description: 'AI智能驾驶，引领未来出行方式',
      color: '#96CEB4',
    },
  ];

  const carModels = [
    {
      name: '极速GT',
      price: '￥899,000',
      image: '🏎️',
      specs: ['V8引擎', '650马力', '2.8秒破百'],
    },
    {
      name: '豪华SUV',
      price: '￥1,299,000',
      image: '🚙',
      specs: ['混动系统', '480马力', '全时四驱'],
    },
    {
      name: '电动超跑',
      price: '￥1,599,000',
      image: '⚡',
      specs: ['纯电动', '1000马力', '2.1秒破百'],
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section with Car Image Viewer */}
      <section className="hero-section">
        <CarImageViewer className="car-image-viewer" />
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-4xl mx-auto px-4"
          >
            <Title 
              level={1} 
              className="text-white text-center mb-6"
              style={{ 
                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                lineHeight: '1.1',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              <span className="gradient-text">极速汽车</span>
            </Title>
            <Paragraph 
              className="text-white text-center text-lg md:text-xl mb-8 opacity-90"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
            >
              驾驭未来，超越极限。全球领先的豪华汽车销售平台，为您提供最顶级的驾驶体验。
            </Paragraph>
            <div className="text-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ display: 'inline-block' }}
              >
                <Button 
                  type="primary" 
                  size="large" 
                  className="mr-4 px-8 py-6 text-lg font-semibold"
                  style={{ height: 'auto' }}
                >
                  <Link href="/cars">
                    <CarOutlined className="mr-2" />
                    探索车型
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ display: 'inline-block' }}
              >
                <Button 
                  size="large" 
                  className="glass-effect text-white border-white hover:bg-white hover:text-black px-8 py-6 text-lg"
                  style={{ height: 'auto' }}
                >
                  <Link href="/about">了解更多</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Title level={2} className="text-white mb-4 text-4xl md:text-5xl">
              为什么选择<span className="gradient-text">极速汽车</span>
            </Title>
            <Paragraph className="text-gray-300 text-lg max-w-2xl mx-auto">
              我们不仅仅销售汽车，更是为您打造极致的驾驶体验和生活方式
            </Paragraph>
          </motion.div>

          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <Card 
                    className="glass-effect text-center h-full hover:shadow-2xl transition-all duration-300"
                    variant="borderless"
                  >
                    <div 
                      className="text-6xl mb-4 floating"
                      style={{ color: feature.color }}
                    >
                      {feature.icon}
                    </div>
                    <Title level={4} className="text-white mb-3">
                      {feature.title}
                    </Title>
                    <Paragraph className="text-gray-300">
                      {feature.description}
                    </Paragraph>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Car Models Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Title level={2} className="text-white mb-4 text-4xl md:text-5xl">
              <span className="gradient-text">精选车型</span>
            </Title>
            <Paragraph className="text-gray-300 text-lg max-w-2xl mx-auto">
              每一款车都是工艺与性能的完美结合
            </Paragraph>
          </motion.div>

          <Row gutter={[24, 24]}>
            {carModels.map((car, index) => (
              <Col xs={24} md={8} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card 
                    className="glass-effect text-center h-full hover:shadow-2xl transition-all duration-300"
                    variant="borderless"
                  >
                    <div className="text-8xl mb-4">{car.image}</div>
                    <Title level={3} className="text-white mb-2">
                      {car.name}
                    </Title>
                    <Title level={4} className="mb-4" style={{ color: '#FF6B6B' }}>
                      {car.price}
                    </Title>
                    <Space direction="vertical" size="small" className="mb-6">
                      {car.specs.map((spec, idx) => (
                        <div key={idx} className="text-gray-300">
                          <StarOutlined className="mr-2" style={{ color: '#4ECDC4' }} />
                          {spec}
                        </div>
                      ))}
                    </Space>
                    <Button 
                      type="primary" 
                      block 
                      size="large"
                      className="mt-4"
                    >
                      <Link href={`/cars/${car.name.toLowerCase()}`}>
                        了解详情
                      </Link>
                    </Button>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Charts Section */}
      <CarCharts />

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Title level={2} className="text-white mb-6 text-4xl md:text-5xl">
              准备好开启您的<span className="text-yellow-300">极速之旅</span>了吗？
            </Title>
            <Paragraph className="text-white text-lg mb-8 opacity-90">
              立即联系我们的专业团队，为您量身定制最适合的豪华汽车方案
            </Paragraph>
            <Space size="large">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  type="primary" 
                  size="large" 
                  className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg font-semibold border-none"
                  style={{ height: 'auto' }}
                >
                  <Link href="/contact">
                    立即咨询
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="large" 
                  className="glass-effect text-white border-white hover:bg-white hover:text-black px-8 py-6 text-lg"
                  style={{ height: 'auto' }}
                >
                  <Link href="/test-drive">
                    预约试驾
                  </Link>
                </Button>
              </motion.div>
            </Space>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
