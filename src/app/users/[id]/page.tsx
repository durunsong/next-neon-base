import type { Metadata } from 'next';
import Link from 'next/link';

import { UserService } from '../../../services/userService';

// 用户数据类型 - 与数据库结构匹配
interface User {
  id: string;
  username: string;
  email?: string | null;
  phone?: string | null;
  role?: string | null;
  avatar_url?: string | null;
  is_active: boolean | null;
  is_verified: boolean | null;
  provider?: string | null;
  created_at: string;
  updated_at: string;
  login_count: number | null; // 修复：允许为null
}

// 获取用户数据的函数 - 直接调用服务层
async function getUser(id: string): Promise<User | null> {
  try {
    // 直接调用 UserService，不需要 HTTP 请求
    const user = await UserService.getUserById(id);

    if (!user) {
      return null;
    }

    // 转换日期格式为字符串以符合接口定义，处理null值
    return {
      ...user,
      created_at: user.created_at?.toISOString() || new Date().toISOString(),
      updated_at: user.updated_at?.toISOString() || new Date().toISOString(),
    };
  } catch (error) {
    console.error('获取用户数据失败:', error);
    return null;
  }
}

// 动态生成metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const user = await getUser(id);

  if (!user) {
    return {
      title: '用户未找到',
      description: '请求的用户不存在',
    };
  }

  return {
    title: `${user.username} - 用户详情`,
    description: `查看用户 ${user.username} 的详细信息`,
    openGraph: {
      title: `${user.username} - 用户详情`,
      description: `用户 ${user.username} 的个人资料页面`,
    },
  };
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function UserDetailPage({ params }: Props) {
  const { id } = await params;
  const user = await getUser(id);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">用户未找到</h1>
            <p className="text-gray-600 mb-4">ID为 {id} 的用户不存在</p>
            <Link
              href="/users"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              返回用户列表
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">用户详情</h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}
              >
                {user.role === 'admin' ? '管理员' : '普通用户'}
              </span>
            </div>

            <div className="space-y-4">
              <div className="border-b pb-4">
                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  基本信息
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">用户ID</label>
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded border">{user.id}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {user.username}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">邮箱地址</label>
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {user.email || '未设置'}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">登录次数</label>
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {user.login_count || '未设置'}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">创建时间</label>
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {/* 格式化时间 */}
                    {user.created_at ? new Date(user.created_at).toLocaleString() : '未设置'}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex space-x-3">
                  <Link
                    href="/users"
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                  >
                    返回列表
                  </Link>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                    编辑用户
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
