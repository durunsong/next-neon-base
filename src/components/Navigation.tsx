'use client';

import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, message } from 'antd';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAuthStore } from '../store/authStore';
import AuthModal from './AuthModal';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const pathname = usePathname();

  const { user, isAuthenticated, logout, initAuth } = useAuthStore();

  // 初始化认证状态
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const navItems = [
    { href: '/', label: '首页', title: '首页' },
    { href: '/users', label: '用户管理', title: '用户管理页面' },
    { href: '/database', label: '数据库信息', title: '查看数据库版本和统计信息' },
    { href: '/about', label: '关于我们', title: '了解项目详情' },
  ];

  const isActive = (href: string) => {
    if (!pathname) return false;

    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // 处理登出
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        logout();
        message.success('登出成功！');
      } else {
        message.error('登出失败，请重试');
      }
    } catch (error) {
      console.error('登出错误:', error);
      message.error('登出失败，请重试');
    }
  };

  // 用户菜单项
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
      onClick: () => {
        // 这里可以跳转到个人资料页面
        message.info('个人资料功能即将推出');
      },
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
      onClick: () => {
        // 这里可以跳转到设置页面
        message.info('设置功能即将推出');
      },
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '登出',
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <nav className="bg-white shadow-md border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-blue-500 text-white w-8 h-8 rounded flex items-center justify-center font-bold">
                N
              </div>
              <span className="text-xl font-bold text-gray-900">Next Neon Base</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {/* 导航链接 */}
              <div className="flex space-x-8">
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={item.title}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* 用户状态区域 */}
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">欢迎，{user.username}!</span>
                  <Dropdown
                    menu={{ items: userMenuItems }}
                    placement="bottomRight"
                    trigger={['click']}
                  >
                    <Avatar
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      src={user.avatar_url}
                      icon={<UserOutlined />}
                      size="default"
                    />
                  </Dropdown>
                </div>
              ) : (
                <Button
                  type="primary"
                  onClick={() => setAuthModalOpen(true)}
                  className="bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600"
                >
                  登录 / 注册
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="space-y-2">
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={item.title}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* 移动端用户状态 */}
                <div className="pt-2 border-t">
                  {isAuthenticated && user ? (
                    <div className="px-3 py-2 space-y-2">
                      <p className="text-sm text-gray-600">欢迎，{user.username}!</p>
                      <Button type="default" size="small" onClick={handleLogout} className="w-full">
                        登出
                      </Button>
                    </div>
                  ) : (
                    <div className="px-3 py-2">
                      <Button
                        type="primary"
                        onClick={() => {
                          setAuthModalOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="w-full bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600"
                      >
                        登录 / 注册
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* 认证弹窗 */}
      <AuthModal open={authModalOpen} onCancel={() => setAuthModalOpen(false)} />
    </>
  );
}
