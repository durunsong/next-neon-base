import jwt from 'jsonwebtoken';

import { NextRequest } from 'next/server';

/**
 * 身份验证结果接口
 */
export interface AuthResult {
  isValid: boolean;
  userId?: string;
  error?: string;
}

/**
 * 验证用户身份的通用函数
 * 从请求中提取并验证 JWT token
 *
 * @param request - Next.js 请求对象
 * @returns 包含验证结果和用户信息的对象
 */
export async function verifyAuth(request: NextRequest): Promise<AuthResult> {
  try {
    // 首先尝试从中间件设置的请求头中获取用户ID
    const userIdFromMiddleware = request.headers.get('X-User-Id');
    if (userIdFromMiddleware) {
      return {
        isValid: true,
        userId: userIdFromMiddleware,
      };
    }

    // 如果中间件没有设置，则直接从 cookie 中验证 token
    const token = request.cookies.get('auth_token_local')?.value;
    if (!token) {
      return {
        isValid: false,
        error: '未登录',
      };
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'x6*Dq!s1V#F&7@pZb3r$QnT+9mYw';

    // 验证 JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    return {
      isValid: true,
      userId: decoded.userId,
    };
  } catch (error) {
    console.error('身份验证失败:', error);
    return {
      isValid: false,
      error: '登录已过期',
    };
  }
}

/**
 * 检查用户是否有权限访问指定资源
 *
 * @param authenticatedUserId - 已认证的用户ID
 * @param targetUserId - 目标用户ID
 * @returns 是否有权限
 */
export function checkUserPermission(authenticatedUserId: string, targetUserId: string): boolean {
  return authenticatedUserId === targetUserId;
}

/**
 * 身份验证装饰器函数
 * 简化 API 路由中的身份验证逻辑
 *
 * @param handler - 原始的处理函数
 * @param requireAuth - 是否需要身份验证
 * @returns 包装后的处理函数
 */
export function withAuth<T extends unknown[]>(
  handler: (request: NextRequest, auth: AuthResult, ...args: T) => Promise<Response>,
  requireAuth: boolean = true
) {
  return async (request: NextRequest, ...args: T): Promise<Response> => {
    const auth = await verifyAuth(request);

    if (requireAuth && !auth.isValid) {
      return new Response(
        JSON.stringify({
          success: false,
          message: auth.error || '身份验证失败',
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return handler(request, auth, ...args);
  };
}
