'use client';

import { Progress } from 'antd';

import React from 'react';

import { PasswordStrength, checkPasswordStrength } from '@/utils/passwordValidation';

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

export default function PasswordStrengthIndicator({
  password,
  className = '',
}: PasswordStrengthIndicatorProps) {
  // 如果密码为空，不显示任何内容
  if (!password) {
    return null;
  }

  const result = checkPasswordStrength(password);

  // 根据强度等级设置颜色
  const getColor = (strength: PasswordStrength) => {
    switch (strength) {
      case PasswordStrength.WEAK:
        return '#ff4d4f'; // 红色
      case PasswordStrength.MEDIUM:
        return '#faad14'; // 橙色
      case PasswordStrength.STRONG:
        return '#52c41a'; // 绿色
      case PasswordStrength.VERY_STRONG:
        return '#1890ff'; // 蓝色
      default:
        return '#d9d9d9'; // 灰色
    }
  };

  // 获取强度文本样式
  const getTextStyle = (strength: PasswordStrength) => {
    const color = getColor(strength);
    return {
      color,
      fontWeight: 'bold' as const,
      fontSize: '12px',
    };
  };

  return (
    <div className={`password-strength-indicator ${className}`}>
      {/* 强度进度条 */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-gray-500 min-w-[60px]">密码强度:</span>
        <Progress
          percent={result.score}
          size="small"
          strokeColor={getColor(result.strength)}
          showInfo={false}
          className="flex-1"
        />
        <span style={getTextStyle(result.strength)}>{result.message}</span>
      </div>

      {/* 建议列表 */}
      {result.suggestions.length > 0 && (
        <div className="text-xs text-gray-500">
          <div className="mb-1">建议:</div>
          <ul className="list-none pl-0 space-y-1">
            {result.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-1">
                <span className="text-orange-400 mt-0.5">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 成功提示 */}
      {result.isValid && result.suggestions.length === 0 && (
        <div className="text-xs text-green-600 flex items-center gap-1">
          <span>✓</span>
          <span>密码强度良好</span>
        </div>
      )}
    </div>
  );
}
