import { NextRequest, NextResponse } from 'next/server';

import { redis } from '@/lib/redis';

/**
 * 限流测试API
 * 每个IP在60秒内最多允许5次请求
 */
export async function GET(request: NextRequest) {
  try {
    // 获取客户端IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    console.log(`限流测试 - 客户端IP: ${ip}`);

    // 应用限流，每60秒最多5次请求
    const requestKey = `ratelimit:${ip}`;
    console.log(`限流键: ${requestKey}`);

    try {
      // 获取当前请求计数
      const count = await redis.incr(requestKey);
      console.log(`当前请求计数: ${count}`);

      // 如果是第一次请求，设置过期时间
      if (count === 1) {
        await redis.expire(requestKey, 60);
        console.log(`设置过期时间: 60秒`);
      }

      // 如果请求数超过限制，返回429
      if (count > 5) {
        console.log(`请求被限流: ${count} > 5`);
        return NextResponse.json(
          {
            success: false,
            message: '请求频率过高，请稍后再试',
            ip: ip,
            count: count,
            retryAfter: '60秒',
          },
          {
            status: 429, // Too Many Requests
            headers: {
              'Retry-After': '60',
            },
          }
        );
      }

      console.log(`请求允许通过: ${count} <= 5`);
      return NextResponse.json({
        success: true,
        message: '请求成功',
        ip: ip,
        count: count,
        timestamp: new Date().toISOString(),
      });
    } catch (redisError) {
      console.error('Redis操作失败:', redisError);
      return NextResponse.json(
        {
          success: false,
          message: 'Redis操作失败',
          error: redisError instanceof Error ? redisError.message : String(redisError),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('限流测试失败:', error);
    return NextResponse.json(
      {
        success: false,
        message: '限流测试失败',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
