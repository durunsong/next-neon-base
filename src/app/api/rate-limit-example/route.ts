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
    // 应用限流，每60秒最多5次请求
    const requestKey = `ratelimit:${ip}`;
    try {
      // 检查键是否存在以及剩余过期时间
      const ttl = await redis.ttl(requestKey);
      // 如果键不存在(ttl = -2)或已过期(ttl = -1)，则删除并重置
      if (ttl < 0) {
        await redis.del(requestKey);

        // 设置初始计数为1并设置过期时间
        await redis.set(requestKey, '1', { ex: 60 });
        // 返回成功响应
        return NextResponse.json({
          success: true,
          message: '请求成功',
          ip: ip,
          count: 1,
          timestamp: new Date().toISOString(),
        });
      }

      // 获取当前计数
      const currentCount = (await redis.get(requestKey)) as string | null;
      const count = parseInt(currentCount || '0', 10);
      // 如果已经超过限制
      if (count >= 5) {
        return NextResponse.json(
          {
            success: false,
            message: '请求频率过高，请稍后再试',
            ip: ip,
            count: count + 1, // 显示增加后的计数
            retryAfter: `${ttl}秒`, // 显示实际剩余时间
          },
          {
            status: 429, // Too Many Requests
            headers: {
              'Retry-After': String(ttl),
            },
          }
        );
      }

      // 增加计数
      const newCount = await redis.incr(requestKey);
      // 返回成功响应
      return NextResponse.json({
        success: true,
        message: '请求成功',
        ip: ip,
        count: newCount,
        timestamp: new Date().toISOString(),
      });
    } catch (redisError) {
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
