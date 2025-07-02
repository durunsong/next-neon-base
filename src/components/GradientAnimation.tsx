'use client';

import { useEffect, useRef } from 'react';

interface GradientAnimationProps {
  children: React.ReactNode;
  className?: string;
  type: 'text' | 'button' | 'button-alt';
  speed?: number; // 动画速度，单位秒
}

// 扩展HTMLDivElement接口，添加animation属性
declare global {
  interface HTMLDivElement {
    animation?: ReturnType<typeof setInterval>;
    animationFrame?: number;
  }
}

export default function GradientAnimation({
  children,
  className = '',
  type,
  speed = 10,
}: GradientAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // 设置初始样式
    if (type === 'text') {
      element.style.backgroundSize = '200% 100%';
      element.style.backgroundClip = 'text';
      element.style.webkitBackgroundClip = 'text';
      element.style.color = 'transparent';
    } else {
      element.style.backgroundSize = '200% 100%';

      // 为第二种按钮添加边框渐变效果
      if (type === 'button-alt') {
        element.style.borderWidth = '1px';
        element.style.borderStyle = 'solid';
      }
    }

    // 渐变序列 - 根据类型选择不同的渐变序列
    let gradientSequence;
    if (type === 'text') {
      gradientSequence = [
        'linear-gradient(to right, #4f46e5, #6366f1, #818cf8, #4f46e5)',
        'linear-gradient(to right, #4f46e5, #6366f1, #60a5fa, #3b82f6)',
        'linear-gradient(to right, #3b82f6, #60a5fa, #93c5fd, #3b82f6)',
        'linear-gradient(to right, #3b82f6, #93c5fd, #a78bfa, #8b5cf6)',
        'linear-gradient(to right, #8b5cf6, #a78bfa, #c084fc, #8b5cf6)',
        'linear-gradient(to right, #8b5cf6, #c084fc, #f472b6, #ec4899)',
        'linear-gradient(to right, #ec4899, #f472b6, #f9a8d4, #ec4899)',
        'linear-gradient(to right, #ec4899, #f9a8d4, #818cf8, #4f46e5)',
      ];
    } else if (type === 'button') {
      gradientSequence = [
        'linear-gradient(to right, #4f46e5, #6366f1, #818cf8, #4f46e5)',
        'linear-gradient(to right, #3b82f6, #60a5fa, #93c5fd, #3b82f6)',
        'linear-gradient(to right, #8b5cf6, #a78bfa, #c084fc, #8b5cf6)',
        'linear-gradient(to right, #ec4899, #f472b6, #f9a8d4, #ec4899)',
      ];
    } else {
      // button-alt 使用透明度较低的渐变
      gradientSequence = [
        'linear-gradient(to right, rgba(79, 70, 229, 0.1), rgba(99, 102, 241, 0.1), rgba(129, 140, 248, 0.1), rgba(79, 70, 229, 0.1))',
        'linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(96, 165, 250, 0.1), rgba(147, 197, 253, 0.1), rgba(59, 130, 246, 0.1))',
        'linear-gradient(to right, rgba(139, 92, 246, 0.1), rgba(167, 139, 250, 0.1), rgba(192, 132, 252, 0.1), rgba(139, 92, 246, 0.1))',
        'linear-gradient(to right, rgba(236, 72, 153, 0.1), rgba(244, 114, 182, 0.1), rgba(249, 168, 212, 0.1), rgba(236, 72, 153, 0.1))',
      ];
    }

    // 边框颜色序列 - 仅用于 button-alt
    const borderColorSequence =
      type === 'button-alt'
        ? [
            'rgba(79, 70, 229, 0.3)',
            'rgba(59, 130, 246, 0.3)',
            'rgba(139, 92, 246, 0.3)',
            'rgba(236, 72, 153, 0.3)',
          ]
        : [];

    // 初始渐变
    let currentIndex = 0;
    element.style.backgroundImage = gradientSequence[currentIndex];

    if (type === 'button-alt') {
      element.style.borderColor = borderColorSequence[currentIndex];
    }

    // 动画函数 - UnoCSS 风格的渐变过渡
    const animateGradient = () => {
      // 更新索引
      currentIndex = (currentIndex + 1) % gradientSequence.length;

      // 应用新渐变
      element.style.backgroundImage = gradientSequence[currentIndex];

      // 为 button-alt 更新边框颜色
      if (type === 'button-alt') {
        element.style.borderColor = borderColorSequence[currentIndex];
      }

      // 创建背景位置动画
      let position = 0;
      const positionAnimation = () => {
        // 从左到右移动背景位置
        position += 1;
        element.style.backgroundPosition = `${position}% 0%`;

        if (position < 100) {
          // 继续动画
          requestAnimationFrame(positionAnimation);
        }
      };

      // 开始背景位置动画
      requestAnimationFrame(positionAnimation);
    };

    // 设置主循环定时器
    const mainTimer = setInterval(animateGradient, speed * 1000);

    // 立即开始第一次动画
    setTimeout(() => {
      // 设置初始背景位置
      element.style.backgroundPosition = '0% 0%';
      // 添加过渡效果
      element.style.transition =
        'background-position 3s ease-in-out, background-image 3s ease-in-out, border-color 3s ease-in-out';
      // 开始第一次动画
      animateGradient();
    }, 100);

    // 清理
    return () => {
      clearInterval(mainTimer);
    };
  }, [type, speed]);

  return (
    <div ref={elementRef} className={`${className}`}>
      {children}
    </div>
  );
}
