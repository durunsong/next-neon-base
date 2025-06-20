import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '首页',
  description: 'Next.js + Prisma + Neon 基础模版框架的首页',
  openGraph: {
    title: 'Next Neon Base - 首页',
    description: '现代化的基础模版框架首页',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <main className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Next Neon Base</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            基于 Next.js 15、Prisma ORM 和 Neon 云数据库的现代化基础模版框架
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🚀 Next.js 15</h3>
              <p className="text-gray-600">最新的React框架，支持App Router</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🗄️ Prisma ORM</h3>
              <p className="text-gray-600">类型安全的数据库操作</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">☁️ Neon 数据库</h3>
              <p className="text-gray-600">现代化的PostgreSQL云服务</p>
            </div>
          </div>
        </main>

        <footer className="text-center mt-16 text-gray-500">
          <p>&copy; 2025 Next Neon Base. 用于学习和开发的示例项目。</p>
        </footer>
      </div>
    </div>
  );
}
