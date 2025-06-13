'use client';

import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zustand 演示',
  description: 'Zustand 状态管理库的使用演示，包括认证状态、应用状态和通知系统',
};
import { 
  Card, 
  Button, 
  Space, 
  Typography, 
  Tag, 
  Switch, 
  Alert,
  Row,
  Col,
  Divider,
  Badge
} from 'antd';
import { 
  UserOutlined, 
  BellOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useAuthStore, useIsAuthenticated } from '@/stores/authStore';
import { useAppStore } from '@/stores/appStore';

const { Title, Paragraph, Text } = Typography;

export default function ZustandDemoPage() {
  // 使用认证store
  const { user, isLoading } = useAuthStore();
  const isAuthenticated = useIsAuthenticated();
  
  // 使用应用store
  const { 
    theme,
    sidebarCollapsed,
    loading,
    notifications,
    setTheme,
    toggleSidebar,
    setLoading,
    addNotification,
    removeNotification,
    clearNotifications
  } = useAppStore((state) => state);

  // 演示添加不同类型的通知
  const addDemoNotifications = () => {
    addNotification({
      type: 'success',
      title: '操作成功',
      message: '数据已成功保存到服务器',
    });

    setTimeout(() => {
      addNotification({
        type: 'warning',
        title: '警告提示',
        message: '检测到异常活动，请注意安全',
      });
    }, 1000);

    setTimeout(() => {
      addNotification({
        type: 'info',
        title: '系统提示',
        message: '新功能已上线，快来体验吧！',
      });
    }, 2000);

    setTimeout(() => {
      addNotification({
        type: 'error',
        title: '错误提示',
        message: '网络连接失败，请检查网络设置',
        duration: 0, // 不自动消失
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title level={1} className="text-center mb-8">
            🚀 Zustand 状态管理演示
          </Title>
          
          <Alert
            message="Zustand 已成功集成"
            description="这个页面展示了如何使用 Zustand 管理全局状态，包括用户认证、主题设置、通知系统等功能。"
            type="success"
            showIcon
            className="mb-6"
          />

          <Row gutter={[16, 16]}>
            {/* 认证状态演示 */}
            <Col xs={24} lg={12}>
              <Card 
                title={
                  <Space>
                    <UserOutlined />
                    认证状态管理
                  </Space>
                }
                className="h-full"
              >
                <Space direction="vertical" className="w-full">
                  <div className="flex items-center justify-between">
                    <Text strong>登录状态:</Text>
                    <Tag color={isAuthenticated ? 'green' : 'red'}>
                      {isAuthenticated ? '已登录' : '未登录'}
                    </Tag>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Text strong>加载状态:</Text>
                    <Tag color={isLoading ? 'blue' : 'default'}>
                      {isLoading ? '加载中' : '已完成'}
                    </Tag>
                  </div>

                  {user && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Text strong>用户信息:</Text>
                      <div className="mt-2 space-y-1">
                        <div>用户名: <Text code>{user.username}</Text></div>
                        <div>邮箱: <Text code>{user.email || '未设置'}</Text></div>
                        <div>角色: <Text code>{user.role || '普通用户'}</Text></div>
                      </div>
                    </div>
                  )}

                  <Paragraph type="secondary" className="text-sm">
                    💡 认证状态通过 cookies 持久化，页面刷新后状态会自动恢复。
                  </Paragraph>
                </Space>
              </Card>
            </Col>

            {/* 应用状态演示 */}
            <Col xs={24} lg={12}>
              <Card 
                title={
                  <Space>
                    <ThunderboltOutlined />
                    应用状态管理
                  </Space>
                }
                className="h-full"
              >
                <Space direction="vertical" className="w-full">
                  <div className="flex items-center justify-between">
                    <Text strong>当前主题:</Text>
                    <Tag color="blue">{theme}</Tag>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Text strong>侧边栏:</Text>
                    <Tag color={sidebarCollapsed ? 'orange' : 'green'}>
                      {sidebarCollapsed ? '已收起' : '展开'}
                    </Tag>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Text strong>全局加载:</Text>
                    <Switch 
                      checked={loading} 
                      onChange={setLoading}
                      checkedChildren="开启"
                      unCheckedChildren="关闭"
                    />
                  </div>

                  <Divider />

                  <div className="space-y-2">
                    <Text strong>主题设置:</Text>
                    <Space>
                      <Button 
                        size="small" 
                        type={theme === 'light' ? 'primary' : 'default'}
                        onClick={() => setTheme('light')}
                      >
                        浅色
                      </Button>
                      <Button 
                        size="small" 
                        type={theme === 'dark' ? 'primary' : 'default'}
                        onClick={() => setTheme('dark')}
                      >
                        深色
                      </Button>
                      <Button 
                        size="small" 
                        type={theme === 'auto' ? 'primary' : 'default'}
                        onClick={() => setTheme('auto')}
                      >
                        自动
                      </Button>
                    </Space>
                  </div>

                  <Button 
                    type="dashed" 
                    block 
                    onClick={toggleSidebar}
                  >
                    切换侧边栏状态
                  </Button>
                </Space>
              </Card>
            </Col>

            {/* 通知系统演示 */}
            <Col xs={24}>
              <Card 
                title={
                  <Space>
                    <Badge count={notifications.length}>
                      <BellOutlined />
                    </Badge>
                    通知系统 ({notifications.length} 条通知)
                  </Space>
                }
                extra={
                  <Space>
                    <Button 
                      type="primary" 
                      onClick={addDemoNotifications}
                      icon={<ThunderboltOutlined />}
                    >
                      添加演示通知
                    </Button>
                    <Button 
                      onClick={clearNotifications}
                      disabled={notifications.length === 0}
                    >
                      清空所有
                    </Button>
                  </Space>
                }
              >
                {notifications.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">
                    暂无通知消息
                  </div>
                ) : (
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {notifications.map((notification) => {
                      const getIcon = () => {
                        switch (notification.type) {
                          case 'success': return <CheckCircleOutlined className="text-green-500" />;
                          case 'error': return <CloseCircleOutlined className="text-red-500" />;
                          case 'warning': return <ExclamationCircleOutlined className="text-orange-500" />;
                          case 'info': return <InfoCircleOutlined className="text-blue-500" />;
                          default: return <InfoCircleOutlined />;
                        }
                      };

                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-start space-x-3">
                            {getIcon()}
                            <div>
                              <Text strong>{notification.title}</Text>
                              {notification.message && (
                                <div className="text-sm text-gray-600 mt-1">
                                  {notification.message}
                                </div>
                              )}
                              <div className="text-xs text-gray-400 mt-1">
                                {new Date(notification.timestamp).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <Button 
                            type="text" 
                            size="small"
                            onClick={() => removeNotification(notification.id)}
                          >
                            ✕
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
                
                <Divider />
                
                <Paragraph type="secondary" className="text-sm mb-0">
                  💡 通知系统支持自动消失、手动移除和批量清理。不同类型的通知有不同的图标和颜色。
                </Paragraph>
              </Card>
            </Col>

            {/* 使用指南 */}
            <Col xs={24}>
              <Card title="📖 使用指南" className="mt-4">
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={8}>
                    <Card size="small" title="认证状态" type="inner">
                      <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
{`// 使用认证状态
const { user, login, logout } = useAuthStore();
const isAuthenticated = useIsAuthenticated();

// 登录
login(userData, token);

// 退出
logout();

// 更新用户信息
updateUser({ username: '新名称' });`}
                      </pre>
                    </Card>
                  </Col>
                  
                  <Col xs={24} md={8}>
                    <Card size="small" title="应用状态" type="inner">
                      <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
{`// 使用应用状态
const { theme, setTheme, notifications, addNotification } = useAppStore();

// 设置主题
setTheme('dark');

// 添加通知
addNotification({
  type: 'success',
  title: '成功',
  message: '操作完成'
});`}
                      </pre>
                    </Card>
                  </Col>
                  
                  <Col xs={24} md={8}>
                    <Card size="small" title="选择性订阅" type="inner">
                      <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
{`// 只订阅需要的状态
const theme = useAppStore(state => state.theme);
const setTheme = useAppStore(state => state.setTheme);

// 或使用 shallow 比较
const { theme, loading } = useAppStore(
  state => ({ theme: state.theme, loading: state.loading }),
  shallow
);`}
                      </pre>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </motion.div>
      </div>
    </div>
  );
} 