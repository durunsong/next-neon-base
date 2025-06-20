'use client';

import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Spin, message } from 'antd';

import React, { useRef, useState } from 'react';

interface AvatarUploadProps {
  currentAvatar?: string | null;
  onAvatarChange?: (newAvatarUrl: string) => void;
}

export default function AvatarUpload({ currentAvatar, onAvatarChange }: AvatarUploadProps) {
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(currentAvatar || undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 处理文件选择
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      message.error('只支持图片格式：JPEG、PNG、GIF、WebP');
      return;
    }

    // 验证文件大小（限制5MB）
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      message.error('文件大小不能超过5MB');
      return;
    }

    uploadAvatar(file);
  };

  // 上传头像
  const uploadAvatar = async (file: File) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch('/api/upload/avatar', {
        method: 'POST',
        body: formData,
        credentials: 'include', // 包含cookies
      });

      const result = await response.json();

      if (result.success) {
        setAvatarUrl(result.data.avatarUrl);
        onAvatarChange?.(result.data.avatarUrl);
        message.success('头像上传成功！');
      } else {
        message.error(result.message || '上传失败');
      }
    } catch (error) {
      console.error('上传头像错误：', error);
      message.error('上传失败，请重试');
    } finally {
      setLoading(false);
      // 清空文件输入
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // 触发文件选择
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* 头像显示 */}
      <div className="relative">
        <Avatar
          size={120}
          src={avatarUrl}
          icon={!avatarUrl && <UserOutlined />}
          className="border-4 border-gray-200 shadow-lg"
        />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
            <Spin size="large" />
          </div>
        )}
      </div>

      {/* 上传按钮 */}
      <Button
        type="primary"
        icon={<UploadOutlined />}
        onClick={handleUploadClick}
        loading={loading}
        disabled={loading}
      >
        {loading ? '上传中...' : '更换头像'}
      </Button>

      {/* 隐藏的文件输入 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {/* 提示信息 */}
      <div className="text-sm text-gray-500 text-center">
        <p>支持 JPEG、PNG、GIF、WebP 格式</p>
        <p>文件大小不超过 5MB</p>
      </div>
    </div>
  );
}
