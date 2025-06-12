import type { Metadata } from "next";

// 模拟的用户数据类型
interface User {
  id: string;
  username: string;
  email?: string;
  role?: string;
}

// 模拟获取用户数据的函数
async function getUser(id: string): Promise<User | null> {
  // 在实际项目中，这里会调用API或数据库
  // 这里只是模拟数据
  const users = [
    { id: '1', username: 'admin', email: 'admin@example.com', role: 'admin' },
    { id: '2', username: 'user1', email: 'user1@example.com', role: 'user' },
    { id: '3', username: 'user2', email: 'user2@example.com', role: 'user' },
  ];
  
  return users.find(user => user.id === id) || null;
}

// 动态生成metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const user = await getUser(id);
  
  if (!user) {
    return {
      title: "用户未找到",
      description: "请求的用户不存在",
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
            <a 
              href="/users" 
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              返回用户列表
            </a>
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
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                user.role === 'admin' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {user.role === 'admin' ? '管理员' : '普通用户'}
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">基本信息</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    用户ID
                  </label>
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {user.id}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    用户名
                  </label>
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {user.username}
                  </p>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    邮箱地址
                  </label>
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {user.email || '未设置'}
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex space-x-3">
                  <a 
                    href="/users" 
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                  >
                    返回列表
                  </a>
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