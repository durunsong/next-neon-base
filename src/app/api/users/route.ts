/**
 * 用户API路由
 * 提供用户相关的RESTful API接口
 */
import { NextRequest, NextResponse } from 'next/server';

import { UserService } from '@/services/userService';

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
