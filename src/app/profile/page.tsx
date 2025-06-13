'use client';

import React, { useState } from 'react';
import { 
  Card, 
  Avatar, 
  Typography, 
  Row, 
  Col, 
  Statistic, 
  Button, 
  Form, 
  Input, 
  Upload, 
  message, 
  Tag,
  Timeline,
  Progress,
  Space
} from 'antd';
import { 
  UserOutlined, 
  EditOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  CalendarOutlined, 
  LoginOutlined, 
  SettingOutlined,
  CameraOutlined,
  TrophyOutlined,
  StarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

export default function ProfilePage() {
  const { user, isAuthenticated, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);

  // 如果未登录，显示登录提示
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mb-8">
            <UserOutlined className="text-6xl text-gray-400 mb-4" />
            <Title level={3} className="text-gray-600">请先登录</Title>
            <Paragraph className="text-gray-500">
              您需要登录后才能查看个人中心
            </Paragraph>
          </div>
          <Link href="/">
            <Button type="primary" size="large" icon={<LoginOutlined />}>
              返回首页
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // 格式化日期
  const formatDate = (dateString?: string) => {
    if (!dateString) return '未知';
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 计算注册天数
  const getRegistrationDays = () => {
    if (!user.created_at) return 0;
    const registrationDate = new Date(user.created_at);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - registrationDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // 头像上传处理
  const handleAvatarUpload = async (file: File) => {
    setUploading(true);
    try {
      // 这里应该实现真实的文件上传逻辑
      // 目前只是模拟
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const fakeUrl = URL.createObjectURL(file);
      updateUser({ avatar_url: fakeUrl });
      message.success('头像更新成功！');
    } catch {
      message.error('头像上传失败');
    } finally {
      setUploading(false);
    }
  };

  // 个人信息更新
  const handleUpdateProfile = async (values: { username?: string; email?: string; phone?: string }) => {
    try {
      updateUser(values);
      setEditing(false);
      message.success('个人信息更新成功！');
    } catch {
      message.error('更新失败，请稍后重试');
    }
  };

  // 用户等级计算
  const getUserLevel = () => {
    const loginCount = user.login_count || 0;
    if (loginCount < 5) return { level: '新手', color: '#87d068', progress: (loginCount / 5) * 100 };
    if (loginCount < 20) return { level: '熟练', color: '#108ee9', progress: ((loginCount - 5) / 15) * 100 };
    if (loginCount < 50) return { level: '专家', color: '#f50', progress: ((loginCount - 20) / 30) * 100 };
    return { level: '大师', color: '#722ed1', progress: 100 };
  };

  const userLevel = getUserLevel();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-8">
      <div className="max-w-6xl mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 顶部个人信息卡片 */}
          <Card className="mb-6 shadow-lg border-0">
            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} sm={8} md={6} className="text-center">
                <div className="relative inline-block">
                  <Avatar
                    size={120}
                    src={user.avatar_url}
                    icon={<UserOutlined />}
                    className="border-4 border-white shadow-lg"
                  />
                  <Upload
                    accept="image/*"
                    showUploadList={false}
                    beforeUpload={(file) => {
                      handleAvatarUpload(file);
                      return false;
                    }}
                  >
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<CameraOutlined />}
                      className="absolute -bottom-2 -right-2"
                      loading={uploading}
                      size="small"
                    />
                  </Upload>
                </div>
                <div className="mt-4">
                  <Tag color={userLevel.color} className="text-sm">
                    {userLevel.level}用户
                  </Tag>
                </div>
              </Col>
              
              <Col xs={24} sm={16} md={18}>
                <div className="space-y-4">
                  {editing ? (
                    <Form
                      form={form}
                      initialValues={{
                        username: user.username,
                        email: user.email,
                        phone: user.phone
                      }}
                      onFinish={handleUpdateProfile}
                      layout="vertical"
                    >
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            name="username"
                            label="用户名"
                            rules={[{ required: true, message: '请输入用户名' }]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            name="email"
                            label="邮箱"
                            rules={[{ type: 'email', message: '请输入有效邮箱' }]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item
                        name="phone"
                        label="手机号"
                        rules={[{ pattern: /^1[3-9]\d{9}$/, message: '请输入有效手机号' }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item>
                        <Space>
                          <Button type="primary" htmlType="submit">
                            保存
                          </Button>
                          <Button onClick={() => setEditing(false)}>
                            取消
                          </Button>
                        </Space>
                      </Form.Item>
                    </Form>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <Title level={2} className="mb-0">
                          {user.username}
                          {user.is_verified && (
                            <CheckCircleOutlined className="text-green-500 ml-2" />
                          )}
                        </Title>
                        <Button
                          icon={<EditOutlined />}
                          onClick={() => setEditing(true)}
                        >
                          编辑
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <MailOutlined className="mr-2" />
                          <span>{user.email || '未设置邮箱'}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <PhoneOutlined className="mr-2" />
                          <span>{user.phone || '未设置手机号'}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <CalendarOutlined className="mr-2" />
                          <span>注册时间：{formatDate(user.created_at)}</span>
                        </div>
                      </div>

                      {/* 用户等级进度 */}
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">用户等级进度</span>
                          <span className="text-sm font-medium" style={{ color: userLevel.color }}>
                            {userLevel.level}
                          </span>
                        </div>
                        <Progress
                          percent={userLevel.progress}
                          strokeColor={userLevel.color}
                          size="small"
                        />
                      </div>
                    </>
                  )}
                </div>
              </Col>
            </Row>
          </Card>

          {/* 统计数据 */}
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={12} sm={6}>
              <Card className="text-center shadow-md">
                <Statistic
                  title="注册天数"
                  value={getRegistrationDays()}
                  suffix="天"
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<CalendarOutlined />}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="text-center shadow-md">
                <Statistic
                  title="登录次数"
                  value={user.login_count || 0}
                  suffix="次"
                  valueStyle={{ color: '#1890ff' }}
                  prefix={<LoginOutlined />}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="text-center shadow-md">
                <Statistic
                  title="账户状态"
                  value={user.is_active ? "正常" : "禁用"}
                  valueStyle={{ color: user.is_active ? '#3f8600' : '#cf1322' }}
                  prefix={user.is_active ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="text-center shadow-md">
                <Statistic
                  title="用户等级"
                  value={userLevel.level}
                  valueStyle={{ color: userLevel.color }}
                  prefix={<TrophyOutlined />}
                />
              </Card>
            </Col>
          </Row>

          {/* 详细信息和活动记录 */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="账户详情" className="shadow-md" extra={<SettingOutlined />}>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Text type="secondary">用户ID:</Text>
                    <Text code>{user.id}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text type="secondary">账户角色:</Text>
                    <Tag color="blue">{user.role || 'user'}</Tag>
                  </div>
                  <div className="flex justify-between">
                    <Text type="secondary">邮箱验证:</Text>
                    <Tag color={user.is_verified ? 'green' : 'orange'}>
                      {user.is_verified ? '已验证' : '未验证'}
                    </Tag>
                  </div>
                  <div className="flex justify-between">
                    <Text type="secondary">最后登录:</Text>
                    <Text>{formatDate(user.last_login_at)}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text type="secondary">注册来源:</Text>
                    <Text>网站注册</Text>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="最近活动" className="shadow-md" extra={<StarOutlined />}>
                <Timeline>
                  <Timeline.Item color="green">
                    <div>
                      <Text strong>账户登录</Text>
                      <br />
                      <Text type="secondary">{formatDate(user.last_login_at)}</Text>
                    </div>
                  </Timeline.Item>
                  <Timeline.Item color="blue">
                    <div>
                      <Text strong>信息更新</Text>
                      <br />
                      <Text type="secondary">{formatDate(user.last_login_at)}</Text>
                    </div>
                  </Timeline.Item>
                  <Timeline.Item>
                    <div>
                      <Text strong>账户创建</Text>
                      <br />
                      <Text type="secondary">{formatDate(user.created_at)}</Text>
                    </div>
                  </Timeline.Item>
                </Timeline>
              </Card>
            </Col>
          </Row>

          {/* 快速操作 */}
          <Card title="快速操作" className="mt-6 shadow-md">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Button type="primary" block size="large" icon={<EditOutlined />}>
                  编辑个人资料
                </Button>
              </Col>
              <Col xs={24} sm={8}>
                <Button block size="large" icon={<SettingOutlined />}>
                  账户设置
                </Button>
              </Col>
              <Col xs={24} sm={8}>
                <Button block size="large" icon={<StarOutlined />}>
                  我的收藏
                </Button>
              </Col>
            </Row>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 