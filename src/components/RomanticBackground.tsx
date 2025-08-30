'use client';

import * as THREE from 'three';

import { useEffect, useRef } from 'react';

interface RomanticBackgroundProps {
  className?: string;
}

export default function RomanticBackground({ className }: RomanticBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 创建场景
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // 透明背景
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // 创建爱心粒子背景系统
    const heartParticlesGeometry = new THREE.BufferGeometry();
    const heartParticlesCount = 800;
    const heartPositions = new Float32Array(heartParticlesCount * 3);
    const heartColors = new Float32Array(heartParticlesCount * 3);
    const heartSizes = new Float32Array(heartParticlesCount);
    const heartVelocities = new Float32Array(heartParticlesCount * 3);

    for (let i = 0; i < heartParticlesCount; i++) {
      // 位置
      heartPositions[i * 3] = (Math.random() - 0.5) * 200;
      heartPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      heartPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      // 爱心粒子颜色（粉色系渐变）
      const colorIntensity = Math.random();
      heartColors[i * 3] = 1.0; // R
      heartColors[i * 3 + 1] = 0.2 + colorIntensity * 0.6; // G
      heartColors[i * 3 + 2] = 0.4 + colorIntensity * 0.4; // B

      // 大小
      heartSizes[i] = Math.random() * 3 + 1;

      // 速度
      heartVelocities[i * 3] = (Math.random() - 0.5) * 0.02;
      heartVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      heartVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    heartParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(heartPositions, 3));
    heartParticlesGeometry.setAttribute('color', new THREE.BufferAttribute(heartColors, 3));
    heartParticlesGeometry.setAttribute('size', new THREE.BufferAttribute(heartSizes, 1));

    const heartParticlesMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });

    const heartParticlesSystem = new THREE.Points(heartParticlesGeometry, heartParticlesMaterial);
    scene.add(heartParticlesSystem);

    // 创建3D人物动画 - 两个人拥抱牵手比心
    const createPerson = (color: number, position: THREE.Vector3) => {
      const personGroup = new THREE.Group();

      // 头部
      const headGeometry = new THREE.SphereGeometry(1.2, 16, 16);
      const headMaterial = new THREE.MeshPhongMaterial({
        color: color,
        shininess: 50,
        transparent: true,
        opacity: 0.9,
      });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.set(0, 4, 0);
      personGroup.add(head);

      // 身体
      const bodyGeometry = new THREE.CylinderGeometry(0.8, 1.2, 3, 8);
      const bodyMaterial = new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.set(0, 1.5, 0);
      personGroup.add(body);

      // 手臂（用于拥抱和比心）
      const armGeometry = new THREE.CylinderGeometry(0.3, 0.4, 2.5, 8);
      const armMaterial = new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
      });

      // 左手臂
      const leftArm = new THREE.Mesh(armGeometry, armMaterial);
      leftArm.position.set(-1.5, 2.5, 0);
      leftArm.rotation.z = -Math.PI / 6;
      personGroup.add(leftArm);

      // 右手臂
      const rightArm = new THREE.Mesh(armGeometry, armMaterial);
      rightArm.position.set(1.5, 2.5, 0);
      rightArm.rotation.z = Math.PI / 6;
      personGroup.add(rightArm);

      // 手掌
      const handGeometry = new THREE.SphereGeometry(0.4, 8, 8);
      const handMaterial = new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        opacity: 0.9,
      });

      const leftHand = new THREE.Mesh(handGeometry, handMaterial);
      leftHand.position.set(-2.5, 1.2, 0.5);
      personGroup.add(leftHand);

      const rightHand = new THREE.Mesh(handGeometry, handMaterial);
      rightHand.position.set(2.5, 1.2, 0.5);
      personGroup.add(rightHand);

      personGroup.position.copy(position);
      return { personGroup, leftArm, rightArm, leftHand, rightHand, head };
    };

    // 创建两个人物
    const person1 = createPerson(0xff6b9d, new THREE.Vector3(-3, 0, 0)); // 粉色
    const person2 = createPerson(0x6b9aff, new THREE.Vector3(3, 0, 0)); // 蓝色

    scene.add(person1.personGroup);
    scene.add(person2.personGroup);

    // 创建爱心形状（用于比心动作）
    const heartShape = new THREE.Shape();
    const hx = 0,
      hy = 0;
    heartShape.moveTo(hx + 1, hy + 1);
    heartShape.bezierCurveTo(hx + 1, hx + 1, hx + 0.8, hy, hx, hy);
    heartShape.bezierCurveTo(hx - 1.2, hy, hx - 1.2, hy + 0.7, hx - 1.2, hy + 0.7);
    heartShape.bezierCurveTo(hx - 1.2, hy + 1.1, hx - 0.8, hy + 1.54, hx, hy + 2);
    heartShape.bezierCurveTo(hx + 0.8, hy + 1.54, hx + 1.2, hy + 1.1, hx + 1.2, hy + 0.7);
    heartShape.bezierCurveTo(hx + 1.2, hy + 0.7, hx + 1.2, hy, hx, hy);

    const heartGeometry = new THREE.ShapeGeometry(heartShape);
    const heartMaterial = new THREE.MeshBasicMaterial({
      color: 0xff1493,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });

    const heart3D = new THREE.Mesh(heartGeometry, heartMaterial);
    heart3D.position.set(0, 6, 1);
    heart3D.scale.set(0, 0, 0); // 初始隐藏
    scene.add(heart3D);

    // 创建浪漫的连接线（连接两个人物）
    const connectionGeometry = new THREE.BufferGeometry();
    const connectionPositions = [];
    const connectionColors = [];

    // 创建弧形连接线
    for (let i = 0; i <= 50; i++) {
      const progress = i / 50;
      const x = (progress - 0.5) * 6; // 从-3到3
      const y = Math.sin(progress * Math.PI) * 3 + 2; // 弧形
      const z = 0;

      connectionPositions.push(x, y, z);

      // 渐变颜色（从粉色到蓝色）
      const color = new THREE.Color();
      color.setHSL(0.8 + progress * 0.15, 0.8, 0.7);
      connectionColors.push(color.r, color.g, color.b);
    }

    connectionGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(connectionPositions), 3)
    );
    connectionGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(new Float32Array(connectionColors), 3)
    );

    const connectionMaterial = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });

    const connectionLine = new THREE.Points(connectionGeometry, connectionMaterial);
    scene.add(connectionLine);

    // 添加增强的光源系统
    const ambientLight = new THREE.AmbientLight(0x2a1a3a, 0.3);
    scene.add(ambientLight);

    // 主光源跟随星球
    const pointLight1 = new THREE.PointLight(0xff6b9d, 2, 150);
    pointLight1.position.set(-20, 0, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x6b9aff, 2, 150);
    pointLight2.position.set(20, 0, 10);
    scene.add(pointLight2);

    // 添加聚光灯效果
    const spotLight1 = new THREE.SpotLight(0xff69b4, 1.5, 100, Math.PI / 6, 0.3);
    spotLight1.position.set(0, 50, 30);
    spotLight1.target.position.set(0, 0, 0);
    scene.add(spotLight1);
    scene.add(spotLight1.target);

    // 添加方向光模拟月光
    const directionalLight = new THREE.DirectionalLight(0xb19cd9, 0.5);
    directionalLight.position.set(-50, 50, 50);
    scene.add(directionalLight);

    // 添加雾效增强景深
    scene.fog = new THREE.FogExp2(0x0a0a1a, 0.002);

    // 情侣动画函数
    let time = 0;
    let animationPhase = 0; // 0: 拥抱, 1: 牵手, 2: 比心
    let phaseTime = 0;
    const phaseDuration = 4; // 每个阶段4秒

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      time += 0.02;
      phaseTime += 0.02;

      // 切换动画阶段
      if (phaseTime >= phaseDuration) {
        phaseTime = 0;
        animationPhase = (animationPhase + 1) % 3;
      }

      // 爱心粒子背景动画
      const heartPositions = heartParticlesSystem.geometry.attributes.position;
      const heartColors = heartParticlesSystem.geometry.attributes.color;

      for (let i = 0; i < heartParticlesCount; i++) {
        // 粒子流动
        let x = heartPositions.getX(i) + heartVelocities[i * 3];
        let y = heartPositions.getY(i) + heartVelocities[i * 3 + 1];
        let z = heartPositions.getZ(i) + heartVelocities[i * 3 + 2];

        // 边界循环
        if (x > 100) x = -100;
        if (x < -100) x = 100;
        if (y > 100) y = -100;
        if (y < -100) y = 100;
        if (z > 50) z = -50;
        if (z < -50) z = 50;

        // 添加波动
        y += Math.sin(time + i * 0.1) * 0.5;

        heartPositions.setX(i, x);
        heartPositions.setY(i, y);
        heartPositions.setZ(i, z);

        // 颜色脉动
        if (i % 20 === Math.floor(time * 10) % 20) {
          const pulse = Math.sin(time * 3 + i * 0.1) * 0.3 + 0.7;
          heartColors.setX(i, pulse);
          heartColors.setY(i, pulse * 0.6);
          heartColors.setZ(i, pulse * 0.8);
        }
      }
      heartPositions.needsUpdate = true;
      heartColors.needsUpdate = true;

      // 连接线动画
      connectionLine.rotation.y += 0.005;

      // 人物动画根据阶段
      const progress = phaseTime / phaseDuration;

      if (animationPhase === 0) {
        // 拥抱阶段
        const hugDistance = 6 - Math.sin(progress * Math.PI) * 2;
        person1.personGroup.position.x = -hugDistance / 2;
        person2.personGroup.position.x = hugDistance / 2;

        // 手臂拥抱动作
        person1.rightArm.rotation.z = Math.PI / 6 + (Math.sin(progress * Math.PI) * Math.PI) / 3;
        person2.leftArm.rotation.z = -Math.PI / 6 - (Math.sin(progress * Math.PI) * Math.PI) / 3;

        // 隐藏比心
        heart3D.scale.set(0, 0, 0);
      } else if (animationPhase === 1) {
        // 牵手阶段
        person1.personGroup.position.x = -2.5;
        person2.personGroup.position.x = 2.5;

        // 手臂伸向中间
        person1.rightArm.rotation.z = Math.PI / 4;
        person1.rightHand.position.set(1, 2, 0.5);

        person2.leftArm.rotation.z = -Math.PI / 4;
        person2.leftHand.position.set(-1, 2, 0.5);

        // 隐藏比心
        heart3D.scale.set(0, 0, 0);
      } else if (animationPhase === 2) {
        // 比心阶段
        person1.personGroup.position.x = -3;
        person2.personGroup.position.x = 3;

        // 比心手势
        person1.rightArm.rotation.z = Math.PI / 3;
        person1.leftArm.rotation.z = -Math.PI / 3;
        person1.rightHand.position.set(1.5, 4, 1);
        person1.leftHand.position.set(-0.5, 4, 1);

        person2.rightArm.rotation.z = Math.PI / 3;
        person2.leftArm.rotation.z = -Math.PI / 3;
        person2.rightHand.position.set(0.5, 4, 1);
        person2.leftHand.position.set(-1.5, 4, 1);

        // 显示爱心
        const heartScale = Math.sin(progress * Math.PI) * 2;
        heart3D.scale.set(heartScale, heartScale, heartScale);
        heart3D.rotation.z += 0.02;
      }

      // 人物呼吸效果
      const breathe = Math.sin(time * 2) * 0.05 + 1;
      person1.personGroup.scale.set(breathe, breathe, breathe);
      person2.personGroup.scale.set(breathe, breathe, breathe);

      // 头部轻微摆动
      person1.head.rotation.y = Math.sin(time * 1.5) * 0.1;
      person2.head.rotation.y = Math.sin(time * 1.5 + Math.PI) * 0.1;

      // 光源动画
      pointLight1.intensity = 1.5 + Math.sin(time) * 0.5;
      pointLight2.intensity = 1.5 + Math.cos(time) * 0.5;
      spotLight1.intensity = 1 + Math.sin(time * 0.7) * 0.3;

      renderer.render(scene, camera);
    };

    // 处理窗口大小变化
    const handleResize = () => {
      if (!renderer || !mountRef.current) return;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // 清理函数 - 保存当前的 ref 值以避免闭包问题
    const currentMount = mountRef.current;
    return () => {
      window.removeEventListener('resize', handleResize);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }

      // 清理 Three.js 资源
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`fixed top-0 left-0 w-full h-full -z-10 ${className || ''}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}
