import Cookies from 'js-cookie';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 用户信息类型
export interface User {
  id: string;
  username: string;
  email?: string | null;
  phone?: string | null; // 添加手机号字段
  role?: string | null;
  avatar_url?: string | null;
}

// 认证状态类型
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean; // 是否已初始化认证状态
}

// 认证操作类型
interface AuthActions {
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  initAuth: () => void;
  updateUser: (userUpdate: Partial<User>) => void; // 新增：更新用户信息
}

// 创建认证store
export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    set => ({
      // 初始状态
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isInitialized: false,

      // 登录操作
      login: (user: User, token: string) => {
        // 设置cookie
        Cookies.set('auth_token_local', token, {
          expires: 1, // 1天
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        });

        Cookies.set('auth_userInfo_local', JSON.stringify(user), {
          expires: 1, // 1天
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        });

        // 更新store状态
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          isInitialized: true,
        });
      },

      // 登出操作
      logout: () => {
        // 清除cookie
        Cookies.remove('auth_token_local');
        Cookies.remove('auth_userInfo_local');

        // 重置store状态
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: true,
        });
      },

      // 设置加载状态
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      // 初始化认证状态（从cookie中恢复）
      initAuth: () => {
        try {
          const token = Cookies.get('auth_token_local');
          const userStr = Cookies.get('auth_userInfo_local');

          if (token && userStr) {
            const user = JSON.parse(userStr);
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              isInitialized: true,
            });
          } else {
            // 没有认证信息，标记为已初始化但未认证
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              isInitialized: true,
            });
          }
        } catch (error) {
          console.error('初始化认证状态失败:', error);
          // 如果解析失败，清除可能损坏的数据
          Cookies.remove('auth_token_local');
          Cookies.remove('auth_userInfo_local');
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            isInitialized: true,
          });
        }
      },

      // 更新用户信息
      updateUser: (userUpdate: Partial<User>) => {
        set(state => {
          if (!state.user) return state;

          const updatedUser = { ...state.user, ...userUpdate };

          // 同步更新cookie
          Cookies.set('auth_userInfo_local', JSON.stringify(updatedUser), {
            expires: 1,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
          });

          return {
            ...state,
            user: updatedUser,
          };
        });
      },
    }),
    {
      name: 'auth-storage',
      // 只持久化基本信息，不持久化isLoading和isInitialized
      partialize: state => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
