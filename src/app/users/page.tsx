import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "用户管理",
  description: "用户列表和管理功能页面",
  openGraph: {
    title: "用户管理 - Next Neon Base",
    description: "管理系统用户信息",
  },
};

export default function UsersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">用户管理</h1>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              这里是用户管理页面，可以查看和管理系统用户。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900">API 接口</h3>
                <p className="text-sm text-blue-700 mt-1">
                  <code>GET /api/users</code>
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900">创建用户</h3>
                <p className="text-sm text-green-700 mt-1">
                  <code>POST /api/users</code>
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900">更新用户</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  <code>PUT /api/users/[id]</code>
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-900">删除用户</h3>
                <p className="text-sm text-red-700 mt-1">
                  <code>DELETE /api/users/[id]</code>
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">功能特性</h2>
            <ul className="space-y-2 text-gray-600">
              <li>✅ 用户列表分页查询</li>
              <li>✅ 创建新用户</li>
              <li>✅ 更新用户信息</li>
              <li>✅ 软删除用户</li>
              <li>✅ 用户状态管理</li>
              <li>✅ 登录记录追踪</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 