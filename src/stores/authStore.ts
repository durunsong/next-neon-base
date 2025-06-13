import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { message } from 'antd';
import Cookies from 'js-cookie';

// 用户信息类型
export interface User {
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

// 认证状态接口
interface AuthState {
  // 状态
  user: User | null;
  token: string | null;
  isLoading: boolean;
  
  // 操作方法
  login: (userData: User, userToken: string) => void;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  initialize: () => void;
  
  // 计算属性方法
  getIsAuthenticated: () => boolean;
}

// 创建认证状态管理store
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // 初始状态
        user: null,
        token: null,
        isLoading: true,
        
        // 计算属性方法 - 是否已认证
        getIsAuthenticated: () => {
          const state = get();
          return !!(state.user && state.token);
        },
        
        // 初始化方法 - 从cookies加载用户信息
        initialize: () => {
          try {
            const savedUser = Cookies.get('user');
            const savedToken = Cookies.get('token');
            
            if (savedUser && savedToken) {
              set({
                user: JSON.parse(savedUser),
                token: savedToken,
                isLoading: false,
              });
            } else {
              set({ isLoading: false });
            }
          } catch (error) {
            console.error('加载用户信息失败:', error);
            // 清除可能损坏的数据
            Cookies.remove('user');
            Cookies.remove('token');
            set({ 
              user: null, 
              token: null, 
              isLoading: false 
            });
          }
        },
        
        // 登录方法
        login: (userData: User, userToken: string) => {
          try {
            set({
              user: userData,
              token: userToken,
            });
            
            // 设置cookies，有效期7天
            Cookies.set('user', JSON.stringify(userData), { 
              expires: 7, 
              secure: false, 
              sameSite: 'lax' 
            });
            Cookies.set('token', userToken, { 
              expires: 7, 
              secure: false, 
              sameSite: 'lax' 
            });
            
            message.success(`欢迎回来，${userData.username}！`);
          } catch (error) {
            console.error('保存用户信息失败:', error);
            message.error('登录状态保存失败');
          }
        },
        
        // 退出登录方法
        logout: async () => {
          try {
            // 调用后端logout API
            await fetch('/api/auth/logout', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });
          } catch (error) {
            console.error('退出登录API调用失败:', error);
          } finally {
            // 无论API调用是否成功，都要清除本地状态
            set({
              user: null,
              token: null,
            });
            
            Cookies.remove('user');
            Cookies.remove('token');
            message.success('已安全退出登录');
          }
        },
        
        // 更新用户信息方法
        updateUser: (userData: Partial<User>) => {
          const currentUser = get().user;
          if (currentUser) {
            try {
              const updatedUser = { ...currentUser, ...userData };
              set({ user: updatedUser });
              
              Cookies.set('user', JSON.stringify(updatedUser), { 
                expires: 7, 
                secure: false, 
                sameSite: 'lax' 
              });
            } catch (error) {
              console.error('更新用户信息失败:', error);
              message.error('用户信息更新失败');
            }
          }
        },
        
        // 设置加载状态
        setLoading: (loading: boolean) => {
          set({ isLoading: loading });
        },
      }),
      {
        name: 'auth-store', // 本地存储的key
        partialize: (state) => ({
          // 只持久化这些字段，不持久化isLoading
          user: state.user,
          token: state.token,
        }),
      }
    ),
    {
      name: 'auth-store', // DevTools中显示的名称
    }
  )
);

// 便捷的选择器函数
export const useIsAuthenticated = () => useAuthStore((state) => !!(state.user && state.token));

// 导出类型
export type { AuthState }; 