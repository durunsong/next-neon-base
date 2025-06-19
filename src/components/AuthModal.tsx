'use client';

import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Tabs, message } from 'antd';

import React, { useState } from 'react';

import { useAuthStore } from '../store/authStore';
import { validatePasswordStrength } from '../utils/passwordValidation';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

interface AuthModalProps {
  open: boolean;
  onCancel: () => void;
}

interface LoginForm {
  account: string; // 改为通用账号字段，支持邮箱、手机号、用户名
  password: string;
}

interface RegisterForm {
  username: string;
  email: string;
  phone?: string; // 手机号选填
  password: string;
  confirmPassword: string;
}

export default function AuthModal({ open, onCancel }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState('login');
  const [passwordValue, setPasswordValue] = useState(''); // 跟踪密码值用于强度显示
  const { login, setLoading, isLoading } = useAuthStore();
  const [loginForm] = Form.useForm<LoginForm>();
  const [registerForm] = Form.useForm<RegisterForm>();

  // 自定义密码强度验证器
  const passwordValidator = (_: unknown, value: string) => {
    if (!value) {
      return Promise.reject(new Error('请输入密码！'));
    }

    const validation = validatePasswordStrength(value);
    if (!validation.isValid) {
      return Promise.reject(new Error(validation.message));
    }

    return Promise.resolve();
  };

  // 处理登录
  const handleLogin = async (values: LoginForm) => {
    try {
      setLoading(true);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (result.success) {
        login(result.data.user, result.data.token);
        message.success('登录成功！');
        onCancel(); // 表单会在 afterClose 中自动重置
      } else {
        message.error(result.message || '登录失败');
      }
    } catch (error) {
      console.error('登录错误:', error);
      message.error('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 处理注册
  const handleRegister = async (values: RegisterForm) => {
    try {
      setLoading(true);

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          phone: values.phone,
          password: values.password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        message.success('注册成功！请登录');
        // 安全地重置注册表单并切换到登录标签页
        setTimeout(() => {
          try {
            registerForm.resetFields();
            setActiveTab('login');
            setPasswordValue(''); // 重置密码值
          } catch (error) {
            console.debug('Form reset after register:', error);
          }
        }, 100);
      } else {
        message.error(result.message || '注册失败');
      }
    } catch (error) {
      console.error('注册错误:', error);
      message.error('注册失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  // 在Modal完全关闭后重置表单，避免在组件卸载时操作表单
  const handleAfterClose = () => {
    // 使用setTimeout确保在下一个事件循环中执行，避免组件卸载时的警告
    setTimeout(() => {
      try {
        loginForm.resetFields();
        registerForm.resetFields();
        setActiveTab('login');
        setPasswordValue(''); // 重置密码值
      } catch (error) {
        // 忽略表单已卸载的错误
        console.debug('Form reset after modal close:', error);
      }
    }, 0);
  };

  const items = [
    {
      key: 'login',
      label: '登录',
      children: (
        <div className="px-4 py-6">
          <Form form={loginForm} name="login" onFinish={handleLogin} layout="vertical" size="large">
            <Form.Item name="account" rules={[{ required: true, message: '请输入账号！' }]}>
              <Input prefix={<UserOutlined />} placeholder="邮箱/手机号/用户名" className="h-12" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="密码" className="h-12" />
            </Form.Item>

            <div className="text-center mb-4">
              <a href="#" className="text-sm text-gray-500 hover:text-blue-500">
                忘记密码？
              </a>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={isLoading}
                className="h-12 bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      key: 'register',
      label: '注册',
      children: (
        <div className="px-4 py-6">
          <Form
            form={registerForm}
            name="register"
            onFinish={handleRegister}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '请输入用户名！' },
                { min: 3, message: '用户名至少3个字符！' },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="用户名" className="h-12" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: '请输入邮箱！' },
                { type: 'email', message: '请输入有效的邮箱地址！' },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" className="h-12" />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                {
                  pattern: /^[\d+\-\s()]{10,}$/,
                  message: '请输入有效的手机号码！',
                },
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="手机号（选填）" className="h-12" />
            </Form.Item>

            <Form.Item name="password" rules={[{ validator: passwordValidator }]}>
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="密码"
                className="h-12"
                onChange={e => setPasswordValue(e.target.value)}
              />
            </Form.Item>

            {/* 密码强度指示器 */}
            <PasswordStrengthIndicator password={passwordValue} className="mb-4" />

            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: '请确认密码！' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致！'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="确认密码" className="h-12" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={isLoading}
                className="h-12 bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600"
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
  ];

  return (
    <Modal
      title={null}
      open={open}
      onCancel={handleCancel}
      afterClose={handleAfterClose}
      footer={null}
      width={400}
      centered
      className="auth-modal"
      styles={{
        body: { padding: 0 },
      }}
    >
      <div className="text-center py-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">
          {activeTab === 'login' ? '登录' : '注册'}
        </h2>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        centered
        items={items}
        className="auth-tabs"
      />
    </Modal>
  );
}
