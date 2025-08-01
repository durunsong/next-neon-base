'use client';

import { useState } from 'react';

interface HeartButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export default function HeartButton({
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}: HeartButtonProps) {
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
        return 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-xl';
      case 'secondary':
        return 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 shadow-lg hover:shadow-xl';
      case 'outline':
        return 'border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white bg-transparent';
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
      {/* 心跳动画背景 */}
      <div
        className={`
          absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 opacity-0 transition-opacity duration-300
          ${isHovered ? 'opacity-20' : 'opacity-0'}
        `}
      />

      {/* 点击时的涟漪效果 */}
      {isClicked && (
        <div className="absolute inset-0 bg-white opacity-30 animate-ping rounded-full" />
      )}

      {/* 悬浮时的爱心粒子效果 */}
      {isHovered && (
        <>
          <div className="absolute -top-1 -left-1 text-pink-300 animate-bounce">💕</div>
          <div className="absolute -top-1 -right-1 text-rose-300 animate-bounce animation-delay-150">
            ✨
          </div>
          <div className="absolute -bottom-1 -left-1 text-purple-300 animate-bounce animation-delay-300">
            💖
          </div>
          <div className="absolute -bottom-1 -right-1 text-pink-300 animate-bounce animation-delay-450">
            💫
          </div>
        </>
      )}

      {/* 按钮内容 */}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>

      {/* 心跳效果 */}
      <div
        className={`
          absolute inset-0 rounded-full border-2 border-current opacity-0 animate-pulse
          ${isHovered ? 'opacity-30' : 'opacity-0'}
        `}
      />
    </button>
  );
}

// 预设的情侣主题按钮组件
export function StartJourneyButton({ onClick }: { onClick?: () => void }) {
  return (
    <HeartButton onClick={onClick} variant="primary" size="lg">
      💕 开始我们的爱情旅程
    </HeartButton>
  );
}

export function RecordMomentButton({ onClick }: { onClick?: () => void }) {
  return (
    <HeartButton onClick={onClick} variant="secondary" size="md">
      📝 记录甜蜜时光
    </HeartButton>
  );
}

export function ViewMemoriesButton({ onClick }: { onClick?: () => void }) {
  return (
    <HeartButton onClick={onClick} variant="outline" size="md">
      💭 查看我们的回忆
    </HeartButton>
  );
}
