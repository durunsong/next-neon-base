'use client';

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

// 这种方式不推荐，仅作为示例
export default function DynamicTitle() {
  const pathname = usePathname();

  useEffect(() => {
    // 如果pathname为null，使用默认标题
    if (!pathname) {
      document.title = 'Next Neon Base';
      return;
    }

    // 动态设置页面标题的映射
    const titleMap: Record<string, string> = {
      '/': '首页 | Next Neon Base',
      '/users': '用户管理 | Next Neon Base',
      '/about': '关于我们 | Next Neon Base',
    };

    // 处理动态路由
    if (pathname.startsWith('/users/') && pathname !== '/users') {
      const userId = pathname.split('/')[2];
      document.title = `用户${userId}详情 | Next Neon Base`;
      return;
    }

    // 设置标题
    const title = titleMap[pathname] || 'Next Neon Base';
    document.title = title;
  }, [pathname]);

  return null; // 这个组件不渲染任何内容
}

/* 
使用方式（不推荐）：
在 layout.tsx 中添加：
import DynamicTitle from '@/components/DynamicTitle';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <DynamicTitle />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
*/
