- # Next.js + Neon 全栈开发一月学习计划

  ## 前提

  - 已掌握 HTML/CSS/JavaScript/TypeScript
  - 熟悉 React、Node.js 基础

  ## 目标

  - 使用 Next.js 构建全栈应用，连接 Neon 数据库，实现完整 CRUD、登录注册功能及评论系统
  - 完成部署上线

  ***

  ## 第 1 周：Next.js 基础与页面开发

  ### 学习重点

  - Next.js App Router 基础结构
  - 页面与布局（`app/layout.tsx`, `app/page.tsx`）
  - 路由系统（静态、动态、嵌套）
  - Tailwind CSS / ShadCN UI 使用

  ### 实践任务

  - 初始化项目 `npx create-next-app@latest --use-pnpm`（使用 App Router + TypeScript）
  - 配置 Tailwind CSS 或 ShadCN UI
  - 搭建首页、关于页、登录页、注册页
  - 使用 layout 实现页面复用结构

  实际问题：

  传统 React 和 NextJS

  - React 是传统 CSR 纯前端构建这个过程 客户端发出请求
  - Next (渲染框架) SSG 和 SSR 后端构建整个DOM 给前端 node中间层发出请求 减少白屏时间....

  NextJS -- 约定大于配置

  如果多层嵌套时，不要写html标签，只能一个html标签

  #### ✅ Next.js 中的嵌套结构

  App Router内容组件嵌套关系： layout ----- template ----- template ---- content text (Vue中 solt + router-view, React中props.children)

  ```typescript
  app/
    layout.tsx         ← 页面公共结构（Header/Footer）
  template.tsx       ← 动态渲染隔离器（类似中间壳）
    page.tsx           ← 页面内容（React组件）
  components/
      Content.tsx
    Text.tsx

  ```

  ## 🧭 一、页面结构 & 路由系统

  | 功能/概念    | Vue (Vue Router)                | React (React Router)                           | Next.js (App Router)                |
  | ------------ | ------------------------------- | ---------------------------------------------- | ----------------------------------- |
  | 路由配置     | `routes: [{ path, component }]` | `<Routes><Route path="" element={}/></Routes>` | 目录结构决定路由：`app/page.tsx`    |
  | 动态路由     | `path: '/user/:id'`             | `path="/user/:id"`                             | `app/user/[id]/page.tsx`            |
  | 嵌套路由     | `<router-view />`               | `<Outlet />`                                   | `layout.tsx` 中通过 `children` 嵌套 |
  | 页面组件     | `.vue` 文件                     | 函数组件 `.tsx`                                | `page.tsx`                          |
  | 全局布局     | `App.vue` + `<router-view />`   | `_app.tsx`（旧）                               | `layout.tsx`                        |
  | 动态加载组件 | `defineAsyncComponent()`        | `React.lazy` + `Suspense`                      | `dynamic()`（`next/dynamic`）       |

  ***

  ## 🔁 二、组件通信（状态、插槽）

  | 功能/概念        | Vue              | React                     | Next.js (App Router)                 |
  | ---------------- | ---------------- | ------------------------- | ------------------------------------ |
  | 父子通信         | `props`、`emits` | `props`                   | `props` + `children`                 |
  | 插槽             | `<slot>`         | `{props.children}`        | `children`（layout/template 中）     |
  | 状态共享（跨层） | `provide/inject` | `React Context`           | `layout.tsx` 中创建 context 全局传值 |
  | 全局状态管理     | `Pinia / Vuex`   | `Redux / Zustand / Jotai` | 任意 React 状态库（推荐：Zustand）   |

  ***

  ## 📡 三、数据获取方式（前后端协作）

  | 功能/概念          | Vue                     | React                      | Next.js (App Router)                              |
  | ------------------ | ----------------------- | -------------------------- | ------------------------------------------------- |
  | 页面加载时请求数据 | `mounted() -> axios`    | `useEffect -> fetch/axios` | `async function page()` + `fetch()`               |
  | SSR / SSG          | Nuxt 提供               | Next.js 原生（旧版）       | `generateStaticParams()`（SSG）、`fetch()`（SSR） |
  | API 接口           | 独立后端项目 / Nuxt API | Express/Koa/Node 独立      | `app/api/xxx/route.ts` （内置 API 路由）          |
  | 中间件处理         | Vue Router 中守卫       | Express 中间件             | `middleware.ts` 支持路由拦截、重定向等            |

  ***

  ## 🧱 四、布局系统对比（Layout）

  | 功能/概念      | Vue                           | React                    | Next.js                            |
  | -------------- | ----------------------------- | ------------------------ | ---------------------------------- |
  | 全局布局       | App.vue + router-view         | `_app.tsx` + Layout 组件 | `layout.tsx`                       |
  | 多层嵌套布局   | 组件内多级 slot + router-view | 嵌套 layout 组件         | `app/xxx/layout.tsx` 层级嵌套      |
  | 子布局隔离刷新 | 无明显区分                    | 组件卸载/重挂            | `template.tsx`（每次进入都会刷新） |

  ***

  ## 📦 五、构建与打包

  | 功能/概念  | Vue            | React          | Next.js                              |
  | ---------- | -------------- | -------------- | ------------------------------------ |
  | 构建工具   | Vite / Webpack | Vite / Webpack | 内置构建系统（无需配置）             |
  | 静态生成   | `vite build`   | `vite build`   | `next build` + `next export`（静态） |
  | 服务端渲染 | Nuxt SSR       | 需配合 Express | 默认支持 SSR                         |

  ***

  ## 🧩 六、一些关键组件功能类比

  | 功能           | Vue                  | React                 | Next.js 实现         |
  | -------------- | -------------------- | --------------------- | -------------------- |
  | 页面导航跳转   | `router.push()`      | `navigate()`          | `useRouter().push()` |
  | 监听路由变化   | `watch($route)`      | `useLocation()`       | `usePathname()`      |
  | 设置页面标题   | `metaInfo.title`     | `document.title`      | `generateMetadata()` |
  | 404 页面       | `router.addRoutes()` | 自定义 404            | `app/not-found.tsx`  |
  | loading 状态   | 自定义 loading 组件  | `Suspense` + fallback | `loading.tsx`        |
  | error 错误边界 | `errorCaptured`      | `ErrorBoundary`       | `error.tsx`          |

  1.创建项目运行到*Google浏览器* 报字体错误，解决方案

  ```
  // 禁用Google字体自动优化 next.config.ts
    images: {
      // 禁用图片优化以解决字体和图片问题
    unoptimized: true,
      dangerouslyAllowSVG: true,
    remotePatterns: [
        {
          protocol: 'https',
          hostname: 'fonts.gstatic.com',
        },
      ],
    },
  ```

  2.Image组件报错，解决方案

  ```
   <Image
   aria-hidden
   src="/file.svg"
   alt="File icon"
   width={16}
   height={16}
   />
   改成----
   <div style={{ position: 'relative', width: '16px', height: '16px' }}>
     <Image
       aria-hidden
     src="/file.svg"
       alt="File icon"
       fill
       sizes="16px"
       />
   </div>
  ```

  next+neon基础template：

  ```
  https://github.com/neondatabase-labs/neon-auth-nextjs-template.git
  ```

  ### Prisma使用

  1. 安装 prisma

  ```pnpm
  pnpm add prisma @prisma/client
  ```

  2. 创建环境变量文件 .env

  ```pnpm
  // .env
  # Neon数据库连接字符串
  DATABASE_URL="xxxxxxx?sslmode=require"

  # 其他环境变量
  NEXTAUTH_SECRET_JWT="your-nextauth-JWT-secret-key"
  NEXTAUTH_URL_PORT="http://localhost:3000"
  ```

  3. 初始化Prisma

  ```
  npx prisma init
  Prisma初始化成功之后。可以查看生成的schema文件并进行配置  prisma/schema.prisma
  ```

  4. 从现有数据库拉取schema

  ```
  npx prisma db pull
  拉取之后查看一下prisma/schema.prisma文件中拉取到的表结构
  ```

  5. 生成Prisma客户端，在项目中使用

  ```
  npx prismagenerate
  Prisma客户端成功生成之后。还需要创建一个数据库连接和操作的工具文件 src/lib/prisma.ts
  ```

  6. 创建Prisma数据库连接实例 prisma.ts

  ```
  /**
   * Prisma数据库连接实例
   * 全局单例模式，避免重复创建连接
   */
  import { PrismaClient } from '../generated/prisma'
  // 全局变量类型声明
  declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined
  }
  // 创建Prisma客户端实例
  // 在开发环境中使用全局变量避免热重载时重复创建连接
  const prisma = global.prisma || new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // 启用日志记录
  })
  if (process.env.NODE_ENV === 'development') {
    global.prisma = prisma
  }
  export default prisma
  ```

  7. 创建用户操作服务文件 src/services/userService.ts

  ```typescript
  /**
   * 用户服务类
   * 提供用户相关的数据库操作方法
   */
  import { next_base_user } from '../generated/prisma';
  import prisma from '../lib/prisma';

  // 用户创建类型（排除自动生成的字段）
  export type CreateUserInput = {
    username: string;
    email?: string;
    phone?: string;
    password_hash: string;
    avatar_url?: string;
    role?: string;
    provider?: string;
    provider_id?: string;
  };

  // 用户更新类型
  export type UpdateUserInput = Partial<Omit<CreateUserInput, 'username'>>;

  /**
   * 用户服务类
   */
  export class UserService {
    /**
     * 创建新用户
     */
    static async createUser(userData: CreateUserInput): Promise<next_base_user> {
      return await prisma.next_base_user.create({
        data: userData,
      });
    }

    /**
     * 根据ID获取用户
     */
    static async getUserById(id: string): Promise<next_base_user | null> {
      return await prisma.next_base_user.findUnique({
        where: { id },
      });
    }

    /**
     * 根据用户名获取用户
     */
    static async getUserByUsername(username: string): Promise<next_base_user | null> {
      return await prisma.next_base_user.findUnique({
        where: { username },
      });
    }

    /**
     * 根据邮箱获取用户
     */
    static async getUserByEmail(email: string): Promise<next_base_user | null> {
      return await prisma.next_base_user.findUnique({
        where: { email },
      });
    }

    /**
     * 获取所有用户（支持分页）
     */
    static async getUsers(
      page: number = 1,
      pageSize: number = 10
    ): Promise<{
      users: next_base_user[];
      total: number;
      totalPages: number;
    }> {
      const skip = (page - 1) * pageSize;

      const [users, total] = await Promise.all([
        prisma.next_base_user.findMany({
          skip,
          take: pageSize,
          where: {
            is_deleted: false,
            is_active: true,
          },
          orderBy: {
            created_at: 'desc',
          },
        }),
        prisma.next_base_user.count({
          where: {
            is_deleted: false,
            is_active: true,
          },
        }),
      ]);

      return {
        users,
        total,
        totalPages: Math.ceil(total / pageSize),
      };
    }

    /**
     * 更新用户信息
     */
    static async updateUser(id: string, userData: UpdateUserInput): Promise<next_base_user> {
      return await prisma.next_base_user.update({
        where: { id },
        data: {
          ...userData,
          updated_at: new Date(),
        },
      });
    }

    /**
     * 软删除用户
     */
    static async deleteUser(id: string): Promise<next_base_user> {
      return await prisma.next_base_user.update({
        where: { id },
        data: {
          is_deleted: true,
          is_active: false,
          updated_at: new Date(),
        },
      });
    }

    /**
     * 更新用户登录信息
     */
    static async updateLoginInfo(id: string, loginIp?: string): Promise<next_base_user> {
      return await prisma.next_base_user.update({
        where: { id },
        data: {
          login_count: {
            increment: 1,
          },
          last_login_at: new Date(),
          last_login_ip: loginIp,
          updated_at: new Date(),
        },
      });
    }

    /**
     * 验证用户邮箱
     */
    static async verifyUser(id: string): Promise<next_base_user> {
      return await prisma.next_base_user.update({
        where: { id },
        data: {
          is_verified: true,
          updated_at: new Date(),
        },
      });
    }

    /**
     * 检查用户名是否已存在
     */
    static async isUsernameExists(username: string): Promise<boolean> {
      const user = await prisma.next_base_user.findUnique({
        where: { username },
        select: { id: true },
      });
      return !!user;
    }

    /**
     * 检查邮箱是否已存在
     */
    static async isEmailExists(email: string): Promise<boolean> {
      const user = await prisma.next_base_user.findUnique({
        where: { email },
        select: { id: true },
      });
      return !!user;
    }
  }
  ```

  7. 创建API路由示例 api/route.ts

  ```typescript
  /**
   * 用户API路由
   * 提供用户相关的RESTful API接口
   */
  import { NextRequest, NextResponse } from 'next/server';

  import { UserService } from '../../../services/userService';

  /**
   * GET /api/users - 获取用户列表
   */
  export async function GET(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page') || '1');
      const pageSize = parseInt(searchParams.get('pageSize') || '10');

      const result = await UserService.getUsers(page, pageSize);

      return NextResponse.json({
        success: true,
        message: '获取用户列表成功',
        data: result,
      });
    } catch (error) {
      console.error('获取用户列表失败:', error);
      return NextResponse.json(
        {
          success: false,
          message: '获取用户列表失败',
          error: error instanceof Error ? error.message : '未知错误',
        },
        { status: 500 }
      );
    }
  }

  /**
   * POST /api/users - 创建新用户
   */
  export async function POST(request: NextRequest) {
    try {
      const body = await request.json();

      // 基本数据验证
      if (!body.username || !body.password_hash) {
        return NextResponse.json(
          {
            success: false,
            message: '用户名和密码不能为空',
          },
          { status: 400 }
        );
      }

      // 检查用户名是否已存在
      const usernameExists = await UserService.isUsernameExists(body.username);
      if (usernameExists) {
        return NextResponse.json(
          {
            success: false,
            message: '用户名已存在',
          },
          { status: 400 }
        );
      }

      // 检查邮箱是否已存在
      if (body.email) {
        const emailExists = await UserService.isEmailExists(body.email);
        if (emailExists) {
          return NextResponse.json(
            {
              success: false,
              message: '邮箱已存在',
            },
            { status: 400 }
          );
        }
      }

      // 创建用户
      const user = await UserService.createUser({
        username: body.username,
        email: body.email,
        phone: body.phone,
        password_hash: body.password_hash,
        avatar_url: body.avatar_url,
        role: body.role || 'user',
        provider: body.provider,
        provider_id: body.provider_id,
      });

      // 返回用户信息（不包含密码）
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password_hash, ...userWithoutPassword } = user;

      return NextResponse.json(
        {
          success: true,
          message: '用户创建成功',
          data: userWithoutPassword,
        },
        { status: 201 }
      );
    } catch (error) {
      console.error('创建用户失败:', error);
      return NextResponse.json(
        {
          success: false,
          message: '创建用户失败',
          error: error instanceof Error ? error.message : '未知错误',
        },
        { status: 500 }
      );
    }
  }
  ```

  8. 创建单个用户操作的API路由 api/[id]/route.ts

  ```typescript
  /**
   * 单个用户API路由
   * 提供特定用户的获取、更新、删除操作
   */
  import { NextRequest, NextResponse } from 'next/server';

  import { UserService } from '../../../../services/userService';

  interface RouteParams {
    params: Promise<{ id: string }>;
  }

  /**
   * GET /api/users/[id] - 获取单个用户信息
   */
  export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
      const { id } = await params;

      const user = await UserService.getUserById(id);

      if (!user) {
        return NextResponse.json(
          {
            success: false,
            message: '用户不存在',
          },
          { status: 404 }
        );
      }

      // 返回用户信息（不包含密码）
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password_hash, ...userWithoutPassword } = user;

      return NextResponse.json({
        success: true,
        message: '获取用户信息成功',
        data: userWithoutPassword,
      });
    } catch (error) {
      console.error('获取用户信息失败:', error);
      return NextResponse.json(
        {
          success: false,
          message: '获取用户信息失败',
          error: error instanceof Error ? error.message : '未知错误',
        },
        { status: 500 }
      );
    }
  }

  /**
   * PUT /api/users/[id] - 更新用户信息
   */
  export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
      const { id } = await params;
      const body = await request.json();

      // 检查用户是否存在
      const existingUser = await UserService.getUserById(id);
      if (!existingUser) {
        return NextResponse.json(
          {
            success: false,
            message: '用户不存在',
          },
          { status: 404 }
        );
      }

      // 如果要更新邮箱，检查邮箱是否已被其他用户使用
      if (body.email && body.email !== existingUser.email) {
        const emailExists = await UserService.isEmailExists(body.email);
        if (emailExists) {
          return NextResponse.json(
            {
              success: false,
              message: '邮箱已被其他用户使用',
            },
            { status: 400 }
          );
        }
      }

      // 更新用户信息
      const updatedUser = await UserService.updateUser(id, {
        email: body.email,
        phone: body.phone,
        password_hash: body.password_hash,
        avatar_url: body.avatar_url,
        role: body.role,
        provider: body.provider,
        provider_id: body.provider_id,
      });

      // 返回更新后的用户信息（不包含密码）
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password_hash, ...userWithoutPassword } = updatedUser;

      return NextResponse.json({
        success: true,
        message: '用户信息更新成功',
        data: userWithoutPassword,
      });
    } catch (error) {
      console.error('更新用户信息失败:', error);
      return NextResponse.json(
        {
          success: false,
          message: '更新用户信息失败',
          error: error instanceof Error ? error.message : '未知错误',
        },
        { status: 500 }
      );
    }
  }

  /**
   * DELETE /api/users/[id] - 删除用户（软删除）
   */
  export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
      const { id } = await params;

      // 检查用户是否存在
      const existingUser = await UserService.getUserById(id);
      if (!existingUser) {
        return NextResponse.json(
          {
            success: false,
            message: '用户不存在',
          },
          { status: 404 }
        );
      }

      // 检查用户是否已被删除
      if (existingUser.is_deleted) {
        return NextResponse.json(
          {
            success: false,
            message: '用户已被删除',
          },
          { status: 400 }
        );
      }

      // 软删除用户
      await UserService.deleteUser(id);

      return NextResponse.json({
        success: true,
        message: '用户删除成功',
      });
    } catch (error) {
      console.error('删除用户失败:', error);
      return NextResponse.json(
        {
          success: false,
          message: '删除用户失败',
          error: error instanceof Error ? error.message : '未知错误',
        },
        { status: 500 }
      );
    }
  }
  ```

  9. 更新package.json添加Prisma脚本 scripts中

  ```json
  "db:generate": "prisma generate",
  "db:push": "prisma db push",
  "db:pull": "prisma db pull",
  "db:migrate": "prisma migrate dev",
  "db:studio": "prisma studio",
  "db:seed": "prisma db seed"
  ```

  10. 创建使用示例 src/examples/userExample.ts

  ```typescript
  /**
   * 用户API使用示例
   * 展示如何在前端调用用户相关的API接口
   */

  // API基础配置
  const API_BASE_URL =
    process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:3000';

  /**
   * API响应类型定义
   */
  interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
  }

  /**
   * 用户数据类型
   */
  interface User {
    id: string;
    username: string;
    email?: string;
    phone?: string;
    avatar_url?: string;
    role?: string;
    provider?: string;
    provider_id?: string;
    is_verified?: boolean;
    is_active?: boolean;
    is_deleted?: boolean;
    login_count?: number;
    last_login_at?: string;
    last_login_ip?: string;
    created_at?: string;
    updated_at?: string;
  }

  /**
   * 用户列表响应类型
   */
  interface UsersListResponse {
    users: User[];
    total: number;
    totalPages: number;
  }

  /**
   * 用户API工具类
   */
  export class UserApiClient {
    /**
     * 获取用户列表
     */
    static async getUsers(page = 1, pageSize = 10): Promise<UsersListResponse> {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users?page=${page}&pageSize=${pageSize}`);

        const result: ApiResponse<UsersListResponse> = await response.json();

        if (!result.success) {
          throw new Error(result.message || '获取用户列表失败');
        }

        return result.data!;
      } catch (error) {
        console.error('获取用户列表失败:', error);
        throw error;
      }
    }

    /**
     * 获取单个用户信息
     */
    static async getUserById(id: string): Promise<User> {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/${id}`);

        const result: ApiResponse<User> = await response.json();

        if (!result.success) {
          throw new Error(result.message || '获取用户信息失败');
        }

        return result.data!;
      } catch (error) {
        console.error('获取用户信息失败:', error);
        throw error;
      }
    }

    /**
     * 创建新用户
     */
    static async createUser(userData: {
      username: string;
      email?: string;
      phone?: string;
      password_hash: string;
      avatar_url?: string;
      role?: string;
    }): Promise<User> {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const result: ApiResponse<User> = await response.json();

        if (!result.success) {
          throw new Error(result.message || '创建用户失败');
        }

        return result.data!;
      } catch (error) {
        console.error('创建用户失败:', error);
        throw error;
      }
    }

    /**
     * 更新用户信息
     */
    static async updateUser(
      id: string,
      userData: {
        email?: string;
        phone?: string;
        password_hash?: string;
        avatar_url?: string;
        role?: string;
      }
    ): Promise<User> {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const result: ApiResponse<User> = await response.json();

        if (!result.success) {
          throw new Error(result.message || '更新用户信息失败');
        }

        return result.data!;
      } catch (error) {
        console.error('更新用户信息失败:', error);
        throw error;
      }
    }

    /**
     * 删除用户
     */
    static async deleteUser(id: string): Promise<void> {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
          method: 'DELETE',
        });

        const result: ApiResponse = await response.json();

        if (!result.success) {
          throw new Error(result.message || '删除用户失败');
        }
      } catch (error) {
        console.error('删除用户失败:', error);
        throw error;
      }
    }
  }

  /**
   * 使用示例
   */
  export async function userApiExamples() {
    try {
      // 1. 创建新用户
      console.log('=== 创建新用户 ===');
      const newUser = await UserApiClient.createUser({
        username: 'testuser001',
        email: 'test@example.com',
        password_hash: 'hashed_password', // 实际应用中应该使用加密后的密码
        role: 'user',
      });
      console.log('新用户创建成功:', newUser);

      // 2. 获取用户信息
      console.log('=== 获取用户信息 ===');
      const user = await UserApiClient.getUserById(newUser.id);
      console.log('用户信息:', user);

      // 3. 更新用户信息
      console.log('=== 更新用户信息 ===');
      const updatedUser = await UserApiClient.updateUser(newUser.id, {
        email: 'updated@example.com',
        avatar_url: 'https://example.com/avatar.jpg',
      });
      console.log('更新后的用户信息:', updatedUser);

      // 4. 获取用户列表
      console.log('=== 获取用户列表 ===');
      const usersList = await UserApiClient.getUsers(1, 10);
      console.log('用户列表:', usersList);

      // 5. 删除用户（可选，谨慎操作）
      // console.log('=== 删除用户 ===')
      // await UserApiClient.deleteUser(newUser.id)
      // console.log('用户删除成功')
    } catch (error) {
      console.error('API调用失败:', error);
    }
  }
  ```

  11. 同步模型到数据库（创建表）

  ```
  npx prisma db push
  ```

  12.查看当前链接数据库表数据 (可视化)

  ```
  npx prisma studio
  ```

  ### 📁 项目结构

  ```typescript
  next-neon-base/
  ├── prisma/
  │   └── schema.prisma          # Prisma数据库模型定义
  ├── src/
  │   ├── lib/
  │   │   └── prisma.ts          # Prisma客户端连接实例
  │   ├── services/
  │   │   └── userService.ts     # 用户数据操作服务类
  │   ├── app/api/
  │   │   └── users/
  │   │       ├── route.ts       # 用户列表API (GET/POST)
  │   │       └── [id]/
  │   │           └── route.ts   # 单个用户API (GET/PUT/DELETE)
  │   ├── generated/
  │   │   └── prisma/           # 自动生成的Prisma客户端
  │   └── examples/
  │       └── userExample.ts    # API使用示例
  ├── .env                      # 环境变量配置（你手动创建的）
  └── package.json             # 已添加Prisma相关脚本
  ```

  ### 🔧 可用的脚本命令

  ```typescript
  # 开发和构建
  pnpm dev                  # 启动开发服务器
  pnpm build               # 构建生产版本

  # Prisma相关命令
  pnpm db:generate         # 生成Prisma客户端
  pnpm db:push            # 推送schema到数据库
  pnpm db:pull            # 从数据库拉取schema
  pnpm db:migrate         # 运行数据库迁移
  pnpm db:studio          # 打开Prisma Studio可视化工具
  pnpm db:seed            # 运行数据库种子文件
  ```

  ### 🚀 API接口

  项目现在提供以下RESTful API接口：

  - GET /api/users - 获取用户列表（支持分页）

  - POST /api/users - 创建新用户

  - GET /api/users/[id] - 获取单个用户信息

  - PUT /api/users/[id] - 更新用户信息

  - DELETE /api/users/[id] - 删除用户（软删除）

  #### ！！！注意

  vercel部署时，环境变量文件.env不要提交，需要在vercel中添加

  #### 页面标题设置

  ```json
  src/
  ├── app/
  │   ├── layout.tsx          # 全局metadata模板
  │   ├── page.tsx           # 首页标题
  │   ├── users/
  │   │   ├── page.tsx       # 用户页面标题
  │   │   └── [id]/
  │   │       └── page.tsx   # 动态用户标题
  │   └── about/
  │       └── page.tsx       # 关于页面标题
  └── components/
      └── Navigation.tsx      # 纯导航功能
  ```

  ### 部署上线

  ```
  # 1. 清理构建缓存
  Remove-Item -Recurse -Force .\.next

  # 2. ESLint 代码规范检查
  pnpm lint

  # 3. TypeScript 类型检查
  pnpm type-check

  # 4. 构建测试
  pnpm build

  # 5. 提交部署
  git add . && git commit -m "ready for deployment" && git push
  ```

  ### 简化类型检测部署 Git hook

  ```
  "type-check": "tsc --noEmit",
  "pre-deploy": "pnpm lint && pnpm type-check && pnpm build",

  # 1. 清理构建缓存
  Remove-Item -Recurse -Force .\.next

  # 2. 一键检查所有问题
  pnpm pre-deploy

  # 3. 提交并部署
  git add .
  git commit -m "ready for deployment"
  git push
  ```

  pnpm 权限问题

  ```
  pnpm store prune  // 清除pnpm 缓存
  ```

  ### 初始化项目结构UI

  next + antd + prisma +react + zustand

  ### 数据库修改或者迁移

  ```
  # 1. 修改 prisma/schema.prisma 文件（手动删除字段）

  # 2. 推送更改到数据库 --- 直接推送
  npx prisma db push
  # 或者使用迁移
  npx prisma migrate dev --name remove-some-fields

  # 3. 重新生成客户端（通常会自动执行，但可以手动确保）
  npx prisma generate
  ```

  ***

  ## 第 2 周：后端 API 开发 + Neon 数据库连接

  ### 学习重点

  - API 路由（`app/api/`）结构和用法
  - Neon 数据库创建和管理
  - Prisma ORM 基本操作：schema、model、migrate、seed
  - `.env` 环境变量管理

  ### 实践任务

  - 创建 Neon 数据库并获取连接字符串
  - 安装 Prisma 并初始化 `npx prisma init`
  - 建立 `User` 模型并迁移数据库
  - 实现用户相关 API：
    - `GET /api/users`
    - `POST /api/users`
    - `PUT /api/users/:id`
    - `DELETE /api/users/:id`
  - 用 Postman 测试接口

  实际问题：

  遇到NextJS和React19不兼容时，报错：Warning: [antd: compatible] antd v5 support React is 16 ~ 18. see https://u.ant.design/v5-for-19 for compatible.

  ```typescript
  // 安装兼容性包
  pnpm install @ant-design/v5-patch-for-react-19 --save

  app/layout.tsx
  import '@ant-design/v5-patch-for-react-19';
  ```

  遇到index.js:640 Uncaught Error: ENOENT: no such file or directory, open 'E:\个人成长蜕变\next-neon-base\.next\server\vendor-chunks\antd@5.26.1_react-dom@19.1.0_react@19.1.0__react@19.1.0.js' 这样的错误

  ```
  1. 首先清理缓存和重新构建
  rm -rf .next
  Remove-Item -Recurse -Force .next
  2. 清理 pnpm 缓存和重新安装依赖
  pnpm store prune
  3. pnpm install
  4. pnpm dev
  ```

  #### Pages Router 和 App Router对比

  | 特性                            | Pages Router (`pages/`) | App Router (`app/`)           |
  | ------------------------------- | ----------------------- | ----------------------------- |
  | 路由方式                        | 文件即路由              | 文件夹 + `page.tsx` 为路由    |
  | 布局（Layout）支持              | 手动处理                | 支持 `layout.tsx` 嵌套布局 ✅ |
  | 服务端组件（Server Components） | 不支持                  | 默认支持 ✅                   |
  | 渐进式渲染（Streaming）         | 不支持                  | 支持 ✅                       |
  | 加载状态（loading）             | 自定义写法              | 支持 `loading.tsx` ✅         |
  | 错误边界（error.tsx）           | 不支持                  | 支持 ✅                       |
  | 动态元信息（Metadata）          | 通过 `Head` 组件        | 支持 `metadata` 函数 ✅       |
  | 数据获取方式                    | `getServerSideProps` 等 | `fetch()` 和 `async` 组件 ✅  |
  | 适合场景                        | 老项目迁移、兼容性优先  | 新项目推荐 ✅                 |

  ### bcrypt 插件生成hash密码规则

  ```pgsql
  $2b$12$HgajqKRRJnT/ypx4qBGBo.HZRuAiVSKkzRghB.yq0yrm8/dGTM2BG
  |---|--|--------------------|------------------------------------|
   ver cost       salt                      hashed password

  ```

  | 部分                              | 长度 | 含义                           |
  | --------------------------------- | ---- | ------------------------------ |
  | `$2b$`                            | 4    | bcrypt 算法版本号              |
  | `12$`                             | 3    | cost factor（2^12 次加密计算） |
  | `HgajqKRRJnT/ypx4qBGBo.`          | 22   | salt（盐值）                   |
  | `HZRuAiVSKkzRghB.yq0yrm8/dGTM2BG` | 31   | 加密后的密码部分（hash）       |

  ***

  ## 第 3 周：注册登录 + 鉴权 + 表单处理

  ### 学习重点

  - 使用 NextAuth.js 或自定义认证逻辑
  - JWT / session 鉴权机制
  - React Hook Form + Zod 进行表单验证
  - 受保护页面与客户端鉴权（中间件）

  ### 实践任务

- 实现注册/登录接口（密码加密）

  - 前端注册/登录表单组件

- 登录成功后跳转到受保护页面 /dashboard

  - 显示当前用户信息，支持退出登录

  ***

  ## 第 4 周：评论系统实战 + 部署上线

  ### 学习重点

  - 评论系统模型设计与 API 实现
  - 客户端提交评论与加载展示
  - 服务端渲染（RSC）与缓存策略（SWR）
  - Vercel 项目部署 + Neon 云数据库持久连接
  - 代码分层、组件优化、错误处理、加载状态

  ### 实践任务

  - 新建 `Post` 模型和 `Comment` 模型，建立用户与评论与文章关系：

    ```prisma
    model User {
      id        String     @id @default(uuid())
    name      String
      email     String     @unique
    password  String
      comments  Comment[]
    posts     Post[]
    }

    model Post {
      id        String     @id @default(uuid())
      title     String
      content   String
      author    User       @relation(fields: [authorId], references: [id])
      authorId  String
      comments  Comment[]
      createdAt DateTime   @default(now())
    }

    model Comment {
      id        String   @id @default(uuid())
      content   String
      post      Post     @relation(fields: [postId], references: [id])
      postId    String
      user      User     @relation(fields: [userId], references: [id])
      userId    String
      createdAt DateTime @default(now())
    }
    ```

  - 实现评论相关 API 接口：

    - `GET /api/comments?postId=xxx` 获取指定文章的评论列表
    - `POST /api/comments` 提交评论（需登录）

  - `DELETE /api/comments/:id` 删除评论（仅作者可删）

- 评论 API 示例代码结构：
      ```ts
      // app/api/comments/route.ts
      export async function POST(req: Request) { /* 创建评论 */ }

      // app/api/comments/[id]/route.ts
      export async function DELETE(req: Request, { params }) { /* 删除评论 */ }
      ```
  - 在博客文章页面或留言板集成评论功能：

    - 使用 SWR/React Query 拉取评论数据
    - 评论表单（textarea + submit）
    - 评论展示列表（用户名 + 内容 + 时间 + 删除按钮）

  - 项目上线部署（Vercel + Neon）

  - 编写项目 README

  - 推送 GitHub 仓库并发布分享
  ### 模板项目结构建议（GitHub Repo）
  ```bash
  my-app/
  ├── app/
  │   ├── layout.tsx
  │   ├── page.tsx
  │   ├── dashboard/
  │   ├── posts/
  │   │   └── [id]/page.tsx         # 文章详情页 + 评论组件集成
  │   └── api/
  │       ├── users/...
  │       ├── posts/...
  │       └── comments/
  │           ├── route.ts         # POST 创建评论
  │           └── [id]/route.ts    # DELETE 删除评论
  ├── components/
  │   ├── CommentForm.tsx
  │   └── CommentList.tsx
  ├── lib/
  │   └── prisma.ts                # Prisma Client 实例
  ├── prisma/
  │   └── schema.prisma
  ├── .env
  ├── README.md
  └── package.json
  ```
  ### 接口设计方案文档示例
  ```md
  ## POST /api/comments

  创建评论

  - Body:
    {
    postId: string,
    content: string
    }
  - 返回：201 Created 或 401 Unauthorized

  ## GET /api/comments?postId=xxx

  获取评论列表

  - 返回：
    [
    {
    id: string,
    content: string,
    user: { name: string },
    createdAt: string
    },
    ...
    ]

  ## DELETE /api/comments/:id

  删除评论（需鉴权）

  - 返回：204 No Content 或 403 Forbidden
  ```
  ***
  ## 总结资源
  - [Next.js 官方教程](https://nextjs.org/learn)
  - [Prisma 官方文档](https://www.prisma.io/docs)
  - [Neon 官方文档](https://neon.tech/docs)
  - [ShadCN UI](https://ui.shadcn.dev/) / [Tailwind CSS](https://tailwindcss.com/)
