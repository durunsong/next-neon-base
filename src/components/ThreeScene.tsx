'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const carRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // 创建场景
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 100, 1000);
    sceneRef.current = scene;

    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // 将渲染器添加到DOM
    currentMount.appendChild(renderer.domElement);

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    // 添加主光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 50, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // 添加聚光灯
    const spotLight = new THREE.SpotLight(0x00ff00, 0.5);
    spotLight.position.set(0, 20, 0);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.1;
    spotLight.decay = 2;
    spotLight.distance = 200;
    scene.add(spotLight);

    // 创建简单的汽车模型
    const carGroup = new THREE.Group();
    carRef.current = carGroup;

    // 车身
    const bodyGeometry = new THREE.BoxGeometry(4, 1.5, 8);
    const bodyMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xff4444,
      transparent: true,
      opacity: 0.9
    });
    const carBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    carBody.position.y = 1;
    carBody.castShadow = true;
    carGroup.add(carBody);

    // 车顶
    const roofGeometry = new THREE.BoxGeometry(3, 1, 4);
    const roofMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const carRoof = new THREE.Mesh(roofGeometry, roofMaterial);
    carRoof.position.set(0, 2.25, -1);
    carRoof.castShadow = true;
    carGroup.add(carRoof);

    // 车轮
    const wheelGeometry = new THREE.CylinderGeometry(0.7, 0.7, 0.3, 16);
    const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });

    const wheels = [
      { x: -1.5, z: 2.5 },
      { x: 1.5, z: 2.5 },
      { x: -1.5, z: -2.5 },
      { x: 1.5, z: -2.5 }
    ];

    wheels.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.position.set(pos.x, 0.7, pos.z);
      wheel.rotation.z = Math.PI / 2;
      wheel.castShadow = true;
      carGroup.add(wheel);
    });

    // 车灯
    const lightGeometry = new THREE.SphereGeometry(0.2, 16, 8);
    const lightMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffff00
    });

    const headlights = [
      { x: -1.5, z: 4 },
      { x: 1.5, z: 4 }
    ];

    headlights.forEach(pos => {
      const light = new THREE.Mesh(lightGeometry, lightMaterial);
      light.position.set(pos.x, 1, pos.z);
      carGroup.add(light);
    });

    scene.add(carGroup);

    // 创建地面
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x333333,
      transparent: true,
      opacity: 0.3
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // 添加粒子系统（星空效果）
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 200;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ 
      color: 0xffffff, 
      size: 1,
      transparent: true,
      opacity: 0.8
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // 动画循环
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // 汽车慢慢旋转
      if (carRef.current) {
        carRef.current.rotation.y += 0.005;
        carRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.2;
      }

      // 星空旋转
      stars.rotation.y += 0.0002;

      // 相机围绕汽车运动
      const time = Date.now() * 0.0005;
      camera.position.x = Math.cos(time) * 20;
      camera.position.z = Math.sin(time) * 20;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 处理窗口大小变化
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="three-canvas"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default ThreeScene; 