'use client';

import { Alert, Button, Card, Divider, Input, Space, Tag, Typography, message } from 'antd';

import React, { useState } from 'react';

const { Title, Text, Paragraph } = Typography;

// 定义类型
interface CaptchaResult {
  success: boolean;
  code?: string;
  message: string;
  expiresIn?: string;
  redisKey?: string;
  error?: string;
  debug?: Record<string, unknown>;
}

interface VerifyResult {
  success: boolean;
  message: string;
  status?: number;
  statusText?: string;
  error?: string;
  debug?: Record<string, unknown>;
}

interface RedisTestResult {
  success: boolean;
  message: string;
  operations?: Record<string, unknown>;
  error?: string;
}

interface RateLimitResult {
  success: boolean;
  message: string;
  ip?: string;
  timestamp?: string;
  retryAfter?: string;
  error?: string;
}

export default function RedisTestPage() {
  // 验证码相关状态
  const [key, setKey] = useState<string>('');
  const [captchaCode, setCaptchaCode] = useState<string>('');
  const [redisKey, setRedisKey] = useState<string>('');
  const [inputCode, setInputCode] = useState<string>('');
  const [captchaLoading, setCaptchaLoading] = useState<boolean>(false);
  const [verifyLoading, setVerifyLoading] = useState<boolean>(false);
  const [captchaResult, setCaptchaResult] = useState<CaptchaResult | null>(null);
  const [verifyResult, setVerifyResult] = useState<VerifyResult | null>(null);

  // Redis测试相关状态
  const [redisTestResult, setRedisTestResult] = useState<RedisTestResult | null>(null);
  const [redisTestLoading, setRedisTestLoading] = useState<boolean>(false);

  // 限流测试相关状态
  const [rateLimitResults, setRateLimitResults] = useState<RateLimitResult[]>([]);
  const [rateLimitLoading, setRateLimitLoading] = useState<boolean>(false);

  // 生成验证码
  const generateCaptcha = async () => {
    if (!key) {
      message.error('请输入标识符（如邮箱或手机号）');
      return;
    }

    setCaptchaLoading(true);
    setCaptchaResult(null);
    try {
      const response = await fetch('/api/captcha/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
      });

      const data = (await response.json()) as CaptchaResult;
      setCaptchaResult(data);

      if (data.success) {
        if (data.code) {
          setCaptchaCode(data.code);
        }
        if (data.redisKey) {
          setRedisKey(data.redisKey);
        }
        message.success('验证码生成成功');
      } else {
        message.error(data.message || '验证码生成失败');
      }
    } catch (error) {
      message.error('验证码生成请求失败');
      console.error(error);
      setCaptchaResult({
        success: false,
        message: '验证码生成请求失败',
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setCaptchaLoading(false);
    }
  };

  // 验证验证码
  const verifyCaptcha = async () => {
    if (!key || !inputCode) {
      message.error('请输入标识符和验证码');
      return;
    }

    setVerifyLoading(true);
    setVerifyResult(null);
    try {
      const response = await fetch('/api/captcha/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, code: inputCode }),
      });

      const data = (await response.json()) as VerifyResult;
      setVerifyResult({
        ...data,
        status: response.status,
        statusText: response.statusText,
      });

      if (data.success) {
        message.success('验证码验证成功');
        setInputCode('');
        setCaptchaCode('');
      } else {
        message.error(data.message || '验证码验证失败');
      }
    } catch (error) {
      message.error('验证码验证请求失败');
      console.error(error);
      setVerifyResult({
        success: false,
        message: '验证码验证请求失败',
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setVerifyLoading(false);
    }
  };

  // 测试Redis连接
  const testRedisConnection = async () => {
    setRedisTestLoading(true);
    try {
      const response = await fetch('/api/redis-example');
      const data = (await response.json()) as RedisTestResult;

      setRedisTestResult(data);

      if (data.success) {
        message.success('Redis连接测试成功');
      } else {
        message.error(data.message || 'Redis连接测试失败');
      }
    } catch (error) {
      message.error('Redis连接测试请求失败');
      console.error(error);
      setRedisTestResult({
        success: false,
        message: 'Redis连接测试请求失败',
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setRedisTestLoading(false);
    }
  };

  // 测试限流功能
  const testRateLimit = async () => {
    setRateLimitLoading(true);
    try {
      const response = await fetch('/api/rate-limit-example');
      const data = (await response.json()) as RateLimitResult;

      setRateLimitResults(prev => [data, ...prev].slice(0, 10));

      if (!data.success) {
        message.warning(data.message || '请求被限流');
      }
    } catch (error) {
      message.error('限流测试请求失败');
      console.error(error);
      setRateLimitResults(prev =>
        [
          {
            success: false,
            message: '限流测试请求失败',
            error: error instanceof Error ? error.message : String(error),
            timestamp: new Date().toISOString(),
          },
          ...prev,
        ].slice(0, 10)
      );
    } finally {
      setRateLimitLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Title level={2}>Redis 功能测试</Title>

      <Divider orientation="left">验证码测试</Divider>
      <Card title="验证码生成与验证" className="mb-6">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text>标识符（邮箱/手机号）：</Text>
            <Input
              placeholder="请输入邮箱或手机号"
              value={key}
              onChange={e => setKey(e.target.value)}
              style={{ width: 300 }}
            />
          </div>

          <Space>
            <Button type="primary" onClick={generateCaptcha} loading={captchaLoading}>
              获取验证码
            </Button>
            {captchaCode && <Text type="success">生成的验证码: {captchaCode}</Text>}
            {redisKey && <Tag color="blue">Redis键: {redisKey}</Tag>}
          </Space>

          {captchaResult && (
            <Alert
              type={captchaResult.success ? 'success' : 'error'}
              message="验证码生成结果"
              description={
                <pre className="bg-gray-50 p-2 rounded mt-2 overflow-auto text-xs">
                  {JSON.stringify(captchaResult, null, 2)}
                </pre>
              }
            />
          )}

          <div>
            <Text>输入验证码：</Text>
            <Input
              placeholder="请输入验证码"
              value={inputCode}
              onChange={e => setInputCode(e.target.value)}
              style={{ width: 200 }}
            />
          </div>

          <Button type="primary" onClick={verifyCaptcha} loading={verifyLoading}>
            验证
          </Button>

          {verifyResult && (
            <Alert
              type={verifyResult.success ? 'success' : 'error'}
              message="验证码验证结果"
              description={
                <pre className="bg-gray-50 p-2 rounded mt-2 overflow-auto text-xs">
                  {JSON.stringify(verifyResult, null, 2)}
                </pre>
              }
            />
          )}
        </Space>
      </Card>

      <Divider orientation="left">Redis连接测试</Divider>
      <Card title="Redis连接测试" className="mb-6">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button type="primary" onClick={testRedisConnection} loading={redisTestLoading}>
            测试Redis连接
          </Button>

          {redisTestResult && (
            <div className="mt-4">
              <Text strong>测试结果：</Text>
              <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto">
                {JSON.stringify(redisTestResult, null, 2)}
              </pre>
            </div>
          )}
        </Space>
      </Card>

      <Divider orientation="left">限流测试</Divider>
      <Card title="限流测试 (每60秒最多5次请求)">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Paragraph>
            点击下方按钮多次，测试限流功能。连续点击超过5次后，将会收到限流提示。
          </Paragraph>

          <Button type="primary" onClick={testRateLimit} loading={rateLimitLoading}>
            发送请求
          </Button>

          {rateLimitResults.length > 0 && (
            <div className="mt-4">
              <Text strong>测试结果（最近10次）：</Text>
              <div className="bg-gray-100 p-4 rounded mt-2 overflow-auto max-h-96">
                {rateLimitResults.map((result, index) => (
                  <div
                    key={index}
                    className={`mb-2 p-2 rounded ${result.success ? 'bg-green-100' : 'bg-red-100'}`}
                  >
                    <div>
                      <Text strong>状态：</Text> {result.success ? '成功' : '被限流'}
                    </div>
                    <div>
                      <Text strong>消息：</Text> {result.message}
                    </div>
                    {result.ip && (
                      <div>
                        <Text strong>IP：</Text> {result.ip}
                      </div>
                    )}
                    {result.timestamp && (
                      <div>
                        <Text strong>时间：</Text> {result.timestamp}
                      </div>
                    )}
                    {result.retryAfter && (
                      <div>
                        <Text strong>重试时间：</Text> {result.retryAfter}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Space>
      </Card>
    </div>
  );
}
