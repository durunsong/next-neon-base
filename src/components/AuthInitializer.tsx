'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

/**
 * 认证状态初始化组件
 * 用于在应用启动时初始化认证状态
 */
export function AuthInitializer() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    // 应用启动时初始化认证状态
    initialize();
  }, [initialize]);

  // 这个组件不渲染任何UI，只负责初始化
  return null;
}

export default AuthInitializer; 