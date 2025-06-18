// 密码强度等级
export enum PasswordStrength {
  WEAK = 'weak',
  MEDIUM = 'medium',
  STRONG = 'strong',
  VERY_STRONG = 'very_strong'
}

// 密码强度结果
export interface PasswordStrengthResult {
  strength: PasswordStrength;
  score: number; // 0-100分
  message: string;
  suggestions: string[];
  isValid: boolean;
}

// 检查密码强度
export function checkPasswordStrength(password: string): PasswordStrengthResult {
  const suggestions: string[] = [];
  let score = 0;

  // 基本长度检查
  if (password.length < 6) {
    return {
      strength: PasswordStrength.WEAK,
      score: 0,
      message: '密码过短',
      suggestions: ['密码至少需要6个字符'],
      isValid: false
    };
  }

  // 长度评分
  if (password.length >= 8) score += 20;
  if (password.length >= 12) score += 10;
  else if (password.length < 8) suggestions.push('建议密码长度至少8位');

  // 包含小写字母
  if (/[a-z]/.test(password)) {
    score += 15;
  } else {
    suggestions.push('建议包含小写字母');
  }

  // 包含大写字母
  if (/[A-Z]/.test(password)) {
    score += 15;
  } else {
    suggestions.push('建议包含大写字母');
  }

  // 包含数字
  if (/[0-9]/.test(password)) {
    score += 15;
  } else {
    suggestions.push('建议包含数字');
  }

  // 包含特殊字符
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score += 20;
  } else {
    suggestions.push('建议包含特殊字符（如 !@#$%^&*）');
  }

  // 避免常见模式
  if (!/(.)\1{2,}/.test(password)) { // 没有连续相同字符
    score += 5;
  } else {
    suggestions.push('避免连续相同字符');
  }

  // 确定强度等级
  let strength: PasswordStrength;
  let message: string;
  let isValid: boolean;

  if (score >= 85) {
    strength = PasswordStrength.VERY_STRONG;
    message = '非常强';
    isValid = true;
  } else if (score >= 70) {
    strength = PasswordStrength.STRONG;
    message = '强';
    isValid = true;
  } else if (score >= 50) {
    strength = PasswordStrength.MEDIUM;
    message = '中等';
    isValid = true;
  } else {
    strength = PasswordStrength.WEAK;
    message = '弱';
    isValid = false;
  }

  return {
    strength,
    score,
    message,
    suggestions,
    isValid
  };
}

// 密码强度验证（用于表单验证）
export function validatePasswordStrength(password: string): { isValid: boolean; message: string } {
  const result = checkPasswordStrength(password);
  
  if (!result.isValid) {
    return {
      isValid: false,
      message: `密码强度不足（${result.message}）`
    };
  }

  return {
    isValid: true,
    message: ''
  };
} 