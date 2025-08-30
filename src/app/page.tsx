'use client';

import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

// 导入背景组件
import MeteorBackground from '@/components/MeteorBackground';
import {
  ExploreArchitectureButton,
  StartProjectButton,
  ViewTechStackButton,
} from '@/components/TechButton';
// 导入技术栈主题的图表配置
import {
  commitHeatmapOption,
  performanceOption,
  projectProgressOption,
  techGrowthOption,
  techUsageOption,
} from '@/components/TechStackChartsConfig';
import TypewriterText, { developmentTexts, techStackTexts } from '@/components/TypewriterText';

// 动态导入组件，避免SSR问题
const EChartsComponent = dynamic(() => import('@/components/EChartsComponent'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin text-4xl">🚀</div>
    </div>
  ),
});
const TechArchG6Component = dynamic(() => import('@/components/TechArchG6Component'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin text-4xl">⚡</div>
    </div>
  ),
});

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // 滚动到指定区域的函数
  const scrollToSection = (sectionIndex: number) => {
    const element = document.getElementById(`section-${sectionIndex}`);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // 避免SSR渲染问题
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🚀</div>
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-6">
            Next.js 全栈应用
          </h1>
          <p className="text-xl text-gray-300">技术栈加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden meteor-container">
      {/* 流星雨浪漫背景 */}
      <MeteorBackground />

      {/* 主页面内容 */}
      <div className="relative z-10">
        {/* 头部英雄区域 */}
        <section id="section-0" className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* 标题区域 */}
            <div className="mb-12">
              <div className="text-8xl mb-6 animate-pulse">🚀</div>
              <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 mb-6 animate-fade-in content-glow">
                Next.js 全栈应用
              </h1>
              <div className="text-xl md:text-2xl text-gray-200 mb-8 h-16">
                <TypewriterText
                  texts={techStackTexts}
                  speed={80}
                  pauseTime={2500}
                  className="font-medium"
                />
              </div>
            </div>

            {/* CTA 按钮组 */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <StartProjectButton onClick={() => scrollToSection(1)} />
              <ViewTechStackButton onClick={() => scrollToSection(2)} />
              <ExploreArchitectureButton onClick={() => scrollToSection(3)} />
            </div>

            {/* 特色展示 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center p-6 glass-card rounded-2xl hover:bg-white/15">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="text-lg font-semibold text-white mb-2 content-glow">数据可视化</h3>
                <p className="text-gray-300 text-sm">用ECharts展示技术栈使用情况</p>
              </div>
              <div className="text-center p-6 glass-card rounded-2xl hover:bg-white/15">
                <div className="text-4xl mb-3">🏗️</div>
                <h3 className="text-lg font-semibold text-white mb-2 content-glow">架构设计</h3>
                <p className="text-gray-300 text-sm">现代化的全栈应用架构</p>
              </div>
              <div className="text-center p-6 glass-card rounded-2xl hover:bg-white/15 transition-all duration-300">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="text-lg font-semibold text-white mb-2 content-glow">性能优化</h3>
                <p className="text-gray-300 text-sm">极致的用户体验和加载速度</p>
              </div>
            </div>
          </div>
        </section>

        {/* 技术栈数据统计区域 */}
        <section id="section-1" className="min-h-screen py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 mb-6">
                🚀 技术栈数据分析
              </h2>
              <div className="text-lg text-gray-700 h-12">
                <TypewriterText
                  texts={[
                    '用数据驱动技术决策和优化 📈',
                    '每一个指标都反映项目质量 ⚡',
                    '现代化监控让应用更可靠 🛡️',
                  ]}
                  speed={60}
                  pauseTime={2000}
                  className="text-gray-600"
                />
              </div>
            </div>

            {/* 数据可视化网格 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
              {/* 技术栈使用统计 */}
              <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300 h-[420px]">
                <EChartsComponent option={techUsageOption} className="w-full h-full" />
              </div>

              {/* 项目开发进度 */}
              <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300 h-[420px]">
                <EChartsComponent option={projectProgressOption} className="w-full h-full" />
              </div>

              {/* 性能指标 */}
              <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300 h-[420px]">
                <EChartsComponent option={performanceOption} className="w-full h-full" />
              </div>

              {/* 代码提交活跃度 */}
              <div className="lg:col-span-2 bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300 h-[420px]">
                <EChartsComponent option={commitHeatmapOption} className="w-full h-full" />
              </div>

              {/* 技本成长轨迹 */}
              <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300 h-[420px]">
                <EChartsComponent option={techGrowthOption} className="w-full h-full" />
              </div>
            </div>
          </div>
        </section>

        {/* 技术架构可视化区域 */}
        <section id="section-2" className="min-h-screen py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-6">
                🏗️ 技术架构展示
              </h2>
              <div className="text-lg text-gray-700 h-12">
                <TypewriterText
                  texts={developmentTexts}
                  speed={70}
                  pauseTime={2500}
                  className="text-gray-600"
                />
              </div>
            </div>

            {/* 技术架构关系图 */}
            <div className="bg-white/15 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30 min-h-[700px]">
              <TechArchG6Component className="w-full h-full" />
              <p className="text-center text-gray-600 mt-4 text-sm">
                💡 提示：可以拖拽节点、缩放画布，探索技术架构关系
              </p>
            </div>
          </div>
        </section>

        {/* 开始项目区域 */}
        <section id="section-3" className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="text-8xl mb-8 animate-pulse">🚀</div>
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 mb-8">
              构建现代化应用
            </h2>
            <div className="text-xl md:text-2xl text-gray-700 mb-12 h-16">
              <TypewriterText
                texts={[
                  '每一行代码都值得精心雕琢 💻',
                  '让技术为产品赋能 ✨',
                  '打造属于未来的数字体验 🎯',
                ]}
                speed={90}
                pauseTime={2000}
                className="font-medium"
              />
            </div>

            {/* 技术特性卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <div className="text-5xl mb-4">🔐</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">安全可靠</h3>
                <p className="text-gray-600">企业级安全架构，JWT认证和Bcrypt密码加密</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">极致性能</h3>
                <p className="text-gray-600">服务端渲染、静态生成和Redis缓存优化</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">现代设计</h3>
                <p className="text-gray-600">响应式设计和流畅动画，提供一流用户体验</p>
              </div>
            </div>

            {/* 最终CTA */}
            <div className="space-y-6">
              <StartProjectButton onClick={() => alert('启动项目开发！')} />
              <p className="text-gray-600 text-sm">
                已有 <span className="text-cyan-600 font-semibold">1,000+</span>{' '}
                开发者选择我们的技术栈 🚀
              </p>
            </div>
          </div>
        </section>

        {/* 页脚 */}
        <footer className="py-12 px-4 bg-white/10 backdrop-blur-sm border-t border-white/20">
          <div className="container mx-auto text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 mb-4">
              Next.js 全栈应用
            </h3>
            <p className="text-gray-600 mb-6">用现代技术构建卓越产品，让每一行代码都有价值</p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>&copy; 2024 Next.js 全栈应用</span>
              <span>•</span>
              <span>现代化技术栈</span>
              <span>•</span>
              <span>构建未来的数字体验</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
