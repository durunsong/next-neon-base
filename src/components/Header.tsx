'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer, Avatar, Dropdown, Space } from 'antd';
import { 
  MenuOutlined, 
  CarOutlined, 
  HomeOutlined, 
  ShopOutlined, 
  CustomerServiceOutlined, 
  InfoCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user, isAuthenticated, logout } = useAuth();

  // 监听滚动事件，为头部添加背景
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  // 打开认证弹窗
  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalVisible(true);
  };

  // 关闭认证弹窗
  const closeAuthModal = () => {
    setAuthModalVisible(false);
  };

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link href="/">首页</Link>,
    },
    {
      key: 'cars',
      icon: <CarOutlined />,
      label: <Link href="/cars">车型展示</Link>,
    },
    {
      key: 'shop',
      icon: <ShopOutlined />,
      label: <Link href="/shop">在线购车</Link>,
    },
    {
      key: 'service',
      icon: <CustomerServiceOutlined />,
      label: <Link href="/service">售后服务</Link>,
    },
    {
      key: 'about',
      icon: <InfoCircleOutlined />,
      label: <Link href="/about">关于我们</Link>,
    },
  ];

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'glass-effect shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <AntHeader className="bg-transparent px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo 区域 */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-red-500 to-blue-500 p-2 rounded-lg">
                <CarOutlined className="text-white text-xl" />
              </div>
              <span className="text-white font-bold text-xl gradient-text hidden sm:block">
                极速汽车
              </span>
            </Link>
          </motion.div>

          {/* 桌面端导航菜单 */}
          <div className="hidden lg:flex items-center">
            <Menu
              mode="horizontal"
              className="bg-transparent border-none"
              style={{ 
                backgroundColor: 'transparent',
                color: 'white',
                minWidth: 'auto'
              }}
              items={menuItems}
            />
          </div>

          {/* 右侧按钮区域 */}
          <div className="flex items-center space-x-4">
            {/* 桌面端用户区域 */}
            <div className="hidden md:flex items-center">
              {isAuthenticated ? (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'profile',
                        icon: <UserOutlined />,
                        label: <Link href="/profile">个人中心</Link>,
                      },
                      {
                        key: 'settings',
                        icon: <SettingOutlined />,
                        label: <Link href="/settings">设置</Link>,
                      },
                      {
                        type: 'divider',
                      },
                      {
                        key: 'logout',
                        icon: <LogoutOutlined />,
                        label: '退出登录',
                        onClick: logout,
                      },
                    ],
                  }}
                  trigger={['click']}
                  placement="bottomRight"
                >
                  <Space className="cursor-pointer text-white hover:text-blue-400">
                    <Avatar 
                      src={user?.avatar_url} 
                      icon={<UserOutlined />}
                      size="default"
                    />
                    <span className="hidden lg:inline">{user?.username}</span>
                  </Space>
                </Dropdown>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button 
                    type="text" 
                    icon={<LoginOutlined />} 
                    className="text-white hover:text-blue-400"
                    onClick={() => openAuthModal('login')}
                  >
                    登录
                  </Button>
                  <Button 
                    type="primary" 
                    className="bg-gradient-to-r from-red-500 to-blue-500 border-none"
                    onClick={() => openAuthModal('register')}
                  >
                    注册
                  </Button>
                </div>
              )}
            </div>

            {/* 移动端菜单按钮 */}
            <Button
              className="lg:hidden text-white bg-transparent border-white"
              icon={<MenuOutlined />}
              onClick={showDrawer}
            />
          </div>
        </AntHeader>
      </motion.div>

      {/* 移动端抽屉菜单 */}
      <Drawer
        title={
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-red-500 to-blue-500 p-2 rounded-lg">
              <CarOutlined className="text-white" />
            </div>
            <span className="gradient-text font-bold">极速汽车</span>
          </div>
        }
        placement="right"
        closable={true}
        onClose={onClose}
        open={visible}
        width={280}
        className="mobile-drawer"
      >
        <div className="flex flex-col h-full">
          {/* 导航菜单 */}
          <Menu
            mode="vertical"
            className="border-none flex-1"
            items={menuItems}
            onClick={onClose}
          />
          
          {/* 底部按钮 */}
          <div className="border-t pt-4 space-y-2">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg mb-4">
                  <Avatar 
                    src={user?.avatar_url} 
                    icon={<UserOutlined />}
                    size="large"
                  />
                  <div>
                    <div className="font-medium">{user?.username}</div>
                    <div className="text-sm text-gray-500">{user?.email || user?.phone}</div>
                  </div>
                </div>
                <Button 
                  block 
                  icon={<UserOutlined />}
                  onClick={onClose}
                >
                  <Link href="/profile">个人中心</Link>
                </Button>
                <Button 
                  block 
                  icon={<SettingOutlined />}
                  onClick={onClose}
                >
                  <Link href="/settings">设置</Link>
                </Button>
                <Button 
                  block 
                  icon={<LogoutOutlined />}
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                >
                  退出登录
                </Button>
              </>
            ) : (
              <>
                <Button 
                  block 
                  icon={<LoginOutlined />}
                  onClick={() => {
                    openAuthModal('login');
                    onClose();
                  }}
                >
                  登录
                </Button>
                <Button 
                  block 
                  type="primary"
                  onClick={() => {
                    openAuthModal('register');
                    onClose();
                  }}
                >
                  注册
                </Button>
              </>
            )}
          </div>
        </div>
      </Drawer>

      {/* 认证弹窗 */}
      <AuthModal
        visible={authModalVisible}
        onClose={closeAuthModal}
        initialMode={authMode}
      />
    </>
  );
};

export default Header; 