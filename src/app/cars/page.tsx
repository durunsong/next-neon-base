'use client';

import React from 'react';
import { Card, Row, Col, Typography, Button, Tag, Space } from 'antd';
import { CarOutlined, ThunderboltOutlined, SafetyOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

export default function CarsPage() {
  const cars = [
    {
      id: 1,
      name: '极速GT 2024',
      price: '￥899,000',
      image: '🏎️',
      brand: '极速汽车',
      type: '跑车',
      engine: 'V8 4.0T',
      power: '650马力',
      acceleration: '2.8秒',
      features: ['碳纤维车身', '主动空气动力学', 'Brembo制动', '米其林轮胎'],
      description: '纯正的驾驶机器，为极致性能而生。'
    },
    {
      id: 2,
      name: '豪华SUV 2024',
      price: '￥1,299,000',
      image: '🚙',
      brand: '极速汽车',
      type: 'SUV',
      engine: 'V6混动',
      power: '480马力',
      acceleration: '4.2秒',
      features: ['全时四驱', '空气悬挂', '智能驾驶', '豪华内饰'],
      description: '豪华与性能的完美平衡，适合各种路况。'
    },
    {
      id: 3,
      name: '电动超跑 2024',
      price: '￥1,599,000',
      image: '⚡',
      brand: '极速汽车',
      type: '电动超跑',
      engine: '纯电动',
      power: '1000马力',
      acceleration: '2.1秒',
      features: ['三电机', '800V充电', '500km续航', '自动驾驶'],
      description: '电动时代的性能标杆，零排放的极速体验。'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Title level={1} className="text-white mb-4 text-4xl md:text-6xl">
            <span className="gradient-text">车型展示</span>
          </Title>
          <Paragraph className="text-gray-300 text-lg max-w-2xl mx-auto">
            探索我们精心打造的每一款车型，每一辆都代表着工艺与性能的极致追求
          </Paragraph>
        </motion.div>

        <Row gutter={[24, 24]}>
          {cars.map((car, index) => (
            <Col xs={24} lg={8} key={car.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="h-full"
              >
                <Card 
                  className="glass-effect h-full hover:shadow-2xl transition-all duration-300"
                  bordered={false}
                  cover={
                    <div className="p-8 text-center bg-gradient-to-br from-gray-800 to-gray-900">
                      <div className="text-9xl mb-4">{car.image}</div>
                      <Title level={3} className="text-white mb-2">
                        {car.name}
                      </Title>
                      <Title level={4} style={{ color: '#FF6B6B' }}>
                        {car.price}
                      </Title>
                    </div>
                  }
                >
                  <div className="p-2">
                    <Space wrap className="mb-4">
                      <Tag color="blue">{car.brand}</Tag>
                      <Tag color="green">{car.type}</Tag>
                    </Space>
                    
                    <Paragraph className="text-gray-300 mb-4">
                      {car.description}
                    </Paragraph>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-300">
                        <CarOutlined className="mr-2" style={{ color: '#4ECDC4' }} />
                        <span>引擎: {car.engine}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <ThunderboltOutlined className="mr-2" style={{ color: '#4ECDC4' }} />
                        <span>功率: {car.power}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <SafetyOutlined className="mr-2" style={{ color: '#4ECDC4' }} />
                        <span>加速: 0-100km/h {car.acceleration}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Title level={5} className="text-white mb-2">主要特性</Title>
                      <Space wrap>
                        {car.features.map((feature, idx) => (
                          <Tag key={idx} color="cyan">{feature}</Tag>
                        ))}
                      </Space>
                    </div>

                    <Space className="w-full justify-between">
                      <Button type="primary" size="large">
                        <Link href={`/cars/${car.id}`}>查看详情</Link>
                      </Button>
                      <Button size="large" className="glass-effect text-white border-white">
                        预约试驾
                      </Button>
                    </Space>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
} 