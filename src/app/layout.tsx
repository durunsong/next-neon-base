import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AntdProvider from "@/components/AntdProvider";
import Header from "@/components/Header";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | 极速汽车',
    default: '极速汽车 - 领先的汽车销售平台',
  },
  description: "极速汽车，全球领先的豪华汽车销售平台。提供奔驰、宝马、奥迪、特斯拉等顶级品牌的销售服务。",
  keywords: ["汽车销售", "豪华汽车", "奔驰", "宝马", "奥迪", "特斯拉", "汽车购买"],
  authors: [{ name: "极速汽车团队" }],
  creator: "极速汽车",
  publisher: "极速汽车",
  metadataBase: new URL('https://car-website.vercel.app'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://car-website.vercel.app',
    title: '极速汽车 - 领先的汽车销售平台',
    description: '极速汽车，全球领先的豪华汽车销售平台',
    siteName: '极速汽车',
  },
  twitter: {
    card: 'summary_large_image',
    title: '极速汽车',
    description: '极速汽车，全球领先的豪华汽车销售平台',
  },
};

// Ant Design 主题配置已移至 AntdProvider 组件

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdProvider>
          <AuthProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
          </AuthProvider>
        </AntdProvider>
      </body>
    </html>
  );
}
