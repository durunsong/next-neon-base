import { Redis } from '@upstash/redis';

// 创建Redis客户端实例
// Upstash Redis客户端需要使用REST API URL和令牌
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || 'https://capable-crab-11510.upstash.io',
  token:
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    'ASz2AAIjcDFmOTJhYmMyNjI1MmQ0NmIwOGIxYjgyMWMyODA5NTBhOXAxMA',
});

// 也可以使用自动从环境变量加载的方式
// export const redis = Redis.fromEnv();

/**
 * 生成验证码
 * @param length 验证码长度
 * @returns 生成的验证码
 */
export function generateCaptchaCode(length: number = 6): string {
  const characters = '0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

/**
 * 保存验证码到Redis
 * @param key 验证码的键（通常是用户邮箱或手机号）
 * @param code 验证码
 * @param expiresInSeconds 过期时间（秒）
 */
export async function saveCaptchaToRedis(
  key: string,
  code: string,
  expiresInSeconds: number = 300
): Promise<void> {
  // 使用带命名空间的键，防止冲突
  const redisKey = `captcha:${key}`;
  console.log(`保存验证码到Redis: ${redisKey} = ${code}, 过期时间: ${expiresInSeconds}秒`);
  await redis.set(redisKey, code, { ex: expiresInSeconds });
}

/**
 * 验证验证码
 * @param key 验证码的键（通常是用户邮箱或手机号）
 * @param code 用户输入的验证码
 * @returns 验证是否成功
 */
export async function verifyCaptcha(key: string, code: string): Promise<boolean> {
  // 使用带命名空间的键，防止冲突
  const redisKey = `captcha:${key}`;
  console.log(`验证验证码: ${redisKey}, 输入的验证码: ${code}`);

  const storedCode = await redis.get(redisKey);
  console.log(`Redis中存储的验证码: ${storedCode}`);

  if (!storedCode || storedCode !== code) {
    console.log(`验证失败: 存储的验证码 ${storedCode} 与输入的验证码 ${code} 不匹配或不存在`);
    return false;
  }

  // 验证成功后删除验证码，防止重复使用
  console.log(`验证成功，删除验证码: ${redisKey}`);
  await redis.del(redisKey);
  return true;
}

/**
 * 实现简单的限流功能
 * @param key 限流的键（通常是IP或用户ID）
 * @param limit 时间窗口内允许的最大请求数
 * @param windowInSeconds 时间窗口（秒）
 * @returns 是否允许请求
 */
export async function rateLimit(
  key: string,
  limit: number = 10,
  windowInSeconds: number = 60
): Promise<boolean> {
  const requestKey = `ratelimit:${key}`;

  // 获取当前请求计数
  const count = await redis.incr(requestKey);
  console.log(`限流检查: ${requestKey}, 当前计数: ${count}, 限制: ${limit}`);

  // 如果是第一次请求，设置过期时间
  if (count === 1) {
    await redis.expire(requestKey, windowInSeconds);
    console.log(`设置过期时间: ${requestKey}, ${windowInSeconds}秒`);
  }

  // 如果请求数超过限制，返回false
  return count <= limit;
}
