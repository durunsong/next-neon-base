'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Spin, Typography } from 'antd';
import { 
  RotateRightOutlined, 
  PauseOutlined, 
  PlayCircleOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Text } = Typography;

interface CarImageViewerProps {
  className?: string;
}

const CarImageViewer: React.FC<CarImageViewerProps> = ({ className }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartIndex, setDragStartIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 汽车图片数组 - 使用更真实的汽车图片
  const carImages = React.useMemo(() => {
    const images = [];
    // 使用真实的汽车图片（这里使用unsplash的汽车图片作为示例）
    
    // 不同角度的汽车图片URL（使用Unsplash的汽车图片）
    const carImageUrls = [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1546768292-fb12f6c92568?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&crop=center&auto=format&q=80'
    ];

    for (let i = 0; i < 36; i++) {
      const angle = i * 10;
      const imageUrl = carImageUrls[i % carImageUrls.length];
      images.push({
        src: imageUrl,
        angle: angle,
        alt: `极速汽车 ${angle}度视角`
      });
    }
    return images;
  }, []);

  // 确保组件在客户端渲染
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 预加载图片
  useEffect(() => {
    setIsLoading(true);
    let loadedCount = 0;
    const totalImages = carImages.length;

    carImages.forEach((imageData) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setIsLoading(false);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setIsLoading(false);
        }
      };
      img.src = imageData.src;
    });
  }, [carImages]);

  // 自动旋转
  useEffect(() => {
    if (isAutoRotating && !isDragging) {
      autoRotateRef.current = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % carImages.length);
      }, 300); // 每100ms切换一张图片，更流畅
    } else {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
        autoRotateRef.current = null;
      }
    }

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
        autoRotateRef.current = null;
      }
    };
  }, [isAutoRotating, isDragging, carImages.length]);

  // 鼠标拖拽开始
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    setDragStartX(e.clientX);
    setDragStartIndex(currentImageIndex);
  }, [currentImageIndex]);

  // 鼠标拖拽移动
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartX;
    const sensitivity = 4; // 提高灵敏度
    const indexChange = Math.round(deltaX / sensitivity);
    const newIndex = (dragStartIndex - indexChange + carImages.length) % carImages.length;
    
    setCurrentImageIndex(newIndex);
  }, [isDragging, dragStartX, dragStartIndex, carImages.length]);

  // 鼠标拖拽结束
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 触摸事件处理
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    setDragStartX(e.touches[0].clientX);
    setDragStartIndex(currentImageIndex);
  }, [currentImageIndex]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;

    const deltaX = e.touches[0].clientX - dragStartX;
    const sensitivity = 4;
    const indexChange = Math.round(deltaX / sensitivity);
    const newIndex = (dragStartIndex - indexChange + carImages.length) % carImages.length;
    
    setCurrentImageIndex(newIndex);
  }, [isDragging, dragStartX, dragStartIndex, carImages.length]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 手动控制
  const goToPrevious = () => {
    setIsAutoRotating(false);
    setCurrentImageIndex(prev => (prev - 1 + carImages.length) % carImages.length);
  };

  const goToNext = () => {
    setIsAutoRotating(false);
    setCurrentImageIndex(prev => (prev + 1) % carImages.length);
  };

  const toggleAutoRotate = () => {
    setIsAutoRotating(!isAutoRotating);
  };

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className || ''}`}>
      {/* 加载状态 */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="text-center text-white">
            <Spin size="large" />
            <div className="mt-4">
              <Text className="text-white text-lg">加载极速汽车中...</Text>
            </div>
          </div>
        </div>
      )}

      {/* 主图片容器 */}
      <div 
        ref={containerRef}
        className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.img
          key={currentImageIndex}
          src={carImages[currentImageIndex]?.src}
          alt={carImages[currentImageIndex]?.alt}
          className="w-full h-full object-cover"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          draggable={false}
          style={{ 
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4)) brightness(1.1) contrast(1.1)',
          }}
        />

        {/* 360度旋转提示 */}
        <motion.div 
          className="absolute top-8 left-8 bg-gradient-to-r from-red-500 to-blue-500 text-white px-4 py-3 rounded-xl text-sm font-semibold shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <RotateRightOutlined className="mr-2" />
          360° 极速展示
        </motion.div>

        {/* 角度指示器 */}
        <motion.div 
          className="absolute top-8 right-8 bg-black bg-opacity-80 text-white px-4 py-3 rounded-xl text-lg font-bold shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          {carImages[currentImageIndex]?.angle}°
        </motion.div>

        {/* 左右切换按钮 */}
        <motion.div
          className="absolute left-8 top-1/2 transform -translate-y-1/2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            type="text"
            icon={<LeftOutlined />}
            className="bg-black bg-opacity-60 text-white border-none hover:bg-opacity-80 w-14 h-14 rounded-full flex items-center justify-center"
            onClick={goToPrevious}
            size="large"
          />
        </motion.div>

        <motion.div
          className="absolute right-8 top-1/2 transform -translate-y-1/2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            type="text"
            icon={<RightOutlined />}
            className="bg-black bg-opacity-60 text-white border-none hover:bg-opacity-80 w-14 h-14 rounded-full flex items-center justify-center"
            onClick={goToNext}
            size="large"
          />
        </motion.div>

        {/* 底部控制栏 */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 rounded-2xl px-6 py-4 flex items-center space-x-6 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <Button
            type="text"
            icon={isAutoRotating ? <PauseOutlined /> : <PlayCircleOutlined />}
            className="text-white border-none flex items-center space-x-2 hover:text-blue-400"
            onClick={toggleAutoRotate}
          >
            <span className="hidden sm:inline">
              {isAutoRotating ? '暂停旋转' : '开始旋转'}
            </span>
          </Button>

          <div className="text-white text-base font-medium">
            {currentImageIndex + 1} / {carImages.length}
          </div>

          {/* 进度条 */}
          <div className="w-32 bg-gray-600 rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-red-500 to-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentImageIndex + 1) / carImages.length) * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>

        {/* 拖拽提示 */}
        {!isDragging && !isAutoRotating && (
          <motion.div
            className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-white text-base bg-black bg-opacity-70 px-4 py-2 rounded-xl shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            🖱️ 拖拽查看不同角度
          </motion.div>
        )}

        {/* 极速汽车品牌标识 */}
        <motion.div
          className="absolute bottom-8 left-8 text-white text-xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 2.5 }}
        >
          <span className="gradient-text">极速汽车</span>
        </motion.div>
      </div>

      {/* 背景粒子效果 - 只在客户端渲染 */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-40"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, -150],
                opacity: [0.4, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarImageViewer; 