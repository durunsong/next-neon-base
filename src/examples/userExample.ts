/**
 * 用户API使用示例
 * 展示如何在前端调用用户相关的API接口
 */

// API基础配置
const API_BASE_URL =
  process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:3000';

/**
 * API响应类型定义
 */
interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

/**
 * 用户数据类型
 */
interface User {
  id: string;
  username: string;
  email?: string;
  phone?: string;
  avatar_url?: string;
  role?: string;
  provider?: string;
  provider_id?: string;
  is_verified?: boolean;
  is_active?: boolean;
  is_deleted?: boolean;
  login_count?: number;
  last_login_at?: string;
  last_login_ip?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * 用户列表响应类型
 */
interface UsersListResponse {
  users: User[];
  total: number;
  totalPages: number;
}

/**
 * 用户API工具类
 */
export class UserApiClient {
  /**
   * 获取用户列表
   */
  static async getUsers(page = 1, pageSize = 10): Promise<UsersListResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users?page=${page}&pageSize=${pageSize}`);

      const result: ApiResponse<UsersListResponse> = await response.json();

      if (!result.success) {
        throw new Error(result.message || '获取用户列表失败');
      }

      return result.data!;
    } catch (error) {
      console.error('获取用户列表失败:', error);
      throw error;
    }
  }

  /**
   * 获取单个用户信息
   */
  static async getUserById(id: string): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${id}`);

      const result: ApiResponse<User> = await response.json();

      if (!result.success) {
        throw new Error(result.message || '获取用户信息失败');
      }

      return result.data!;
    } catch (error) {
      console.error('获取用户信息失败:', error);
      throw error;
    }
  }

  /**
   * 创建新用户
   */
  static async createUser(userData: {
    username: string;
    email?: string;
    phone?: string;
    password_hash: string;
    avatar_url?: string;
    role?: string;
  }): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result: ApiResponse<User> = await response.json();

      if (!result.success) {
        throw new Error(result.message || '创建用户失败');
      }

      return result.data!;
    } catch (error) {
      console.error('创建用户失败:', error);
      throw error;
    }
  }

  /**
   * 更新用户信息
   */
  static async updateUser(
    id: string,
    userData: {
      email?: string;
      phone?: string;
      password_hash?: string;
      avatar_url?: string;
      role?: string;
    }
  ): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result: ApiResponse<User> = await response.json();

      if (!result.success) {
        throw new Error(result.message || '更新用户信息失败');
      }

      return result.data!;
    } catch (error) {
      console.error('更新用户信息失败:', error);
      throw error;
    }
  }

  /**
   * 删除用户
   */
  static async deleteUser(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: 'DELETE',
      });

      const result: ApiResponse = await response.json();

      if (!result.success) {
        throw new Error(result.message || '删除用户失败');
      }
    } catch (error) {
      console.error('删除用户失败:', error);
      throw error;
    }
  }
}

/**
 * 使用示例
 */
export async function userApiExamples() {
  try {
    // 1. 创建新用户
    console.log('=== 创建新用户 ===');
    const newUser = await UserApiClient.createUser({
      username: 'testuser001',
      email: 'test@example.com',
      password_hash: 'hashed_password', // 实际应用中应该使用加密后的密码
      role: 'user',
    });
    console.log('新用户创建成功:', newUser);

    // 2. 获取用户信息
    console.log('=== 获取用户信息 ===');
    const user = await UserApiClient.getUserById(newUser.id);
    console.log('用户信息:', user);

    // 3. 更新用户信息
    console.log('=== 更新用户信息 ===');
    const updatedUser = await UserApiClient.updateUser(newUser.id, {
      email: 'updated@example.com',
      avatar_url: 'https://example.com/avatar.jpg',
    });
    console.log('更新后的用户信息:', updatedUser);

    // 4. 获取用户列表
    console.log('=== 获取用户列表 ===');
    const usersList = await UserApiClient.getUsers(1, 10);
    console.log('用户列表:', usersList);

    // 5. 删除用户（可选，谨慎操作）
    // console.log('=== 删除用户 ===')
    // await UserApiClient.deleteUser(newUser.id)
    // console.log('用户删除成功')
  } catch (error) {
    console.error('API调用失败:', error);
  }
}
