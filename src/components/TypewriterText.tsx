'use client';

import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  texts: string[];
  speed?: number;
  pauseTime?: number;
  loop?: boolean;
  className?: string;
  onComplete?: () => void;
}

export default function TypewriterText({
  texts,
  speed = 100,
  pauseTime = 2000,
  loop = true,
  className = '',
  onComplete,
}: TypewriterTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentFullText = texts[currentTextIndex];
    let timeout: NodeJS.Timeout;

    const type = () => {
      if (isPaused) {
        timeout = setTimeout(() => {
          setIsPaused(false);
          if (isDeleting) {
            setIsDeleting(false);
            setCurrentTextIndex(prev => (prev + 1) % texts.length);
          } else {
            setIsDeleting(true);
          }
        }, pauseTime);
        return;
      }

      if (!isDeleting) {
        // 正在输入
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.slice(0, currentText.length + 1));
          timeout = setTimeout(type, speed);
        } else {
          // 输入完成，暂停
          setIsPaused(true);
          if (!loop && currentTextIndex === texts.length - 1) {
            onComplete?.();
            return;
          }
          timeout = setTimeout(type, pauseTime);
        }
      } else {
        // 正在删除
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
          timeout = setTimeout(type, speed / 2); // 删除速度更快
        } else {
          // 删除完成，暂停
          setIsPaused(true);
          timeout = setTimeout(type, pauseTime / 2);
        }
      }
    };

    timeout = setTimeout(type, speed);

    return () => {
      clearTimeout(timeout);
    };
  }, [
    currentText,
    currentTextIndex,
    isDeleting,
    isPaused,
    texts,
    speed,
    pauseTime,
    loop,
    onComplete,
  ]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// 预设技术栈主题文案
export const techStackTexts = [
  '用现代技术栈构建卓越的数字体验 🚀',
  'Next.js + React 19 打造极致性能 ⚡',
  'TypeScript 让代码更安全更可维护 💎',
  'Tailwind CSS 实现优雅的响应式设计 🎨',
  'Prisma + PostgreSQL 构建可靠的数据层 🛡️',
  'Redis 缓存提升应用响应速度 ⚡',
  'Three.js 带来炫酷的3D视觉效果 ✨',
];

export const developmentTexts = [
  '从需求分析到架构设计，每一步都精益求精 📋',
  '现代化的开发工具链提升开发效率 🔧',
  '持续集成与部署保障项目质量 🚀',
  '性能监控让每一毫秒都有价值 ⏱️',
  '技术创新驱动业务增长 📈',
];

// 保留原有的文案导出（向后兼容）
export const romanticTexts = techStackTexts;
export const milestoneTexts = developmentTexts;
