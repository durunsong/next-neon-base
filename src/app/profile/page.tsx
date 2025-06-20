'use client';

import { MailOutlined, PhoneOutlined, SaveOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Form, Input, Row, Spin, Typography, message } from 'antd';

import React, { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import AvatarUpload from '../../components/AvatarUpload';
import { useAuthStore } from '../../store/authStore';

const { Title, Text } = Typography;

interface UserProfile {
  id: string;
  username: string;
  email?: string | null;
  phone?: string | null;
  avatar_url?: string | null;
  role?: string | null;
  created_at: string;
  login_count: number | null;
}

export default function ProfilePage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userInfo, setUserInfo] = useState<UserProfile | null>(null);
  const router = useRouter();
  const { user, logout, initAuth, isAuthenticated, isInitialized, updateUser } = useAuthStore();

  // 获取用户信息
  const fetchUserInfo = useCallback(async () => {
    try {
      if (!user?.id || !isAuthenticated) {
        message.error('未登录');
        router.push('/');
        return;
      }

      const response = await fetch(`/api/users/${user.id}`, {
        method: 'GET',
        credentials: 'include',
      });

      const result = await response.json();

      if (result.success) {
        setUserInfo(result.data);
      } else {
        message.error(result.message || '获取用户信息失败');
        if (response.status === 401) {
          logout();
          router.push('/');
        }
      }
    } catch (error) {
      console.error('获取用户信息错误：', error);
      message.error('获取用户信息失败');
    } finally {
      setLoading(false);
    }
  }, [user?.id, isAuthenticated, logout, router]);

  // 更新用户信息
  const handleSubmit = async (values: { email?: string; phone?: string }) => {
    setSaving(true);

    try {
      const response = await fetch(`/api/users/${user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: values.email || null,
          phone: values.phone || null,
        }),
      });

      const result = await response.json();

      if (result.success) {
        message.success('个人信息更新成功！');
        // 更新本地状态
        setUserInfo(prev =>
          prev
            ? {
                ...prev,
                email: values.email || null,
                phone: values.phone || null,
              }
            : null
        );

        // 同步到全局认证状态
        updateUser({
          email: values.email || null,
          phone: values.phone || null,
        });
      } else {
        message.error(result.message || '更新失败');
      }
    } catch (error) {
      console.error('更新用户信息错误：', error);
      message.error('更新失败，请重试');
    } finally {
      setSaving(false);
    }
  };

  // 头像更新回调
  const handleAvatarChange = (newAvatarUrl: string) => {
    if (userInfo) {
      // 更新本地状态
      setUserInfo({
        ...userInfo,
        avatar_url: newAvatarUrl,
      });

      // 同步到全局认证状态，这样Navigation组件也会更新
      updateUser({
        avatar_url: newAvatarUrl,
      });
    }
  };

  useEffect(() => {
    // 初始化认证状态
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    // 等待认证状态初始化完成
    if (!isInitialized) {
      return;
    }

    // 认证状态已初始化，检查是否已登录
    if (isAuthenticated && user?.id) {
      fetchUserInfo();
    } else {
      // 未登录，跳转到首页
      message.error('请先登录');
      router.push('/');
      setLoading(false);
    }
  }, [isInitialized, isAuthenticated, user?.id, fetchUserInfo, router]);

  // 监听 userInfo 变化，同步到 Form
  useEffect(() => {
    if (userInfo) {
      form.setFieldsValue({
        username: userInfo.username,
        email: userInfo.email || '',
        phone: userInfo.phone || '',
      });
    }
  }, [userInfo, form]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Text type="danger">加载用户信息失败</Text>
          <br />
          <Button type="primary" onClick={fetchUserInfo} className="mt-4">
            重新加载
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Title level={2} className="text-center mb-8">
          个人中心
        </Title>

        <Row gutter={[24, 24]}>
          {/* 头像上传区域 */}
          <Col xs={24} lg={8}>
            <Card title="头像" className="text-center">
              <AvatarUpload
                currentAvatar={userInfo.avatar_url}
                onAvatarChange={handleAvatarChange}
              />
            </Card>

            {/* 用户统计信息 */}
            <Card title="账户信息" className="mt-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Text type="secondary">用户ID:</Text>
                  <Text className="font-mono text-xs">{userInfo.id}</Text>
                </div>
                <div className="flex justify-between">
                  <Text type="secondary">注册时间:</Text>
                  <Text>{new Date(userInfo.created_at).toLocaleDateString()}</Text>
                </div>
                <div className="flex justify-between">
                  <Text type="secondary">登录次数:</Text>
                  <Text>{userInfo.login_count || 0} 次</Text>
                </div>
                <div className="flex justify-between">
                  <Text type="secondary">用户角色:</Text>
                  <Text className={userInfo.role === 'admin' ? 'text-red-600' : 'text-blue-600'}>
                    {userInfo.role === 'admin' ? '管理员' : '普通用户'}
                  </Text>
                </div>
              </div>
            </Card>
          </Col>

          {/* 个人信息编辑区域 */}
          <Col xs={24} lg={16}>
            <Card title="个人信息">
              <Form form={form} layout="vertical" onFinish={handleSubmit} autoComplete="off">
                <Form.Item
                  label="用户名"
                  name="username"
                  extra={
                    <Text type="secondary" className="text-xs">
                      用户名不可修改
                    </Text>
                  }
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="用户名"
                    disabled
                    className="bg-gray-50"
                  />
                </Form.Item>

                <Form.Item
                  label="邮箱地址"
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: '请输入有效的邮箱地址！',
                    },
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="请输入邮箱地址" />
                </Form.Item>

                <Form.Item
                  label="手机号码"
                  name="phone"
                  rules={[
                    {
                      pattern: /^1[3-9]\d{9}$/,
                      message: '请输入有效的手机号码！',
                    },
                  ]}
                >
                  <Input prefix={<PhoneOutlined />} placeholder="请输入手机号码" />
                </Form.Item>

                <Divider />

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={saving}
                    icon={<SaveOutlined />}
                    size="large"
                    className="w-full"
                  >
                    {saving ? '保存中...' : '保存修改'}
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
