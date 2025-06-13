/**
 * 用户注册 API 接口
 * POST /api/auth/register
 */

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { UserService } from '@/services/userService'

// 验证邮箱格式
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// 验证手机号格式
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

// 验证密码强度
function isValidPassword(password: string): boolean {
  // 至少8位，包含字母和数字
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/
  return passwordRegex.test(password)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, email, phone, password, confirmPassword } = body

    // 基本数据验证
    if (!username || !password) {
      return NextResponse.json({
        success: false,
        message: '用户名和密码不能为空'
      }, { status: 400 })
    }

    // 验证用户名长度
    if (username.length < 3 || username.length > 20) {
      return NextResponse.json({
        success: false,
        message: '用户名长度必须在3-20个字符之间'
      }, { status: 400 })
    }

    // 验证密码确认
    if (password !== confirmPassword) {
      return NextResponse.json({
        success: false,
        message: '两次输入的密码不一致'
      }, { status: 400 })
    }

    // 验证密码强度
    if (!isValidPassword(password)) {
      return NextResponse.json({
        success: false,
        message: '密码至少8位，必须包含字母和数字'
      }, { status: 400 })
    }

    // 验证邮箱格式（如果提供）
    if (email && !isValidEmail(email)) {
      return NextResponse.json({
        success: false,
        message: '邮箱格式不正确'
      }, { status: 400 })
    }

    // 验证手机号格式（如果提供）
    if (phone && !isValidPhone(phone)) {
      return NextResponse.json({
        success: false,
        message: '手机号格式不正确'
      }, { status: 400 })
    }

    // 检查用户名是否已存在
    const usernameExists = await UserService.isUsernameExists(username)
    if (usernameExists) {
      return NextResponse.json({
        success: false,
        message: '用户名已存在，请选择其他用户名'
      }, { status: 400 })
    }

    // 检查邮箱是否已存在
    if (email) {
      const emailExists = await UserService.isEmailExists(email)
      if (emailExists) {
        return NextResponse.json({
          success: false,
          message: '邮箱已被注册，请使用其他邮箱'
        }, { status: 400 })
      }
    }

    // 检查手机号是否已存在
    if (phone) {
      const phoneExists = await UserService.isPhoneExists(phone)
      if (phoneExists) {
        return NextResponse.json({
          success: false,
          message: '手机号已被注册，请使用其他手机号'
        }, { status: 400 })
      }
    }

    // 加密密码
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // 获取客户端 IP
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                    request.headers.get('x-real-ip') || 
                    '127.0.0.1'

    // 创建用户
    const user = await UserService.createUser({
      username,
      email,
      phone,
      password_hash: passwordHash,
      role: 'user'
    })

    // 更新登录信息
    await UserService.updateLoginInfo(user.id, clientIp)

    // 返回用户信息（不包含密码）
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...userWithoutPassword } = user
    
    const token = `temp-token-${user.id}` // 临时 token，实际项目中应使用 JWT

    // 创建响应并设置cookies
    const response = NextResponse.json({
      success: true,
      message: '注册成功！欢迎加入极速汽车',
      data: {
        user: userWithoutPassword,
        token: token
      }
    }, { status: 201 })

    // 设置cookies，有效期7天
    response.cookies.set('token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7天
    })

    response.cookies.set('user', JSON.stringify(userWithoutPassword), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7天
    })

    return response

  } catch (error) {
    console.error('用户注册失败:', error)
    return NextResponse.json({
      success: false,
      message: '注册失败，请稍后重试',
      error: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 })
  }
} 