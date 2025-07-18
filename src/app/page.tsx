'use client';

import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

// 导入情侣主题的图表配置
import {
  loveIndexOption,
  meetingsOption,
  messagesOption,
  milestonesOption,
  photosOption,
} from '@/components/CoupleChartsConfig';
import {
  RecordMomentButton,
  StartJourneyButton,
  ViewMemoriesButton,
} from '@/components/HeartButton';
// 导入浪漫主题组件
import MeteorBackground from '@/components/MeteorBackground';
import TypewriterText, { milestoneTexts, romanticTexts } from '@/components/TypewriterText';

// 动态导入组件，避免SSR问题
const EChartsComponent = dynamic(() => import('@/components/EChartsComponent'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin text-4xl">💕</div>
    </div>
  ),
});
const CoupleG6Component = dynamic(() => import('@/components/CoupleG6Component'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin text-4xl">🌟</div>
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
      <div className="min-h-screen romantic-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-heartbeat">💕</div>
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
            爱恋时光
          </h1>
          <p className="text-xl text-gray-600">加载中...</p>
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
              <div className="text-8xl mb-6 animate-float">💕</div>
              <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 mb-6 animate-fade-in content-glow">
                爱恋时光
              </h1>
              <div className="text-xl md:text-2xl text-gray-200 mb-8 h-16">
                <TypewriterText
                  texts={romanticTexts}
                  speed={80}
                  pauseTime={2500}
                  className="font-medium"
                />
              </div>
            </div>

            {/* CTA 按钮组 */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <StartJourneyButton onClick={() => scrollToSection(1)} />
              <RecordMomentButton onClick={() => scrollToSection(2)} />
              <ViewMemoriesButton onClick={() => scrollToSection(3)} />
            </div>

            {/* 特色展示 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center p-6 glass-card rounded-2xl hover:bg-white/15 transition-all duration-300 animate-sparkle">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="text-lg font-semibold text-white mb-2 content-glow">数据记录</h3>
                <p className="text-gray-300 text-sm">用图表记录你们的甜蜜数据</p>
              </div>
              <div className="text-center p-6 glass-card rounded-2xl hover:bg-white/15 transition-all duration-300 animate-sparkle animation-delay-300">
                <div className="text-4xl mb-3">🌟</div>
                <h3 className="text-lg font-semibold text-white mb-2 content-glow">情感轨迹</h3>
                <p className="text-gray-300 text-sm">可视化展示爱情成长历程</p>
              </div>
              <div className="text-center p-6 glass-card rounded-2xl hover:bg-white/15 transition-all duration-300 animate-sparkle animation-delay-600">
                <div className="text-4xl mb-3">💫</div>
                <h3 className="text-lg font-semibold text-white mb-2 content-glow">浪漫体验</h3>
                <p className="text-gray-300 text-sm">沉浸式的浪漫科技感界面</p>
              </div>
            </div>
          </div>
        </section>

        {/* 情侣数据统计区域 */}
        <section id="section-1" className="min-h-screen py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
                💖 我们的甜蜜数据
              </h2>
              <div className="text-lg text-gray-700 h-12">
                <TypewriterText
                  texts={[
                    '用数据见证我们的爱情成长 📈',
                    '每一个数字都是爱的证明 💕',
                    '科技让爱情更有温度 🌡️',
                  ]}
                  speed={60}
                  pauseTime={2000}
                  className="text-gray-600"
                />
              </div>
            </div>

            {/* 数据可视化网格 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
              {/* 见面次数统计 */}
              <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300 h-[420px]">
                <EChartsComponent option={meetingsOption} className="w-full h-full" />
              </div>

              {/* 拍照记录 */}
              <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300 h-[420px]">
                <EChartsComponent option={photosOption} className="w-full h-full" />
              </div>

              {/* 感情指数 */}
              <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300 h-[420px]">
                <EChartsComponent option={loveIndexOption} className="w-full h-full" />
              </div>

              {/* 消息互动热力图 */}
              <div className="lg:col-span-2 bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300 h-[420px]">
                <EChartsComponent option={messagesOption} className="w-full h-full" />
              </div>

              {/* 恋爱里程碑 */}
              <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300 h-[420px]">
                <EChartsComponent option={milestonesOption} className="w-full h-full" />
              </div>
            </div>
          </div>
        </section>

        {/* 情感轨迹可视化区域 */}
        <section id="section-2" className="min-h-screen py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-6">
                🌟 我们的情感轨迹
              </h2>
              <div className="text-lg text-gray-700 h-12">
                <TypewriterText
                  texts={milestoneTexts}
                  speed={70}
                  pauseTime={2500}
                  className="text-gray-600"
                />
              </div>
            </div>

            {/* 情感关系图 */}
            <div className="bg-white/15 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30 min-h-[700px]">
              <CoupleG6Component className="w-full h-full" />
              <p className="text-center text-gray-600 mt-4 text-sm">
                💡 提示：可以拖拽节点、缩放画布，探索我们的情感世界
              </p>
            </div>
          </div>
        </section>

        {/* 开始旅程区域 */}
        <section id="section-3" className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="text-8xl mb-8 animate-heartbeat">💕</div>
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-8">
              开始我们的爱情故事
            </h2>
            <div className="text-xl md:text-2xl text-gray-700 mb-12 h-16">
              <TypewriterText
                texts={[
                  '每一份爱都值得被记录 📝',
                  '让科技为爱情加分 ✨',
                  '创造属于你们的独特回忆 🎯',
                ]}
                speed={90}
                pauseTime={2000}
                className="font-medium"
              />
            </div>

            {/* 功能介绍卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <div className="text-5xl mb-4">🔐</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">安全私密</h3>
                <p className="text-gray-600">端到端加密保护，只有你们知道彼此的秘密</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <div className="text-5xl mb-4">📱</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">多端同步</h3>
                <p className="text-gray-600">手机、电脑完美同步，随时随地记录爱情</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">个性定制</h3>
                <p className="text-gray-600">自定义主题风格，打造专属的爱情空间</p>
              </div>
            </div>

            {/* 最终CTA */}
            <div className="space-y-6">
              <StartJourneyButton onClick={() => alert('开启爱情旅程！')} />
              <p className="text-gray-600 text-sm">
                已有 <span className="text-pink-600 font-semibold">10,000+</span>{' '}
                对情侣选择我们记录爱情 💕
              </p>
            </div>
          </div>
        </section>

        {/* 页脚 */}
        <footer className="py-12 px-4 bg-white/10 backdrop-blur-sm border-t border-white/20">
          <div className="container mx-auto text-center">
            <div className="text-4xl mb-4">💕</div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
              爱恋时光
            </h3>
            <p className="text-gray-600 mb-6">用科技记录爱情，让每一份美好都有迹可循</p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>&copy; 2024 爱恋时光</span>
              <span>•</span>
              <span>专为情侣设计</span>
              <span>•</span>
              <span>用心记录每一份爱</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
