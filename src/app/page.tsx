'use client';

import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import AnimatedBackground from '@/components/AnimatedBackground';
// 导入配置
import { performanceOption, techStackOption, trendsOption } from '@/components/EChartsComponent';
import { techStackData } from '@/components/G6Component';

// 动态导入组件，避免SSR问题
const EChartsComponent = dynamic(() => import('@/components/EChartsComponent'), { ssr: false });
const G6Component = dynamic(() => import('@/components/G6Component'), { ssr: false });

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 避免SSR渲染问题
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Next Neon Base</h1>
          <p className="text-xl text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br to-indigo-100 relative">
      {/* 动画背景 */}
      <AnimatedBackground />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <main>
          {/* 头部区域 */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
              Next Neon Base
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              基于 Next.js 15、Prisma ORM 和 Neon 云数据库的现代化基础模版框架
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/durunsong/next-neon-base/tree/base-template"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all inline-block"
              >
                开始使用
              </a>
              <a
                href="https://github.com/durunsong/next-neon-base/tree/base-template"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-3 px-6 rounded-lg shadow-lg transition-all border border-indigo-200 inline-block"
              >
                查看文档
              </a>
            </div>
          </div>

          {/* 技术栈关系图 */}
          <section className="mb-20 bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">技术栈关系图</h2>
            <div className="h-[650px] w-full">
              <G6Component data={techStackData} className="w-full h-full" />
            </div>
            <p className="text-center text-gray-600 mt-4">
              交互提示: 可拖拽节点、缩放画布查看详细关系
            </p>
          </section>

          {/* 数据可视化区域 */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 h-[400px]">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">技术栈分布</h3>
              <EChartsComponent option={techStackOption} className="w-full h-[320px]" />
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 h-[400px]">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">性能雷达图</h3>
              <EChartsComponent option={performanceOption} className="w-full h-[320px]" />
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 h-[400px]">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">开发趋势</h3>
              <EChartsComponent option={trendsOption} className="w-full h-[320px]" />
            </div>
          </section>

          {/* 特性展示 */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">核心特性</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all">
                <div className="text-4xl mb-4 text-indigo-600">🚀</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Next.js 15</h3>
                <p className="text-gray-600">
                  最新的React框架，支持App
                  Router、服务端组件、流式渲染等现代化特性，为应用提供卓越性能
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all">
                <div className="text-4xl mb-4 text-indigo-600">🗄️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Prisma ORM</h3>
                <p className="text-gray-600">
                  类型安全的数据库操作，自动生成类型，简化数据库交互，提高开发效率和代码质量
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all">
                <div className="text-4xl mb-4 text-indigo-600">☁️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Neon 数据库</h3>
                <p className="text-gray-600">
                  现代化的PostgreSQL云服务，无服务器架构，自动扩展，按需付费，适合各种规模的应用
                </p>
              </div>
            </div>
          </section>
        </main>

        <footer className="text-center mt-16 text-gray-500">
          <p>&copy; 2025 Next Neon Base. 用于学习和开发的示例项目。</p>
        </footer>
      </div>
    </div>
  );
}
