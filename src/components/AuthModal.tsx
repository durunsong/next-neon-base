'use client';

import React, { useState } from 'react';
import { 
  Modal, 
  Form, 
  Input, 
  Button, 
  Typography, 
  message, 
  Divider,
  Progress,
  Checkbox
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  EyeInvisibleOutlined, 
  EyeTwoTone,
  MailOutlined,
  LoginOutlined,
  UserAddOutlined,
  CheckCircleOutlined,
  GithubOutlined,
  GoogleOutlined,
  WechatOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

const { Title, Paragraph } = Typography;

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

interface LoginForm {
  loginId: string;
  password: string;
  remember: boolean;
}

interface RegisterForm {
  username: string;
  email?: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

export default function AuthModal({ visible, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [loginForm] = Form.useForm<LoginForm>();
  const [registerForm] = Form.useForm<RegisterForm>();
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { login } = useAuth();

  // 计算密码强度
  const calculatePasswordStrength = (password: string): number => {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[a-z]/.test(password)) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/\d/.test(password)) score += 25;
    if (/[^a-zA-Z\d]/.test(password)) score += 25;
    return Math.min(score, 100);
  };

  // 密码强度颜色和文本
  const getPasswordStrengthColor = (strength: number): string => {
    if (strength < 25) return '#ff4d4f';
    if (strength < 50) return '#fa8c16';
    if (strength < 75) return '#fadb14';
    return '#52c41a';
  };

  const getPasswordStrengthText = (strength: number): string => {
    if (strength < 25) return '弱';
    if (strength < 50) return '一般';
    if (strength < 75) return '较强';
    return '强';
  };

  // 登录处理
  const handleLogin = async (values: LoginForm) => {
    try {
      setLoginLoading(true);
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loginId: values.loginId,
          password: values.password
        }),
      });

      const result = await response.json();

      if (result.success) {
        login(result.data.user, result.data.token);
        onClose();
        loginForm.resetFields();
      } else {
        message.error(result.message);
      }
    } catch (error) {
      console.error('登录错误:', error);
      message.error('登录失败，请稍后重试');
    } finally {
      setLoginLoading(false);
    }
  };

  // 注册处理
  const handleRegister = async (values: RegisterForm) => {
    try {
      setRegisterLoading(true);
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (result.success) {
        login(result.data.user, result.data.token);
        onClose();
        registerForm.resetFields();
        setPasswordStrength(0);
      } else {
        message.error(result.message);
      }
    } catch (error) {
      console.error('注册错误:', error);
      message.error('注册失败，请稍后重试');
    } finally {
      setRegisterLoading(false);
    }
  };

  // 切换模式
  const switchMode = (newMode: 'login' | 'register') => {
    setMode(newMode);
    loginForm.resetFields();
    registerForm.resetFields();
    setPasswordStrength(0);
  };

  // 关闭弹窗时重置状态
  const handleClose = () => {
    onClose();
    loginForm.resetFields();
    registerForm.resetFields();
    setPasswordStrength(0);
    setMode('login');
  };

  return (
    <Modal
      open={visible}
      onCancel={handleClose}
      footer={null}
      width={900}
      centered
      destroyOnHidden
      className="auth-modal"
      styles={{
        body: { padding: 0, overflow: 'hidden' },
        mask: { backdropFilter: 'blur(8px)' }
      }}
    >
      <div className="flex h-[650px] bg-white rounded-lg overflow-hidden">
        {/* 左侧 - 登录/注册表单 */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <AnimatePresence mode="wait">
              {mode === 'login' ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Title level={2} className="text-gray-800 mb-2 text-center">
                    登陆
                  </Title>
                  <Paragraph className="text-gray-600 text-center mb-8">
                    欢迎来到三体世界，请输入账号密码！
                  </Paragraph>

                  <Form
                    form={loginForm}
                    onFinish={handleLogin}
                    layout="horizontal"
                    size="large"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    <Form.Item
                      name="loginId"
                      label="账号"
                      rules={[{ required: true, message: '请输入用户名、邮箱或手机号' }]}
                    >
                      <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                        placeholder="用户名"
                        className="auth-input"
                      />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      label="密码"
                      rules={[{ required: true, message: '请输入密码' }]}
                    >
                      <Input.Password
                        prefix={<LockOutlined className="text-gray-400" />}
                        placeholder="密码"
                        className="auth-input"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                      <div className="flex justify-between items-center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                          <Checkbox>记住我</Checkbox>
                        </Form.Item>
                        <a href="#" className="text-blue-500 hover:text-blue-600">
                          忘记密码，点我重置！
                        </a>
                      </div>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loginLoading}
                        className="w-full h-12 bg-black hover:bg-gray-800 border-black text-white rounded-full"
                        icon={<LoginOutlined />}
                      >
                        登陆
                      </Button>
                    </Form.Item>
                  </Form>

                  <Divider>第三方账号登入</Divider>

                  <div className="flex justify-center space-x-4">
                    <Button
                      icon={<WechatOutlined />}
                      className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 border-green-500 text-white"
                    />
                    <Button
                      icon={<GoogleOutlined />}
                      className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 border-blue-500 text-white"
                    />
                    <Button
                      icon={<GithubOutlined />}
                      className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-900 border-gray-800 text-white"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Title level={2} className="text-gray-800 mb-2 text-center">
                    注册
                  </Title>
                  <Paragraph className="text-gray-600 text-center mb-6">
                    创建您的账户，加入极速汽车
                  </Paragraph>

                  <Form
                    form={registerForm}
                    onFinish={handleRegister}
                    layout="horizontal"
                    size="large"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 17 }}
                    className="space-y-2"
                  >
                    <Form.Item
                      name="username"
                      label="用户名"
                      rules={[
                        { required: true, message: '请输入用户名' },
                        { min: 3, max: 20, message: '用户名长度3-20个字符' },
                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' }
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                        placeholder="用户名"
                        className="auth-input"
                      />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      label="邮箱"
                      rules={[{ type: 'email', message: '请输入有效的邮箱地址' }]}
                    >
                      <Input
                        prefix={<MailOutlined className="text-gray-400" />}
                        placeholder="邮箱（可选）"
                        className="auth-input"
                      />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      label="密码"
                      rules={[
                        { required: true, message: '请输入密码' },
                        { min: 8, message: '密码至少8个字符' },
                        { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, message: '密码必须包含字母和数字' }
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined className="text-gray-400" />}
                        placeholder="密码"
                        className="auth-input"
                        onChange={(e) => setPasswordStrength(calculatePasswordStrength(e.target.value))}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      />
                    </Form.Item>

                    {passwordStrength > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mb-4 ml-[29%]"
                      >
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                          <span>密码强度</span>
                          <span style={{ color: getPasswordStrengthColor(passwordStrength) }}>
                            {getPasswordStrengthText(passwordStrength)}
                          </span>
                        </div>
                        <Progress
                          percent={passwordStrength}
                          strokeColor={getPasswordStrengthColor(passwordStrength)}
                          showInfo={false}
                          size="small"
                        />
                      </motion.div>
                    )}

                    <Form.Item
                      name="confirmPassword"
                      label="确认密码"
                      dependencies={['password']}
                      rules={[
                        { required: true, message: '请确认密码' },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('两次输入的密码不一致'));
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        prefix={<CheckCircleOutlined className="text-gray-400" />}
                        placeholder="确认密码"
                        className="auth-input"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      />
                    </Form.Item>

                    <Form.Item
                      name="agree"
                      valuePropName="checked"
                      wrapperCol={{ offset: 7, span: 17 }}
                      rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('请同意用户协议')) }]}
                    >
                      <Checkbox>
                        我同意 <a href="#" className="text-blue-500">用户协议</a> 和 <a href="#" className="text-blue-500">隐私政策</a>
                      </Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 7, span: 17 }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={registerLoading}
                        className="w-full h-12 bg-black hover:bg-gray-800 border-black text-white rounded-full"
                        icon={<UserAddOutlined />}
                      >
                        注册
                      </Button>
                    </Form.Item>
                  </Form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 右侧 - 切换区域 */}
        <div className="w-2/5 bg-gradient-to-br from-gray-100 to-gray-200 p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500 rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-500 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-pink-500 rounded-full"></div>
          </div>

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {mode === 'login' ? (
                <motion.div
                  key="login-switch"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <Title level={3} className="text-gray-800">
                    自然选择号欢迎您登舰！
                  </Title>
                  <Paragraph className="text-gray-600 text-lg">
                    如果您没有账号，您想要现在注册一个吗？
                  </Paragraph>
                  <Button
                    size="large"
                    className="bg-transparent border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white rounded-full px-8 h-12"
                    onClick={() => switchMode('register')}
                  >
                    注册
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="register-switch"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <Title level={3} className="text-gray-800">
                    欢迎加入极速汽车！
                  </Title>
                  <Paragraph className="text-gray-600 text-lg">
                    已经有账户了？立即登录开始您的汽车之旅
                  </Paragraph>
                  <Button
                    size="large"
                    className="bg-transparent border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white rounded-full px-8 h-12"
                    onClick={() => switchMode('login')}
                  >
                    登录
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .auth-modal .ant-modal-content {
          padding: 0 !important;
          border-radius: 12px !important;
          overflow: hidden !important;
        }

        .auth-input {
          height: 48px !important;
          border-radius: 24px !important;
          border: 2px solid #e5e5e5 !important;
          transition: all 0.3s ease !important;
        }

        .auth-input:hover {
          border-color: #d1d1d1 !important;
        }

        .auth-input:focus,
        .auth-input.ant-input-focused {
          border-color: #000 !important;
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1) !important;
        }

        .auth-input input {
          border: none !important;
          box-shadow: none !important;
        }

        .auth-modal .ant-form-item-label > label {
          color: #333 !important;
          font-weight: 600 !important;
          font-size: 14px !important;
        }

        .auth-modal .ant-form-item {
          margin-bottom: 16px !important;
        }

        .auth-modal .ant-form-item-label {
          text-align: left !important;
          padding-right: 8px !important;
        }

        .auth-modal .ant-form-horizontal .ant-form-item-label {
          line-height: 48px !important;
        }
      `}</style>
    </Modal>
  );
} 