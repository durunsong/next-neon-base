# 认证功能说明

## 🚀 功能概述

我们已经成功为项目添加了完整的用户认证系统，包括：

- ✅ 用户注册和登录
- ✅ JWT Token 认证
- ✅ Cookie 状态管理
- ✅ Zustand 全局状态管理
- ✅ Ant Design 精美UI组件
- ✅ 服务器端认证API
- ✅ 客户端状态持久化

## 📱 界面功能

### 登录/注册按钮

- 位置：导航栏右侧
- 未登录时显示："登录 / 注册"按钮
- 已登录时显示：用户头像和下拉菜单

### 认证弹窗

- 🎨 模仿提供的设计图片
- 📱 响应式设计，支持桌面和移动端
- 🔄 标签页切换（登录/注册）
- ✨ 精美的表单验证和错误提示

### 用户状态显示

- 欢迎消息：`欢迎，{用户名}!`
- 用户头像（支持自定义头像）
- 下拉菜单：个人资料、设置、登出

## 🔐 测试账户

### 测试用户

- **邮箱**: `test@example.com`
- **密码**: `123456`
- **角色**: 普通用户

### 管理员用户

- **邮箱**: `admin@example.com`
- **密码**: `admin123`
- **角色**: 管理员

## 🛠️ 技术栈

### 前端

- **Ant Design**: UI组件库
- **Zustand**: 状态管理
- **js-cookie**: Cookie管理
- **Tailwind CSS**: 样式框架

### 后端

- **Next.js API Routes**: 服务器端API
- **bcryptjs**: 密码加密
- **jsonwebtoken**: JWT Token生成
- **Prisma**: 数据库ORM

## 📁 文件结构

```
src/
├── store/
│   └── authStore.ts           # Zustand认证状态管理
├── components/
│   ├── AuthModal.tsx          # 登录注册弹窗
│   └── Navigation.tsx         # 导航栏（已更新）
├── app/api/auth/
│   ├── login/route.ts         # 登录API
│   ├── register/route.ts      # 注册API
│   └── logout/route.ts        # 登出API
└── app/globals.css            # 全局样式（已更新）
```

## 🔄 认证流程

### 1. 用户注册

```
用户填写表单 → 前端验证 → API验证 → 密码加密 → 存储到数据库 → 返回成功
```

### 2. 用户登录

```
用户输入邮箱密码 → 验证用户存在 → 验证密码 → 生成JWT → 设置Cookie → 更新状态
```

### 3. 状态持久化

```
登录成功 → 存储到Zustand → 同步到Cookie → 页面刷新自动恢复状态
```

### 4. 用户登出

```
点击登出 → 调用登出API → 清除Cookie → 重置状态 → 跳转首页
```

## 🛡️ 安全特性

### 密码安全

- 使用 bcryptjs 进行密码哈希
- Salt轮数：12轮（高安全级别）
- 明文密码不存储

### Token安全

- JWT Token 24小时过期
- 包含用户ID、邮箱、角色信息
- 支持自定义签名密钥

### Cookie安全

- SameSite: 'strict' 防止CSRF
- 生产环境自动启用 Secure
- 24小时过期时间

## 🎯 使用指南

### 1. 启动项目

```bash
pnpm dev
```

### 2. 访问网站

打开 `http://localhost:3000`

### 3. 测试登录

- 点击导航栏的"登录 / 注册"按钮
- 使用测试账户登录：
  - 邮箱：test@example.com
  - 密码：123456

### 4. 测试注册

- 切换到"注册"标签页
- 填写新用户信息
- 注册成功后会提示切换到登录

### 5. 测试登出

- 登录后点击用户头像
- 选择"登出"选项

## 📊 API 接口

### POST /api/auth/login

登录用户

**请求体:**

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

**响应:**

```json
{
  "success": true,
  "message": "登录成功",
  "data": {
    "user": { ... },
    "token": "jwt_token_here"
  }
}
```

### POST /api/auth/register

注册新用户

**请求体:**

```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123"
}
```

### POST /api/auth/logout

用户登出

**响应:**

```json
{
  "success": true,
  "message": "登出成功"
}
```

## 🎨 样式定制

在 `src/app/globals.css` 中包含了完整的认证弹窗样式：

- 圆角设计
- 悬停效果
- 焦点状态
- 响应式布局
- 品牌色彩主题

## 🔧 配置说明

### 环境变量

```env
JWT_SECRET=your-super-secret-key-here
DATABASE_URL=your-database-connection-string
```

### Zustand持久化

认证状态会自动持久化到localStorage，页面刷新后状态不会丢失。

## 🚨 注意事项

1. **生产环境**: 请确保设置强安全的 JWT_SECRET
2. **数据库**: 确保数据库连接正常
3. **HTTPS**: 生产环境建议使用HTTPS
4. **密码策略**: 可根据需求调整密码强度要求

## 🎉 功能完成

所有功能已经完整实现并可以正常使用！用户可以：

✅ 注册新账户  
✅ 登录已有账户  
✅ 查看用户状态  
✅ 安全登出  
✅ 状态持久化  
✅ 移动端适配

项目现在具备了完整的用户认证功能，可以作为企业级应用的基础。
