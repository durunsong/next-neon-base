'use client';

import React, { useRef, useState } from 'react';
import { Carousel, Button } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';
import { 
  LeftOutlined, 
  RightOutlined,
  ThunderboltOutlined,
  SafetyOutlined,
  StarOutlined,
  RocketOutlined,
  GlobalOutlined,
  EyeOutlined
} from '@ant-design/icons';

interface CarSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  gradient: string;
  buttonText: string;
}

interface CarCarouselProps {
  className?: string;
}

const CarCarousel: React.FC<CarCarouselProps> = ({ className = '' }) => {
  const carouselRef = useRef<CarouselRef>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 汽车轮播数据
  const carSlides: CarSlide[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
      title: '极速性能',
      subtitle: '释放驾驶激情',
      description: '搭载最新V8双涡轮增压引擎，0-100km/h仅需2.8秒，让每一次启动都是肾上腺素的狂欢。',
      features: ['V8双涡轮增压', '650马力输出', '2.8秒破百', '320km/h极速'],
      icon: <ThunderboltOutlined />,
      gradient: 'from-red-600 via-red-500 to-orange-500',
      buttonText: '体验极速'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
      title: '安全至上',
      subtitle: '守护每一次出行',
      description: '获得Euro NCAP五星安全评级，配备全方位主动安全系统，让安全成为您最可靠的伙伴。',
      features: ['五星安全评级', '主动刹车系统', '360°防护', '智能预警'],
      icon: <SafetyOutlined />,
      gradient: 'from-blue-600 via-blue-500 to-cyan-500',
      buttonText: '了解安全'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
      title: '豪华内饰',
      subtitle: '奢华触手可及',
      description: '手工真皮座椅、碳纤维装饰、氛围灯系统，每一个细节都彰显着不凡的品味与格调。',
      features: ['手工真皮', '碳纤维装饰', '氛围灯系统', '按摩座椅'],
      icon: <StarOutlined />,
      gradient: 'from-purple-600 via-purple-500 to-pink-500',
      buttonText: '品味豪华'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
      title: '智能科技',
      subtitle: '引领未来出行',
      description: 'AI智能驾驶辅助、语音控制系统、无线充电等前沿科技，让驾驶变得更加智能便捷。',
      features: ['AI智能驾驶', '语音控制', '无线充电', '全息显示'],
      icon: <RocketOutlined />,
      gradient: 'from-green-600 via-green-500 to-emerald-500',
      buttonText: '探索科技'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
      title: '全球服务',
      subtitle: '尊享无忧体验',
      description: '遍布全球89个国家的服务网络，24小时专业支持，无论您身在何处都能享受顶级服务。',
      features: ['89国服务', '24H支持', '专业团队', '无忧保障'],
      icon: <GlobalOutlined />,
      gradient: 'from-indigo-600 via-indigo-500 to-blue-500',
      buttonText: '服务网络'
    }
  ];

  const goToPrev = () => {
    carouselRef.current?.prev();
  };

  const goToNext = () => {
    carouselRef.current?.next();
  };

  const handleAfterChange = (current: number) => {
    setCurrentSlide(current);
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>
      <Carousel
        ref={carouselRef}
        autoplay
        autoplaySpeed={6000}
        effect="fade"
        dots={false}
        infinite
        afterChange={handleAfterChange}
      >
        {carSlides.map((slide) => (
          <div key={slide.id}>
            <div className="relative w-full h-screen flex items-center justify-center">
              {/* 背景图片 */}
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  filter: 'brightness(0.4)'
                }}
              />
              
              {/* 渐变遮罩 */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-70`} />
              
              {/* 内容区域 */}
              <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="text-white space-y-6 text-center lg:text-left">
                    {/* 图标和标题 */}
                    <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm">
                        {slide.icon}
                      </div>
                      <div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">{slide.title}</h1>
                        <p className="text-xl md:text-2xl text-white/90">{slide.subtitle}</p>
                      </div>
                    </div>

                    {/* 描述 */}
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6">
                      {slide.description}
                    </p>

                    {/* 特性列表 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {slide.features.map((feature, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 hover:bg-white/20 transition-all duration-300"
                        >
                          <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                          <span className="text-white font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* 按钮 */}
                    <div className="flex justify-center lg:justify-start">
                      <Button
                        type="primary"
                        size="large"
                        icon={<EyeOutlined />}
                        className="h-14 px-8 text-lg font-semibold bg-white/20 border-white/30 text-white backdrop-blur-sm hover:bg-white/30 hover:scale-105 transition-all duration-300"
                        style={{ borderRadius: '8px' }}
                      >
                        {slide.buttonText}
                      </Button>
                    </div>
                  </div>

                  {/* 右侧装饰区域 */}
                  <div className="hidden lg:flex justify-center items-center">
                    <div className="relative">
                      <div className="w-80 h-80 border-4 border-white/20 rounded-full animate-spin-slow" />
                      <div className="absolute top-8 left-8 w-64 h-64 border-2 border-white/10 rounded-full animate-spin-reverse" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl text-white backdrop-blur-sm">
                          {slide.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* 导航按钮容器 */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* 左按钮 */}
        <div 
          className="absolute top-1/2 left-6 transform -translate-y-1/2 pointer-events-auto"
          style={{ zIndex: 50 }}
        >
          <button
            onClick={goToPrev}
            className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/30 text-white flex items-center justify-center text-xl hover:bg-white/30 hover:scale-110 transition-all duration-300 backdrop-blur-sm"
            style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
          >
            <LeftOutlined />
          </button>
        </div>

        {/* 右按钮 */}
        <div 
          className="absolute top-1/2 right-6 transform -translate-y-1/2 pointer-events-auto"
          style={{ zIndex: 50 }}
        >
          <button
            onClick={goToNext}
            className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/30 text-white flex items-center justify-center text-xl hover:bg-white/30 hover:scale-110 transition-all duration-300 backdrop-blur-sm"
            style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
          >
            <RightOutlined />
          </button>
        </div>
      </div>

      {/* 自定义指示器 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {carSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white/90 border-white scale-125' 
                : 'bg-white/30 border-white/50 hover:bg-white/60'
            }`}
            onClick={() => carouselRef.current?.goTo(index)}
          />
        ))}
      </div>

      {/* 滑动计数器 */}
      <div className="absolute bottom-8 right-8 text-white text-lg font-bold bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
        {String(currentSlide + 1).padStart(2, '0')} / {String(carSlides.length).padStart(2, '0')}
      </div>
    </div>
  );
};

export default CarCarousel;
