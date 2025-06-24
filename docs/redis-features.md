# Redis 功能使用指南

本项目使用 Upstash Redis 实现了以下功能：

1. 验证码生成与验证
2. Redis 连接测试
3. 请求限流

## 功能说明

### 1. 验证码功能

验证码功能通常用于用户注册、登录或其他需要验证用户身份的场景。

**API 接口：**

- 生成验证码：`POST /api/captcha/generate`

  - 请求参数：`{ "key": "用户标识符" }`
  - 返回：`{ "success": true, "code": "123456", "message": "验证码生成成功", "expiresIn": "300秒" }`

- 验证验证码：`POST /api/captcha/verify`
  - 请求参数：`{ "key": "用户标识符", "code": "123456" }`
  - 返回：`{ "success": true, "message": "验证码验证成功" }`

### 2. Redis 连接测试

用于测试 Redis 连接是否正常，以及基本的 Redis 操作。

**API 接口：**

- Redis 测试：`GET /api/redis-example`
  - 返回：包含 Redis 操作结果的 JSON 对象

### 3. 请求限流

使用 Redis 实现的请求限流功能，可以限制每个 IP 在特定时间窗口内的请求次数。

**API 接口：**

- 限流测试：`GET /api/rate-limit-example`
  - 正常返回：`{ "success": true, "message": "请求成功", "ip": "客户端IP", "timestamp": "时间戳" }`
  - 被限流时返回：`{ "success": false, "message": "请求频率过高，请稍后再试", "ip": "客户端IP", "retryAfter": "60秒" }`，状态码为 429

## 测试页面

1. Redis 测试页面：`/redis-test`

   - 包含验证码测试、Redis 连接测试和限流测试功能

2. 限流测试页面：`/rate-limit-test`
   - 专门用于测试限流功能，可以连续发送请求观察限流效果

## 实现细节

### Redis 客户端配置

Redis 客户端使用 `@upstash/redis` 包实现，配置文件位于 `src/lib/redis.ts`。

```typescript
import { Redis } from '@upstash/redis';

// 创建Redis客户端实例
export const redis = new Redis({
  url: 'redis://default:ASz2AAIjcDFmOTJhYmMyNjI1MmQ0NmIwOGIxYjgyMWMyODA5NTBhOXAxMA@capable-crab-11510.upstash.io:6379',
});
```

### 验证码实现

验证码生成后存储在 Redis 中，设置 5 分钟的过期时间。验证成功后会自动从 Redis 中删除，防止重复使用。

### 限流实现

限流使用 Redis 的 `incr` 和 `expire` 命令实现，对每个 IP 在特定时间窗口内的请求进行计数。当请求次数超过限制时，返回 429 状态码。

## 如何扩展

1. **集成到注册/登录流程**：可以将验证码功能集成到用户注册和登录流程中，增加安全性。

2. **图形验证码**：可以扩展验证码功能，生成图形验证码而不是简单的数字验证码。

3. **更复杂的限流策略**：可以实现更复杂的限流策略，如针对不同 API 设置不同的限流规则。

4. **分布式锁**：可以使用 Redis 实现分布式锁，用于处理并发问题。

5. **缓存**：可以使用 Redis 作为缓存层，缓存频繁访问的数据，提高应用性能。
