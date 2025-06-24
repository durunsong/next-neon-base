import { NextResponse } from 'next/server';

import { redis } from '@/lib/redis';

/**
 * Redis连接测试API
 * 测试Redis的基本操作：设置值、获取值、删除值
 */
export async function GET() {
  try {
    const testKey = 'test:connection';
    const testValue = 'Hello Redis! ' + new Date().toISOString();

    // 测试设置值
    await redis.set(testKey, testValue, { ex: 60 }); // 60秒过期

    // 测试获取值
    const retrievedValue = await redis.get(testKey);

    // 测试删除值
    await redis.del(testKey);

    // 验证删除是否成功
    const afterDelete = await redis.get(testKey);

    return NextResponse.json({
      success: true,
      message: 'Redis连接测试成功',
      operations: {
        set: { key: testKey, value: testValue },
        get: { key: testKey, value: retrievedValue },
        delete: { key: testKey, valueAfterDelete: afterDelete },
      },
    });
  } catch (error) {
    console.error('Redis连接测试失败:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Redis连接测试失败',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
