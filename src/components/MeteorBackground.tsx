'use client';

import { useEffect, useRef } from 'react';

/**
 * 流星背景组件
 * 创建浪漫的流星雨效果背景
 */
const MeteorBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meteorsRef = useRef<Meteor[]>([]);
  const animationFrameRef = useRef<number>(0);
  const wishMeteorsRef = useRef<Meteor[]>([]); // 许愿流星

  // 流星对象接口
  interface Meteor {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
    tail: { x: number; y: number; opacity: number }[];
    life: number;
    maxLife: number;
  }

  // 流星颜色配置
  const meteorColors = [
    '#ff6b9d', // 粉色
    '#c44ffa', // 紫色
    '#4facfe', // 蓝色
    '#43e97b', // 绿色
    '#fa709a', // 玫瑰色
    '#fee140', // 金色
    '#a8edea', // 青色
    '#fad0c4', // 桃色
  ];

  // 创建单个流星
  const createMeteor = (canvas: HTMLCanvasElement, isWish = false): Meteor => {
    const side = Math.random() * 4; // 随机从四个边进入
    let x, y, vx, vy;

    if (isWish) {
      // 许愿流星从左上角开始，向右下角移动
      x = -100;
      y = -100;
      vx = Math.random() * 8 + 6;
      vy = Math.random() * 8 + 6;
    } else {
      // 根据边缘位置设置初始位置和速度
      if (side < 1) {
        // 从上边进入
        x = Math.random() * canvas.width;
        y = -50;
        vx = (Math.random() - 0.5) * 4;
        vy = Math.random() * 3 + 2;
      } else if (side < 2) {
        // 从右边进入
        x = canvas.width + 50;
        y = Math.random() * canvas.height;
        vx = -(Math.random() * 3 + 2);
        vy = (Math.random() - 0.5) * 4;
      } else if (side < 3) {
        // 从左边进入
        x = -50;
        y = Math.random() * canvas.height;
        vx = Math.random() * 3 + 2;
        vy = (Math.random() - 0.5) * 4;
      } else {
        // 从对角线进入（更像流星）
        x = Math.random() * canvas.width * 0.3;
        y = -50;
        vx = Math.random() * 6 + 4;
        vy = Math.random() * 6 + 4;
      }
    }

    const maxLife = isWish ? 150 : Math.random() * 200 + 100;

    return {
      x,
      y,
      vx,
      vy,
      size: isWish ? Math.random() * 4 + 2 : Math.random() * 3 + 1,
      opacity: isWish ? 1 : Math.random() * 0.8 + 0.2,
      color: isWish ? '#ffd700' : meteorColors[Math.floor(Math.random() * meteorColors.length)],
      tail: [],
      life: maxLife,
      maxLife,
    };
  };

  // 更新流星
  const updateMeteor = (meteor: Meteor, canvas: HTMLCanvasElement) => {
    meteor.x += meteor.vx;
    meteor.y += meteor.vy;
    meteor.life--;

    // 添加尾迹点
    meteor.tail.unshift({
      x: meteor.x,
      y: meteor.y,
      opacity: meteor.opacity,
    });

    // 限制尾迹长度
    if (meteor.tail.length > 15) {
      meteor.tail.pop();
    }

    // 更新尾迹透明度
    meteor.tail.forEach((point, index) => {
      point.opacity = meteor.opacity * (1 - index / meteor.tail.length);
    });

    // 生命周期透明度变化
    if (meteor.life < meteor.maxLife * 0.3) {
      meteor.opacity *= 0.98;
    }

    // 检查是否超出边界或生命结束
    return (
      meteor.life > 0 &&
      meteor.x > -100 &&
      meteor.x < canvas.width + 100 &&
      meteor.y > -100 &&
      meteor.y < canvas.height + 100 &&
      meteor.opacity > 0.01
    );
  };

  // 绘制流星
  const drawMeteor = (ctx: CanvasRenderingContext2D, meteor: Meteor) => {
    // 绘制尾迹
    if (meteor.tail.length > 1) {
      const gradient = ctx.createLinearGradient(
        meteor.tail[0].x,
        meteor.tail[0].y,
        meteor.tail[meteor.tail.length - 1].x,
        meteor.tail[meteor.tail.length - 1].y
      );

      gradient.addColorStop(0, meteor.color);
      gradient.addColorStop(1, 'transparent');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = meteor.size;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(meteor.tail[0].x, meteor.tail[0].y);

      for (let i = 1; i < meteor.tail.length; i++) {
        ctx.lineTo(meteor.tail[i].x, meteor.tail[i].y);
      }

      ctx.stroke();
    }

    // 绘制流星头部光晕
    const glowGradient = ctx.createRadialGradient(
      meteor.x,
      meteor.y,
      0,
      meteor.x,
      meteor.y,
      meteor.size * 4
    );
    glowGradient.addColorStop(0, meteor.color);
    glowGradient.addColorStop(0.3, meteor.color + '80');
    glowGradient.addColorStop(1, 'transparent');

    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(meteor.x, meteor.y, meteor.size * 4, 0, Math.PI * 2);
    ctx.fill();

    // 绘制流星核心
    ctx.fillStyle = meteor.color;
    ctx.globalAlpha = meteor.opacity;
    ctx.beginPath();
    ctx.arc(meteor.x, meteor.y, meteor.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  };

  // 绘制星空背景
  const drawStarField = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // 创建星空渐变背景
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0f0f23');
    gradient.addColorStop(0.3, '#1a1a3e');
    gradient.addColorStop(0.6, '#2d1b69');
    gradient.addColorStop(1, '#1e0a2e');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制随机星星
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 1.5;
      const opacity = Math.random() * 0.8 + 0.2;

      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  // 动画循环
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制星空背景
    drawStarField(ctx, canvas);

    // 更新和绘制普通流星
    meteorsRef.current = meteorsRef.current.filter(meteor => {
      const isAlive = updateMeteor(meteor, canvas);
      if (isAlive) {
        drawMeteor(ctx, meteor);
      }
      return isAlive;
    });

    // 更新和绘制许愿流星
    wishMeteorsRef.current = wishMeteorsRef.current.filter(meteor => {
      const isAlive = updateMeteor(meteor, canvas);
      if (isAlive) {
        drawMeteor(ctx, meteor);
      }
      return isAlive;
    });

    // 随机添加新流星
    if (Math.random() < 0.03 && meteorsRef.current.length < 12) {
      meteorsRef.current.push(createMeteor(canvas, false));
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // 调整画布大小
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  // 创建许愿流星的函数
  const createWishMeteor = () => {
    const canvas = canvasRef.current;
    if (canvas && wishMeteorsRef.current.length < 3) {
      wishMeteorsRef.current.push(createMeteor(canvas, true));
    }
  };

  useEffect(() => {
    resizeCanvas();

    // 初始化一些流星
    const canvas = canvasRef.current;
    if (canvas) {
      for (let i = 0; i < 5; i++) {
        meteorsRef.current.push(createMeteor(canvas, false));
      }
    }

    animate();

    const handleResize = () => {
      resizeCanvas();
    };

    // 监听点击事件，创建许愿流星
    const handleClick = () => {
      createWishMeteor();
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 30%, #2d1b69 60%, #1e0a2e 100%)',
        pointerEvents: 'none',
      }}
    />
  );
};

export default MeteorBackground;
