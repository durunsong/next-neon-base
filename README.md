# Next.js + Prisma + Neon 基础模版框架

**中文文档** | [English Documentation](./README.en.md)

这是一个基于 Next.js 15、Prisma ORM 和 Neon 云数据库的现代化基础模版框架。项目提供了完整的用户 CRUD 操作 API 接口，支持用户注册、登录、信息管理等功能。

## 🚀 技术栈

- **前端框架**: Next.js 15.3.3 (App Router)
- **开发语言**: TypeScript
- **数据库 ORM**: Prisma 6.9.0
- **云数据库**: Neon PostgreSQL
- **包管理器**: pnpm
- **样式框架**: Tailwind CSS 4.0
- **代码规范**: ESLint + TypeScript ESLint
- **部署平台**: Vercel
- **UI框架**: Antd 5.26

## ✨ 功能特性

- 🔐 完整的基础模版框架
- 🏗️ RESTful API 接口设计
- 🎯 类型安全的 TypeScript 支持
- 🗄️ Prisma ORM 数据库操作
- ☁️ Neon 云数据库集成
- 📝 详细的错误处理和验证
- 🚀 支持 Vercel 一键部署
- 📊 支持分页查询
- 🔒 软删除和状态管理

## 📁 项目结构

```
next-neon-base/
├── prisma/
│   └── schema.prisma          # Prisma 数据库模型定义
├── src/
│   ├── lib/
│   │   └── prisma.ts          # Prisma 客户端连接实例
│   ├── services/
│   │   └── userService.ts     # 用户数据操作服务类
│   └──── app/
│         └── api/
│              └── users/         # 用户相关 API 路由
│
├── .env                       # 环境变量配置
└── package.json              # 项目依赖和脚本
```

## 🛠️ 环境配置

### 1. 环境变量设置

在项目根目录创建 `.env` 文件：

```env
# Neon 数据库连接字符串
DATABASE_URL="postgresql://用户名:密码@端点/数据库名?sslmode=require"

# Next.js 配置（可选）
NEXTAUTH_SECRET="your-nextauth-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# 阿里云OSS:// 配置opment"
OSS_ACCESS_KEY_ID="AccessKey ID"
OSS_ACCESS_KEY_SECRET="AccessKey Secret"
OSS_REGION="oss-rg-china-mainland" # OSS 存储所在的 地域（region）标识
OSS_BUCKET="xxxxxxxx"  #  Bucket（存储空间）名字
BASE_OSS_URL="xxxxxxxx.oss-rg-china-mainland.aliyuncs.com" #OSS 的公共访问 基础 URL

```

### 2. 数据库表结构

项目使用的主要数据表：

```sql
CREATE TABLE next_base_user (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  password_hash TEXT NOT NULL,
  avatar_url TEXT,
  role VARCHAR(20) DEFAULT 'user',
  provider VARCHAR(20),
  provider_id VARCHAR(100),
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  is_deleted BOOLEAN DEFAULT FALSE,
  login_count INTEGER DEFAULT 0,
  last_login_at TIMESTAMP,
  last_login_ip VARCHAR(45),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/durunsong/next-neon-base.git
cd next-neon-base
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 配置数据库

```bash
# 从数据库拉取现有表结构
pnpm db:pull

# 生成 Prisma 客户端
pnpm db:generate
```

### 4. 启动开发服务器

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看项目。

## 📡 API 接口

### 用户管理接口

| 方法     | 路径              | 描述             | 参数               |
| -------- | ----------------- | ---------------- | ------------------ |
| `GET`    | `/api/users`      | 获取用户列表     | `page`, `pageSize` |
| `POST`   | `/api/users`      | 创建新用户       | 用户信息 JSON      |
| `GET`    | `/api/users/[id]` | 获取单个用户     | 用户 ID            |
| `PUT`    | `/api/users/[id]` | 更新用户信息     | 用户 ID + 更新数据 |
| `DELETE` | `/api/users/[id]` | 删除用户(软删除) | 用户 ID            |

### 请求示例

#### 创建用户

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password_hash": "hashed_password"
  }'
```

#### 获取用户列表

```bash
curl "http://localhost:3000/api/users?page=1&pageSize=10"
```

### 响应格式

```json
{
  "success": true,
  "message": "操作成功",
  "data": {
    // 返回的数据
  }
}
```

## 🛠️ 开发脚本

```bash
# 开发相关
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
pnpm start        # 启动生产服务器
pnpm lint         # 代码检查

# 数据库相关
pnpm db:generate  # 生成 Prisma 客户端
pnpm db:push      # 推送 schema 到数据库
pnpm db:pull      # 从数据库拉取 schema
pnpm db:migrate   # 运行数据库迁移 (迁移会创建版本历史，可以回滚)
pnpm db:studio    # 打开 Prisma Studio
pnpm db:seed      # 运行数据库种子数据
pnpm db:sync      # 同步数据库结构并生成客户端 --从数据库同步到代码 (NPM Scripts 串联命令)
pnpm db:dev-push  # 快速推送+生成 -- 开发环境快速原型
```

## 🔧 数据库管理

### Prisma Studio

```bash
pnpm db:studio
```

在浏览器中打开可视化数据库管理界面。

### 数据库迁移

```bash
# 创建新的迁移
pnpm db:migrate

# 重置数据库
npx prisma migrate reset
```

## 🌐 部署指南

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 在 Vercel 项目设置中添加环境变量：
   - `DATABASE_URL`: Neon 数据库连接字符串
4. 部署会自动完成

### 环境变量配置

在 Vercel 项目设置的 Environment Variables 中添加：

```
DATABASE_URL=postgresql://your-neon-connection-string
```

## 🐛 故障排除

### 常见问题

1. **Prisma 客户端未生成**

   ```bash
   pnpm db:generate
   ```

2. **数据库连接失败**

   - 检查 `.env` 文件中的 `DATABASE_URL`
   - 确保 Neon 数据库正常运行

3. **ESLint 错误**
   - 运行 `pnpm lint` 检查代码规范
   - 查看 `eslint.config.mjs` 配置

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

该项目基于 MIT 许可证开源。查看 `LICENSE` 文件了解更多信息。

## 🔗 相关链接

- [Next.js 文档](https://nextjs.org/docs)
- [Prisma 文档](https://www.prisma.io/docs)
- [Neon 数据库](https://neon.tech/)
- [Vercel 部署](https://vercel.com/)

---

**注意**: 这是一个用于学习和开发的示例项目。在生产环境中使用时，请确保：

- 使用适当的密码加密算法
- 实现适当的身份验证和授权机制
- 添加 API 限速和安全措施
- 进行充分的测试和错误处理
