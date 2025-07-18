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

// 预设情侣主题文案
export const romanticTexts = [
  '每一个相遇都是命运的安排 💕',
  '记录我们的每一份甜蜜时光 ✨',
  '爱情不是寻找完美的人，而是学会用完美的眼光看待不完美的人 💖',
  '在茫茫人海中遇见你，是我此生最美的幸运 🌟',
  '愿我们的爱情像星空一样，永远闪闪发光 ⭐',
  '每一次心跳都在为你而跳动 💓',
  '你是我生命中最美的意外 🌸',
];

export const milestoneTexts = [
  '从陌生到熟悉，从相识到相爱 💫',
  '每一个里程碑都是我们爱情的见证 📖',
  '时间见证了我们的成长和深情 🕰️',
  '愿时光不老，我们不散 🌈',
  '在爱的时光里，每一天都是纪念日 🎂',
];
