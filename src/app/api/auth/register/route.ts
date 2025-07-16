import bcrypt from 'bcryptjs';

import { NextRequest, NextResponse } from 'next/server';

import { redis } from '@/lib/redis';
import { UserService } from '@/services/userService';
import { validatePasswordStrength } from '@/utils/passwordValidation';

interface RegisterRequest {
  username: string;
  email: string;
  phone?: string; // 手机号选填
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    // 获取客户端IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    // 应用限流，每60秒最多1次注册请求
    const requestKey = `ratelimit:register:${ip}`;

    // 检查键是否存在以及剩余过期时间
    const ttl = await redis.ttl(requestKey);

    // 如果键存在且未过期，说明用户在限制时间内已经尝试过注册
    if (ttl > 0) {
      return NextResponse.json(
        {
          success: false,
          message: '注册请求过于频繁，请稍后再试',
          retryAfter: `${ttl}秒`,
        },
        {
          status: 429, // Too Many Requests
          headers: {
            'Retry-After': String(ttl),
          },
        }
      );
    }

    // 如果键不存在或已过期，继续处理注册请求
    const body: RegisterRequest = await request.json();
    const { username, email, phone, password } = body;

    // 基本验证
    if (!username || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: '用户名、邮箱和密码不能为空',
        },
        { status: 400 }
      );
    }

    // 验证用户名长度
    if (username.length < 3) {
      return NextResponse.json(
        {
          success: false,
          message: '用户名至少需要3个字符',
        },
        { status: 400 }
      );
    }

    // 验证密码强度
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: passwordValidation.message,
        },
        { status: 400 }
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: '请输入有效的邮箱地址',
        },
        { status: 400 }
      );
    }

    // 验证手机号格式（如果提供了手机号）
    if (phone) {
      const phoneRegex = /^[\d+\-\s()]{10,}$/;
      if (!phoneRegex.test(phone)) {
        return NextResponse.json(
          {
            success: false,
            message: '请输入有效的手机号码',
          },
          { status: 400 }
        );
      }
    }

    // 检查用户名是否已存在
    const existingUsername = await UserService.isUsernameExists(username);
    if (existingUsername) {
      return NextResponse.json(
        {
          success: false,
          message: '用户名已存在',
        },
        { status: 400 }
      );
    }

    // 检查邮箱是否已存在
    const existingEmail = await UserService.isEmailExists(email);
    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          message: '邮箱已被注册',
        },
        { status: 400 }
      );
    }

    // 检查手机号是否已存在（如果提供了手机号）
    if (phone) {
      const existingPhone = await UserService.isPhoneExists(phone);
      if (existingPhone) {
        return NextResponse.json(
          {
            success: false,
            message: '手机号已被注册',
          },
          { status: 400 }
        );
      }
    }

    // 加密密码
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 创建用户
    const newUser = await UserService.createUser({
      username,
      email,
      phone, // 可能为 undefined，这是允许的
      password_hash: hashedPassword,
      role: 'user', // 默认角色
    });

    // 注册成功后，设置限流标记，有效期300秒
    await redis.set(requestKey, '1', { ex: 300 });

    // 返回成功响应（不包含密码）
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      {
        success: true,
        message: '注册成功',
        data: {
          user: userWithoutPassword,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('注册失败:', error);
    return NextResponse.json(
      {
        success: false,
        message: '注册失败，请重试',
        error: error instanceof Error ? error.message : '未知错误',
      },
      { status: 500 }
    );
  }
}
