import { NextResponse } from 'next/server';

import { redis } from '@/lib/redis';

/**
 * Redis连接测试API
 * 测试Redis的基本操作：设置值、获取值、删除值
 */
export async function GET() {
  try {
    console.log('开始Redis连接测试');
    console.log('Redis配置:', {
      url: process.env.UPSTASH_REDIS_REST_URL || '使用默认URL',
      hasToken: process.env.UPSTASH_REDIS_REST_TOKEN ? '已配置' : '未配置',
    });

    const testKey = 'test:connection';
    const testValue = 'Hello Redis! ' + new Date().toISOString();

    console.log(`尝试设置键: ${testKey}, 值: ${testValue}`);

    try {
      // 测试设置值
      await redis.set(testKey, testValue, { ex: 60 }); // 60秒过期
      console.log('设置值成功');
    } catch (setError) {
      console.error('设置值失败:', setError);
      return NextResponse.json(
        {
          success: false,
          message: '设置值失败',
          operation: 'set',
          error: setError instanceof Error ? setError.message : String(setError),
        },
        { status: 500 }
      );
    }

    let retrievedValue;
    try {
      // 测试获取值
      retrievedValue = await redis.get(testKey);
      console.log(`获取值成功: ${retrievedValue}`);
    } catch (getError) {
      console.error('获取值失败:', getError);
      return NextResponse.json(
        {
          success: false,
          message: '获取值失败',
          operation: 'get',
          error: getError instanceof Error ? getError.message : String(getError),
        },
        { status: 500 }
      );
    }

    let afterDelete;
    try {
      // 测试删除值
      await redis.del(testKey);
      console.log('删除值成功');

      // 验证删除是否成功
      afterDelete = await redis.get(testKey);
      console.log(`删除后获取值: ${afterDelete}`);
    } catch (deleteError) {
      console.error('删除值失败:', deleteError);
      return NextResponse.json(
        {
          success: false,
          message: '删除值失败',
          operation: 'delete',
          error: deleteError instanceof Error ? deleteError.message : String(deleteError),
        },
        { status: 500 }
      );
    }

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
        env: {
          hasUrl: !!process.env.UPSTASH_REDIS_REST_URL,
          hasToken: !!process.env.UPSTASH_REDIS_REST_TOKEN,
        },
      },
      { status: 500 }
    );
  }
}
