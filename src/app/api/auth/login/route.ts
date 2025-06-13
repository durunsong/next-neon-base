/**
 * 用户登录 API 接口
 * POST /api/auth/login
 */

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { UserService } from '@/services/userService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { loginId, password } = body

    // 基本数据验证
    if (!loginId || !password) {
      return NextResponse.json({
        success: false,
        message: '请填写登录账号和密码'
      }, { status: 400 })
    }

    // 尝试通过不同方式查找用户
    let user = null

    // 先尝试用户名
    user = await UserService.getUserByUsername(loginId)
    
    // 如果没找到，且包含@符号，尝试邮箱
    if (!user && loginId.includes('@')) {
      user = await UserService.getUserByEmail(loginId)
    }
    
    // 如果还没找到，且是11位数字，尝试手机号
    if (!user && /^1[3-9]\d{9}$/.test(loginId)) {
      user = await UserService.getUserByPhone(loginId)
    }

    // 用户不存在
    if (!user) {
      return NextResponse.json({
        success: false,
        message: '用户不存在或登录信息错误'
      }, { status: 401 })
    }

    // 检查用户状态
    if (user.is_deleted) {
      return NextResponse.json({
        success: false,
        message: '该账户已被删除'
      }, { status: 401 })
    }

    if (!user.is_active) {
      return NextResponse.json({
        success: false,
        message: '该账户已被禁用，请联系管理员'
      }, { status: 401 })
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password_hash)
    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        message: '用户不存在或登录信息错误'
      }, { status: 401 })
    }

    // 获取客户端 IP
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                    request.headers.get('x-real-ip') || 
                    '127.0.0.1'

    // 更新登录信息
    await UserService.updateLoginInfo(user.id, clientIp)

    // 返回用户信息（不包含密码）
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...userWithoutPassword } = user
    
    const token = `temp-token-${user.id}` // 临时 token，实际项目中应使用 JWT

    // 创建响应并设置cookies
    const response = NextResponse.json({
      success: true,
      message: '登录成功！欢迎回来',
      data: {
        user: userWithoutPassword,
        token: token
      }
    })

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
    console.error('用户登录失败:', error)
    return NextResponse.json({
      success: false,
      message: '登录失败，请稍后重试',
      error: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 })
  }
} 