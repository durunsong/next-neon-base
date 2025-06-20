# Next.js 页面标题(Title)配置指南

本文档详细说明了在 Next.js 13+ App Router 中如何为不同页面设置不同的标题。

## 🎯 核心概念

在 Next.js App Router 中，页面标题通过 **Metadata API** 配置，不再需要手动操作 `<head>` 标签。

## 📝 配置方法

### 1. 根布局全局配置

在 `src/app/layout.tsx` 中设置全局默认 metadata：

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Next Neon Base', // 页面标题模板
    default: 'Next Neon Base - 基础模版框架', // 默认标题
  },
  description: '基于 Next.js 15、Prisma ORM 和 Neon 云数据库的现代化基础模版框架',
  keywords: ['Next.js', 'Prisma', 'Neon', '用户管理', 'TypeScript'],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};
```

**解释：**

- `template: '%s | Next Neon Base'`：页面标题模板，`%s` 会被页面特定标题替换
- `default`：当页面没有设置特定标题时使用的默认标题

### 2. 页面特定配置

在每个页面的 `page.tsx` 中设置特定标题：

```typescript
// src/app/page.tsx (首页)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '首页', // 最终显示为：首页 | Next Neon Base
  description: 'Next.js + Prisma + Neon 基础模版框架的首页',
};
```

```typescript
// src/app/users/page.tsx (用户管理页面)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '用户管理', // 最终显示为：用户管理 | Next Neon Base
  description: '用户列表和管理功能页面',
};
```

### 3. 动态页面配置

对于动态路由，使用 `generateMetadata` 函数：

```typescript
// src/app/users/[id]/page.tsx (用户详情页面)
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const user = await getUser(id); // 获取用户数据

  if (!user) {
    return {
      title: '用户未找到',
      description: '请求的用户不存在',
    };
  }

  return {
    title: `${user.username} - 用户详情`, // 动态标题
    description: `查看用户 ${user.username} 的详细信息`,
  };
}
```

## 🔧 实际效果

基于上述配置，不同页面的标题会是：

| 页面路径     | 页面标题                           |
| ------------ | ---------------------------------- |
| `/`          | 首页 \| Next Neon Base             |
| `/users`     | 用户管理 \| Next Neon Base         |
| `/users/1`   | admin - 用户详情 \| Next Neon Base |
| `/about`     | 关于我们 \| Next Neon Base         |
| 未设置的页面 | Next Neon Base - 基础模版框架      |

## 📱 更多 Metadata 选项

```typescript
export const metadata: Metadata = {
  title: '页面标题',
  description: '页面描述',
  keywords: ['关键词1', '关键词2'],

  // Open Graph (社交媒体分享)
  openGraph: {
    title: '社交媒体标题',
    description: '社交媒体描述',
    images: ['/og-image.png'],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Twitter 标题',
    description: 'Twitter 描述',
  },

  // 网站图标
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },

  // 其他元数据
  authors: [{ name: '作者名称' }],
  creator: '创建者',
  publisher: '发布者',
  robots: 'index, follow',
};
```

## 🎨 Favicon 配置

### 1. 静态文件放置

将 favicon 文件放在 `public/` 目录下：

```
public/
├── favicon.ico          # 标准 favicon
├── apple-icon.png       # Apple 设备图标
└── icon-192x192.png     # PWA 图标
```

### 2. 在 Metadata 中引用

```typescript
export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico', // 浏览器标签页图标
    shortcut: '/favicon.ico', // 快捷方式图标
    apple: '/apple-icon.png', // Apple 设备图标
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-icon.png',
      },
    ],
  },
};
```

## 🚀 最佳实践

1. **统一模板**：在根布局中设置模板，保持品牌一致性
2. **描述性标题**：标题应该清楚描述页面内容
3. **SEO 优化**：包含相关关键词，但避免关键词堆砌
4. **长度控制**：标题长度建议在 50-60 字符内
5. **动态内容**：对于用户生成的内容，确保标题有意义
6. **错误处理**：为找不到内容的页面提供适当的标题

## 🔗 相关资源

- [Next.js Metadata API 文档](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [HTML Meta 标签最佳实践](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)
- [Open Graph 协议](https://ogp.me/)
- [Twitter Card 文档](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)

## 💡 注意事项

1. **Client Components**: 如果组件使用了 `'use client'`，不能直接导出 metadata，需要在上级页面设置
2. **动态导入**: metadata 不能在动态导入的组件中设置
3. **优先级**: 页面级 metadata 会覆盖布局级 metadata
4. **模板继承**: 子页面会自动使用父级布局的模板
