import '@ant-design/v5-patch-for-react-19';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import Navigation from '@/components/Navigation';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Next Neon Base',
    default: 'Next Neon Base - 用户管理系统',
  },
  description: '基于 Next.js 15、Prisma ORM 和 Neon 云数据库的现代化用户管理系统',
  keywords: ['Next.js', 'Prisma', 'Neon', '用户管理', 'TypeScript'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Your Name',
  metadataBase: new URL('https://your-domain.vercel.app'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* 固定在顶部的导航栏 */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navigation />
        </div>
        {/* 主内容区域，添加上边距避免被导航栏遮挡 */}
        <main className="mt-16">{children}</main>
      </body>
    </html>
  );
}
