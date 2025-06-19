import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      // 依赖目录
      'node_modules/**',
      // 构建输出
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',
      // Prisma生成的文件
      'prisma/generated/**',
      'src/generated/**',
      // 其他生成的文件
      '**/*.d.ts',
      'next-env.d.ts',
      // 日志文件
      '**/*.log',
    ],
  },
];

export default eslintConfig;
