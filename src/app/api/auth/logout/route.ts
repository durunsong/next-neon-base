/**
 * 用户退出登录 API 接口
 * POST /api/auth/logout
 */

import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // 创建响应
    const response = NextResponse.json({
      success: true,
      message: '退出登录成功'
    })

    // 清除cookies
    response.cookies.set('token', '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0 // 立即过期
    })

    response.cookies.set('user', '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0 // 立即过期
    })

    return response

  } catch (error) {
    console.error('退出登录失败:', error)
    return NextResponse.json({
      success: false,
      message: '退出登录失败',
      error: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 })
  }
} 