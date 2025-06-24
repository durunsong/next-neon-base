import { NextRequest, NextResponse } from 'next/server';

import { generateCaptchaCode, redis } from '@/lib/redis';

/**
 * 生成验证码API
 * 请求参数：
 * - key: 验证码关联的标识符（如邮箱或手机号）
 * 返回：
 * - code: 生成的验证码
 * - message: 操作结果消息
 */
export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json();

    if (!key) {
      return NextResponse.json({ success: false, message: '缺少必要参数key' }, { status: 400 });
    }

    // 生成6位数字验证码
    const captchaCode = generateCaptchaCode(6);
    console.log(`生成验证码 - Key: ${key}, Code: ${captchaCode}, 类型: ${typeof captchaCode}`);

    // 直接使用Redis客户端设置验证码，不使用封装的函数
    const redisKey = `captcha:${key}`;

    // 确保验证码是字符串类型
    const captchaCodeStr = String(captchaCode);
    await redis.set(redisKey, captchaCodeStr, { ex: 300 });
    console.log(
      `直接设置验证码到Redis - Key: ${redisKey}, Code: ${captchaCodeStr}, 类型: ${typeof captchaCodeStr}, 过期时间: 300秒`
    );

    // 验证是否成功保存到Redis
    const storedCode = await redis.get(redisKey);
    console.log(
      `验证码存储结果 - Key: ${redisKey}, StoredCode: ${storedCode}, 类型: ${typeof storedCode}`
    );

    // 在实际应用中，这里可能会发送短信或邮件
    // 为了测试方便，这里直接返回验证码
    return NextResponse.json({
      success: true,
      code: captchaCode,
      message: '验证码生成成功',
      expiresIn: '300秒',
      redisKey: redisKey, // 返回Redis中的实际键名，用于调试
      debug: {
        codeType: typeof captchaCode,
        storedCodeType: typeof storedCode,
      },
    });
  } catch (error) {
    console.error('生成验证码失败:', error);
    return NextResponse.json(
      {
        success: false,
        message: '生成验证码失败',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
