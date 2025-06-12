/**
 * Prisma数据库连接实例
 * 全局单例模式，避免重复创建连接
 */

import { PrismaClient } from '@prisma/client'

// 全局变量类型声明
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// 创建Prisma客户端实例
// 在开发环境中使用全局变量避免热重载时重复创建连接
const prisma = global.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // 启用日志记录
})

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma
}

export default prisma 