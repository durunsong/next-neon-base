import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// 主题类型
export type Theme = 'light' | 'dark' | 'auto';

// 应用状态接口
interface AppState {
  // UI状态
  theme: Theme;
  sidebarCollapsed: boolean;
  loading: boolean;
  
  // 全局数据
  notifications: Notification[];
  
  // 操作方法
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setLoading: (loading: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

// 通知类型
interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  timestamp: number;
  duration?: number; // 自动消失时间（毫秒），0表示不自动消失
}

// 生成唯一ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// 创建应用状态管理store
export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // 初始状态
      theme: 'auto',
      sidebarCollapsed: false,
      loading: false,
      notifications: [],
      
      // 设置主题
      setTheme: (theme: Theme) => {
        set({ theme });
        // 可以在这里添加主题切换的副作用
        if (typeof window !== 'undefined') {
          localStorage.setItem('theme', theme);
        }
      },
      
      // 切换侧边栏
      toggleSidebar: () => {
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
      },
      
      // 设置全局加载状态
      setLoading: (loading: boolean) => {
        set({ loading });
      },
      
      // 添加通知
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: generateId(),
          timestamp: Date.now(),
          duration: notification.duration ?? 4000, // 默认4秒
        };
        
        set((state) => ({
          notifications: [...state.notifications, newNotification]
        }));
        
        // 自动移除通知
        if (newNotification.duration && newNotification.duration > 0) {
          setTimeout(() => {
            get().removeNotification(newNotification.id);
          }, newNotification.duration);
        }
      },
      
      // 移除通知
      removeNotification: (id: string) => {
        set((state) => ({
          notifications: state.notifications.filter(
            (notification) => notification.id !== id
          )
        }));
      },
      
      // 清空所有通知
      clearNotifications: () => {
        set({ notifications: [] });
      },
    }),
    {
      name: 'app-store',
    }
  )
);

// 导出类型
export type { AppState, Notification }; 