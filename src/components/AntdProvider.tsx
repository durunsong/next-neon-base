'use client';

// React 19 兼容性补丁 - 在客户端组件中导入
import '@ant-design/v5-patch-for-react-19';

import React from 'react';
import { ConfigProvider } from 'antd';

// Ant Design 主题配置
const antdTheme = {
  token: {
    colorPrimary: '#FF6B6B',
    colorSuccess: '#4ECDC4',
    colorWarning: '#FFD93D',
    colorError: '#FF6B6B',
    colorInfo: '#45B7D1',
    fontFamily: 'var(--font-geist-sans)',
    borderRadius: 8,
    wireframe: false,
  },
  components: {
    Button: {
      borderRadius: 8,
      controlHeight: 40,
    },
    Card: {
      borderRadius: 12,
    },
    Menu: {
      itemHeight: 48,
      borderRadius: 8,
    },
  },
};

interface AntdProviderProps {
  children: React.ReactNode;
}

const AntdProvider: React.FC<AntdProviderProps> = ({ children }) => {
  return (
    <ConfigProvider theme={antdTheme}>
      {children}
    </ConfigProvider>
  );
};

export default AntdProvider; 