import { NextRequest, NextResponse } from 'next/server';

import { redis } from '@/lib/redis';

/**
 * 验证码验证API
 * 请求参数：
 * - key: 验证码关联的标识符（如邮箱或手机号）
 * - code: 用户输入的验证码
 * 返回：
 * - success: 验证结果
 * - message: 操作结果消息
 */
export async function POST(request: NextRequest) {
  try {
    const { key, code } = await request.json();

    if (!key || !code) {
      return NextResponse.json({ success: false, message: '缺少必要参数' }, { status: 400 });
    }

    // 添加调试日志
    console.log(`开始验证验证码 - Key: ${key}, Code: ${code}`);

    // 直接从Redis获取验证码进行验证
    const redisKey = `captcha:${key}`;
    console.log(`Redis键名: ${redisKey}`);

    const storedCode = await redis.get(redisKey);
    console.log(`Redis中存储的验证码: ${storedCode}, 类型: ${typeof storedCode}`);
    console.log(`输入的验证码: ${code}, 类型: ${typeof code}`);

    // 将两者都转换为字符串进行比较
    const storedCodeStr = String(storedCode);
    const inputCodeStr = String(code);

    console.log(`转换后 - 存储的验证码: ${storedCodeStr}, 输入的验证码: ${inputCodeStr}`);

    // 验证验证码
    if (storedCode && storedCodeStr === inputCodeStr) {
      // 验证成功，删除验证码防止重复使用
      await redis.del(redisKey);
      console.log(`验证成功，已删除验证码: ${redisKey}`);

      return NextResponse.json({
        success: true,
        message: '验证码验证成功',
      });
    } else {
      console.log(
        `验证失败: 存储的验证码 ${storedCode} (${typeof storedCode}) 与输入的验证码 ${code} (${typeof code}) 不匹配或不存在`
      );
      return NextResponse.json(
        {
          success: false,
          message: '验证码无效或已过期',
          debug: {
            inputKey: key,
            inputCode: code,
            inputCodeType: typeof code,
            redisKey: redisKey,
            storedCode: storedCode,
            storedCodeType: typeof storedCode,
            isEqual: storedCodeStr === inputCodeStr,
          },
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('验证码验证失败:', error);
    return NextResponse.json(
      {
        success: false,
        message: '验证码验证失败',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
