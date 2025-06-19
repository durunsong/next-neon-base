/**
 * 用户服务类
 * 提供用户相关的数据库操作方法
 */
import type { next_base_user } from '@prisma/client';

import prisma from '../lib/prisma';

// 用户创建类型（排除自动生成的字段）
export type CreateUserInput = {
  username: string;
  email?: string;
  phone?: string;
  password_hash: string;
  avatar_url?: string;
  role?: string;
  provider?: string;
  provider_id?: string;
};

// 用户更新类型
export type UpdateUserInput = Partial<Omit<CreateUserInput, 'username'>>;

/**
 * 用户服务类
 */
export class UserService {
  /**
   * 创建新用户
   */
  static async createUser(userData: CreateUserInput): Promise<next_base_user> {
    return await prisma.next_base_user.create({
      data: userData,
    });
  }

  /**
   * 根据ID获取用户
   */
  static async getUserById(id: string): Promise<next_base_user | null> {
    return await prisma.next_base_user.findUnique({
      where: { id },
    });
  }

  /**
   * 根据用户名获取用户
   */
  static async getUserByUsername(username: string): Promise<next_base_user | null> {
    return await prisma.next_base_user.findUnique({
      where: { username },
    });
  }

  /**
   * 根据邮箱获取用户
   */
  static async getUserByEmail(email: string): Promise<next_base_user | null> {
    return await prisma.next_base_user.findUnique({
      where: { email },
    });
  }

  /**
   * 根据手机号获取用户
   */
  static async getUserByPhone(phone: string): Promise<next_base_user | null> {
    return await prisma.next_base_user.findUnique({
      where: { phone },
    });
  }

  /**
   * 根据账号获取用户（支持邮箱、手机号、用户名）
   */
  static async getUserByAccount(account: string): Promise<next_base_user | null> {
    // 尝试按邮箱查找
    if (account.includes('@')) {
      return await this.getUserByEmail(account);
    }

    // 尝试按手机号查找（假设手机号是纯数字或包含+/-符号）
    if (/^[\d+\-\s()]+$/.test(account)) {
      const user = await this.getUserByPhone(account);
      if (user) return user;
    }

    // 最后按用户名查找
    return await this.getUserByUsername(account);
  }

  /**
   * 获取所有用户（支持分页）
   */
  static async getUsers(
    page: number = 1,
    pageSize: number = 10
  ): Promise<{
    users: next_base_user[];
    total: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * pageSize;

    const [users, total] = await Promise.all([
      prisma.next_base_user.findMany({
        skip,
        take: pageSize,
        where: {
          is_deleted: false,
          is_active: true,
        },
        orderBy: {
          created_at: 'desc',
        },
      }),
      prisma.next_base_user.count({
        where: {
          is_deleted: false,
          is_active: true,
        },
      }),
    ]);

    return {
      users,
      total,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  /**
   * 更新用户信息
   */
  static async updateUser(id: string, userData: UpdateUserInput): Promise<next_base_user> {
    return await prisma.next_base_user.update({
      where: { id },
      data: {
        ...userData,
        updated_at: new Date(),
      },
    });
  }

  /**
   * 软删除用户
   */
  static async deleteUser(id: string): Promise<next_base_user> {
    return await prisma.next_base_user.update({
      where: { id },
      data: {
        is_deleted: true,
        is_active: false,
        updated_at: new Date(),
      },
    });
  }

  /**
   * 更新用户登录信息
   */
  static async updateLoginInfo(id: string, loginIp?: string): Promise<next_base_user> {
    return await prisma.next_base_user.update({
      where: { id },
      data: {
        login_count: {
          increment: 1,
        },
        last_login_at: new Date(),
        last_login_ip: loginIp,
        updated_at: new Date(),
      },
    });
  }

  /**
   * 验证用户邮箱
   */
  static async verifyUser(id: string): Promise<next_base_user> {
    return await prisma.next_base_user.update({
      where: { id },
      data: {
        is_verified: true,
        updated_at: new Date(),
      },
    });
  }

  /**
   * 检查用户名是否已存在
   */
  static async isUsernameExists(username: string): Promise<boolean> {
    const user = await prisma.next_base_user.findUnique({
      where: { username },
      select: { id: true },
    });
    return !!user;
  }

  /**
   * 检查邮箱是否已存在
   */
  static async isEmailExists(email: string): Promise<boolean> {
    const user = await prisma.next_base_user.findUnique({
      where: { email },
      select: { id: true },
    });
    return !!user;
  }

  /**
   * 检查手机号是否已存在
   */
  static async isPhoneExists(phone: string): Promise<boolean> {
    const user = await prisma.next_base_user.findUnique({
      where: { phone },
      select: { id: true },
    });
    return !!user;
  }
}
