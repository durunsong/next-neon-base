/**
 * 单个用户API路由
 * 提供特定用户的获取、更新、删除操作
 */
import { NextRequest, NextResponse } from 'next/server';

import { UserService } from '../../../../services/userService';
import { checkUserPermission, verifyAuth } from '../../../../utils/auth';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/users/[id] - 获取单个用户信息
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // 验证用户身份
    const auth = await verifyAuth(request);
    if (!auth.isValid) {
      return NextResponse.json({ success: false, message: auth.error }, { status: 401 });
    }

    // 检查用户是否有权限访问（只能访问自己的信息）
    if (!checkUserPermission(auth.userId!, id)) {
      return NextResponse.json(
        { success: false, message: '无权限访问此用户信息' },
        { status: 403 }
      );
    }

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

    // 验证用户身份
    const auth = await verifyAuth(request);
    if (!auth.isValid) {
      return NextResponse.json({ success: false, message: auth.error }, { status: 401 });
    }

    // 检查用户是否有权限修改（只能修改自己的信息）
    if (!checkUserPermission(auth.userId!, id)) {
      return NextResponse.json(
        { success: false, message: '无权限修改此用户信息' },
        { status: 403 }
      );
    }

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

    // 验证用户身份
    const auth = await verifyAuth(request);
    if (!auth.isValid) {
      return NextResponse.json({ success: false, message: auth.error }, { status: 401 });
    }

    // 检查用户是否有权限删除（只能删除自己的账户）
    if (!checkUserPermission(auth.userId!, id)) {
      return NextResponse.json({ success: false, message: '无权限删除此用户' }, { status: 403 });
    }

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
