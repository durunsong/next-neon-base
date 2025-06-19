'use client';

import { CopyOutlined, DatabaseOutlined, ReloadOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Spin, Typography, message } from 'antd';

import { useEffect, useState } from 'react';

const { Text } = Typography;

interface DatabaseInfo {
  success: boolean;
  data?: {
    database: {
      name: string;
      version: string;
      size: string;
      fullVersion: string;
      currentUser: string;
    };
    statistics: {
      userTables: number;
      totalTables: number;
    };
    environment: {
      nodeVersion: string;
      platform: string;
      isDevelopment: boolean;
    };
    queriedAt: string;
  };
  error?: string;
  message?: string;
}

export default function DatabasePage() {
  const [databaseInfo, setDatabaseInfo] = useState<DatabaseInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDatabaseInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/database');
      const data = await response.json();
      setDatabaseInfo(data);
    } catch (error) {
      console.error('Failed to fetch database info:', error);
      setDatabaseInfo({
        success: false,
        error: 'Network error',
        message: 'Failed to connect to the API',
      });
    } finally {
      setLoading(false);
    }
  };

  // 复制到剪贴板的函数
  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      message.success(`${label} 已复制到剪贴板`);
    } catch {
      message.error('复制失败，请手动复制');
    }
  };

  useEffect(() => {
    fetchDatabaseInfo();
  }, []);

  if (loading) {
    return (
      <div className="p-12 text-center">
        <Spin size="large" />
        <p className="mt-4 text-lg">正在加载数据库信息...</p>
      </div>
    );
  }

  if (!databaseInfo || !databaseInfo.success) {
    return (
      <div className="p-6">
        <Alert
          message="数据库信息获取失败"
          description={databaseInfo?.message || '未知错误'}
          type="error"
          showIcon
          action={
            <Button size="small" type="primary" onClick={fetchDatabaseInfo}>
              重试
            </Button>
          }
        />
      </div>
    );
  }

  const { data } = databaseInfo;

  if (!data) {
    return (
      <div className="p-6">
        <Alert message="数据格式错误" type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <DatabaseOutlined className="mr-3" />
          数据库信息
        </h1>
        <Button
          icon={<ReloadOutlined />}
          onClick={fetchDatabaseInfo}
          loading={loading}
          size="large"
        >
          刷新
        </Button>
      </div>

      {/* 基础信息卡片 */}
      <Card title="数据库基础信息" className="mb-6">
        <div className="space-y-4">
          {/* 数据库名称 */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-gray-600 text-base font-medium">数据库名称:</span>
              <Text className="ml-3 text-lg font-semibold text-blue-600">{data.database.name}</Text>
            </div>
            <Button
              icon={<CopyOutlined />}
              size="small"
              onClick={() => copyToClipboard(data.database.name, '数据库名称')}
            />
          </div>

          {/* PostgreSQL版本 */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-gray-600 text-base font-medium">PostgreSQL版本:</span>
              <Text className="ml-3 text-lg font-semibold text-green-600">
                {data.database.version}
              </Text>
            </div>
            <Button
              icon={<CopyOutlined />}
              size="small"
              onClick={() => copyToClipboard(data.database.version, 'PostgreSQL版本')}
            />
          </div>

          {/* 数据库大小 */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-gray-600 text-base font-medium">数据库大小:</span>
              <Text className="ml-3 text-lg font-semibold text-purple-600">
                {data.database.size}
              </Text>
            </div>
            <Button
              icon={<CopyOutlined />}
              size="small"
              onClick={() => copyToClipboard(data.database.size, '数据库大小')}
            />
          </div>

          {/* 当前用户 */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-gray-600 text-base font-medium">当前用户:</span>
              <Text className="ml-3 text-lg font-semibold text-orange-600">
                {data.database.currentUser}
              </Text>
            </div>
            <Button
              icon={<CopyOutlined />}
              size="small"
              onClick={() => copyToClipboard(data.database.currentUser, '当前用户')}
            />
          </div>

          {/* 用户表数量 */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-gray-600 text-base font-medium">用户表数量:</span>
              <Text className="ml-3 text-lg font-semibold text-red-600">
                {data.statistics.userTables}
              </Text>
            </div>
            <Button
              icon={<CopyOutlined />}
              size="small"
              onClick={() => copyToClipboard(data.statistics.userTables.toString(), '用户表数量')}
            />
          </div>
        </div>
      </Card>

      {/* 系统环境信息 */}
      <Card title="系统环境信息" className="mb-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-gray-600 text-base font-medium">Node.js版本:</span>
              <Text className="ml-3 text-lg font-semibold">{data.environment.nodeVersion}</Text>
            </div>
            <Button
              icon={<CopyOutlined />}
              size="small"
              onClick={() => copyToClipboard(data.environment.nodeVersion, 'Node.js版本')}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-gray-600 text-base font-medium">运行平台:</span>
              <Text className="ml-3 text-lg font-semibold">{data.environment.platform}</Text>
            </div>
            <Button
              icon={<CopyOutlined />}
              size="small"
              onClick={() => copyToClipboard(data.environment.platform, '运行平台')}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-gray-600 text-base font-medium">环境类型:</span>
              <Text
                className={`ml-3 text-lg font-semibold ${data.environment.isDevelopment ? 'text-red-600' : 'text-green-600'}`}
              >
                {data.environment.isDevelopment ? '开发环境' : '生产环境'}
              </Text>
            </div>
            <Button
              icon={<CopyOutlined />}
              size="small"
              onClick={() =>
                copyToClipboard(
                  data.environment.isDevelopment ? '开发环境' : '生产环境',
                  '环境类型'
                )
              }
            />
          </div>
        </div>
      </Card>

      {/* 详细版本信息 */}
      <Card title="详细版本信息">
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-600 text-base font-medium">完整版本信息:</span>
              <Button
                icon={<CopyOutlined />}
                size="small"
                onClick={() => copyToClipboard(data.database.fullVersion, '完整版本信息')}
              />
            </div>
            <pre className="text-sm text-gray-800 whitespace-pre-wrap break-all">
              {data.database.fullVersion}
            </pre>
          </div>

          <div className="text-sm text-gray-500 text-center">
            查询时间: {new Date(data.queriedAt).toLocaleString('zh-CN')}
          </div>
        </div>
      </Card>
    </div>
  );
}
