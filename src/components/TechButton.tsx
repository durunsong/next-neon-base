'use client';

import { useState } from 'react';

interface TechButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export default function TechButton({
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}: TechButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (disabled) return;

    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    onClick?.();
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl';
      case 'secondary':
        return 'bg-gradient-to-r from-purple-500 to-violet-500 text-white hover:from-purple-600 hover:to-violet-600 shadow-lg hover:shadow-xl';
      case 'outline':
        return 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white bg-transparent';
      default:
        return '';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return '';
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      className={`
        relative overflow-hidden rounded-full font-semibold transition-all duration-300 transform
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${isHovered ? 'scale-105' : 'scale-100'}
        ${isClicked ? 'scale-95' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {/* 科技光效背景 */}
      <div
        className={`
          absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 transition-opacity duration-300
          ${isHovered ? 'opacity-20' : 'opacity-0'}
        `}
      />

      {/* 点击时的脉冲效果 */}
      {isClicked && (
        <div className="absolute inset-0 bg-white opacity-30 animate-ping rounded-full" />
      )}

      {/* 悬浮时的科技粒子效果 */}
      {isHovered && (
        <>
          <div className="absolute -top-1 -left-1 text-cyan-300 animate-bounce">⚡</div>
          <div className="absolute -top-1 -right-1 text-blue-300 animate-bounce animation-delay-150">
            🚀
          </div>
          <div className="absolute -bottom-1 -left-1 text-purple-300 animate-bounce animation-delay-300">
            💎
          </div>
          <div className="absolute -bottom-1 -right-1 text-cyan-300 animate-bounce animation-delay-450">
            ✨
          </div>
        </>
      )}

      {/* 按钮内容 */}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>

      {/* 科技脉冲效果 */}
      <div
        className={`
          absolute inset-0 rounded-full border-2 border-current opacity-0 animate-pulse
          ${isHovered ? 'opacity-30' : 'opacity-0'}
        `}
      />
    </button>
  );
}

// 预设的技术栈主题按钮组件
export function StartProjectButton({ onClick }: { onClick?: () => void }) {
  return (
    <TechButton onClick={onClick} variant="primary" size="lg">
      🚀 启动项目开发
    </TechButton>
  );
}

export function ViewTechStackButton({ onClick }: { onClick?: () => void }) {
  return (
    <TechButton onClick={onClick} variant="secondary" size="md">
      💻 查看技术栈
    </TechButton>
  );
}

export function ExploreArchitectureButton({ onClick }: { onClick?: () => void }) {
  return (
    <TechButton onClick={onClick} variant="outline" size="md">
      🏗️ 探索架构设计
    </TechButton>
  );
}
