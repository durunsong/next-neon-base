import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '../../../../services/userService';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// JWT密钥（生产环境应该使用环境变量）
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface LoginRequest {
  account: string;  // 改为通用的账号字段，支持邮箱、手机号、用户名
  password: string;
}

// 获取客户端IP地址
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0];
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { account, password } = body;

    // 基本验证
    if (!account || !password) {
      return NextResponse.json({
        success: false,
        message: '账号和密码不能为空'
      }, { status: 400 });
    }

    // 根据账号类型查找用户（支持邮箱、手机号、用户名）
    const user = await UserService.getUserByAccount(account);
    if (!user) {
      return NextResponse.json({
        success: false,
        message: '账号不存在或密码错误'
      }, { status: 401 });
    }

    // 检查用户状态
    if (!user.is_active) {
      return NextResponse.json({
        success: false,
        message: '账户已被禁用'
      }, { status: 401 });
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        message: '账号不存在或密码错误'
      }, { status: 401 });
    }

    // 生成JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // 准备返回的用户信息（不包含密码）
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...userWithoutPassword } = user;

    // 设置cookie
    const cookieStore = await cookies();
    cookieStore.set('auth_token_local', token, {
      httpOnly: false,
      sameSite: 'strict',
      maxAge: 86400, // 24小时
      secure: process.env.NODE_ENV === 'production'
    });

    cookieStore.set('auth_userInfo_local', JSON.stringify(userWithoutPassword), {
      httpOnly: false,
      sameSite: 'strict',
      maxAge: 86400, // 24小时
      secure: process.env.NODE_ENV === 'production'
    });

    // 更新用户登录信息
    const clientIP = getClientIP(request);
    await UserService.updateLoginInfo(user.id, clientIP);

    return NextResponse.json({
      success: true,
      message: '登录成功',
      data: {
        user: userWithoutPassword,
        token
      }
    });

  } catch (error) {
    console.error('登录失败:', error);
    return NextResponse.json({
      success: false,
      message: '登录失败，请重试',
      error: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
} 