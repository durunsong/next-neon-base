import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '客服中心',
  description: '联系我们的在线客服，获得即时帮助和支持',
  keywords: ['客服', '在线咨询', '技术支持', '帮助中心'],
  openGraph: {
    title: '客服中心 - Next Neon Base',
    description: '联系我们的在线客服团队',
  },
};

export default function CustomerServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* 页面头部 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">💬 客服中心</h1>
            <p className="text-xl text-gray-600">我们的客服团队随时为您提供帮助和支持</p>
          </div>

          {/* 功能介绍 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 即时回复</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                我们的在线客服系统支持实时聊天，您可以立即获得问题的答案。
                无需等待邮件回复，即时沟通更高效。
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>• 实时在线聊天</p>
                <p>• 文件传输支持</p>
                <p>• 聊天记录保存</p>
                <p>• 多语言支持</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🕒 服务时间</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                我们提供全天候的客服支持，确保您在任何时间都能获得帮助。
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">周一至周五:</span>
                  <span className="font-semibold text-gray-900">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">周六至周日:</span>
                  <span className="font-semibold text-gray-900">10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">紧急联系:</span>
                  <span className="font-semibold text-green-600">24/7 在线</span>
                </div>
              </div>
            </div>
          </div>

          {/* 如何使用 */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📱 如何使用客服</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👀</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">1. 查看右下角</h3>
                <p className="text-sm text-gray-600">在页面右下角找到蓝色的聊天图标</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">2. 点击开始聊天</h3>
                <p className="text-sm text-gray-600">点击图标打开聊天窗口，开始对话</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">3. 获得帮助</h3>
                <p className="text-sm text-gray-600">描述您的问题，我们会立即为您提供帮助</p>
              </div>
            </div>
          </div>

          {/* 常见问题 */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ 常见问题</h2>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Q: 客服是否收费？</h3>
                <p className="text-gray-600">
                  A: 我们的客服支持完全免费，您可以随时联系我们获得帮助。
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Q: 支持哪些语言？</h3>
                <p className="text-gray-600">
                  A: 目前主要支持中文和英文，我们正在扩展更多语言支持。
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Q: 聊天记录会保存吗？</h3>
                <p className="text-gray-600">
                  A: 是的，您的聊天记录会安全保存，方便后续查看和跟进。
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Q: 可以发送文件吗？</h3>
                <p className="text-gray-600">
                  A: 支持发送图片、文档等文件，最大支持10MB的文件上传。
                </p>
              </div>
            </div>
          </div>

          {/* 联系提示 */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">💡 提示</h2>
            <p className="mb-4 text-lg">
              看到右下角的聊天图标了吗？点击它就可以开始和我们的客服团队对话！
            </p>
            <div className="flex items-center justify-center space-x-2 text-blue-100">
              <span>👉</span>
              <span>查看页面右下角</span>
              <span>👈</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
