# ☁️ 构建云原生全栈应用：Next.js × Prisma × Neon 一小时速通实战

## 🎯 培训目标

- 快速了解 Next.js 现代全栈开发框架的基本用法
- 学会使用 Prisma 操作数据库
- 了解云原生数据库 Neon 并完成接入实践
- 实现一个最小可运行的全栈功能：从前端表单到后端 API，再到数据库存储

---

## 🧭 课程大纲（60分钟）

### ⏱️ 0-5 分钟：项目初始化与技术介绍

- 项目架构概览（Next.js + Prisma + Neon）
- 全栈开发核心流程介绍
- 创建 Next.js 项目：`npx create-next-app`
- TypeScript 支持建议

---

### ⏱️ 5-15 分钟：配置 Neon 云原生数据库

- 什么是 Neon？
- 注册与创建数据库
- 获取连接字符串
- 配置 `.env` 环境变量

---

### ⏱️ 15-30 分钟：使用 Prisma 建模与连接数据库

- 安装 Prisma：`npx prisma init`
- 编写数据模型（如 User 表）
- Prisma 命令使用：
  - `prisma migrate dev`
  - `prisma studio`
- Prisma Client 的生成与调用

---

### ⏱️ 30-45 分钟：Next.js 接口编写（API Routes）

- 新建 API 路由 `/api/users`
- 实现用户注册接口（POST）
- 接收前端数据，写入 Neon 数据库
- 使用 Prisma 进行增删改查

---

### ⏱️ 45-55 分钟：前端页面开发

- 简易表单页面（`pages/index.tsx`）
- 使用 `fetch` 提交表单数据
- 展示后端返回结果
- 把全栈流程串联起来

---

### ⏱️ 55-60 分钟：总结 & Q&A

- 核心技术回顾
- 推荐进阶方向（Auth.js、NextAuth、TRPC、PlanetScale 等）
- 提问与答疑

---

## 📂 项目结构简览
