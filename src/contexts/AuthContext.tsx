'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { message } from 'antd';
import Cookies from 'js-cookie';

// 用户信息类型
interface User {
  id: string;
  username: string;
  email?: string;
  phone?: string;
  avatar_url?: string;
  role?: string;
  is_verified?: boolean;
  is_active?: boolean;
  login_count?: number;
  last_login_at?: string;
  created_at?: string;
}

// 认证上下文类型
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User, userToken: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// 创建认证上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 认证提供者组件属性
interface AuthProviderProps {
  children: ReactNode;
}

// 认证提供者组件 
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化时从cookies加载用户信息
  useEffect(() => {
    try {
      const savedUser = Cookies.get('user');
      const savedToken = Cookies.get('token');
      
      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      }
    } catch (error) {
      console.error('加载用户信息失败:', error);
      // 清除可能损坏的数据
      Cookies.remove('user');
      Cookies.remove('token');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 登录函数
  const login = (userData: User, userToken: string) => {
    try {
      setUser(userData);
      setToken(userToken);
      // 设置cookies，有效期7天，httpOnly: false以便JS能读取
      Cookies.set('user', JSON.stringify(userData), { expires: 7, secure: false, sameSite: 'lax' });
      Cookies.set('token', userToken, { expires: 7, secure: false, sameSite: 'lax' });
      message.success(`欢迎回来，${userData.username}！`);
    } catch (error) {
      console.error('保存用户信息失败:', error);
      message.error('登录状态保存失败');
    }
  };

  // 退出登录函数
  const logout = async () => {
    try {
      // 调用后端logout API
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setUser(null);
      setToken(null);
      Cookies.remove('user');
      Cookies.remove('token');
      message.success('已安全退出登录');
    } catch (error) {
      console.error('退出登录失败:', error);
      // 即使API调用失败，也要清除本地状态
      setUser(null);
      setToken(null);
      Cookies.remove('user');
      Cookies.remove('token');
      message.success('已安全退出登录');
    }
  };

  // 更新用户信息函数
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      try {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        Cookies.set('user', JSON.stringify(updatedUser), { expires: 7, secure: false, sameSite: 'lax' });
      } catch (error) {
        console.error('更新用户信息失败:', error);
        message.error('用户信息更新失败');
      }
    }
  };

  // 计算是否已认证
  const isAuthenticated = !!(user && token);

  // 上下文值
  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 使用认证上下文的钩子
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth 必须在 AuthProvider 内部使用');
  }
  return context;
}

// 导出上下文类型以供其他地方使用
export type { User, AuthContextType }; 