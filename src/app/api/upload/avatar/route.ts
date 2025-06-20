import jwt from 'jsonwebtoken';

import { NextRequest, NextResponse } from 'next/server';

import {
  deleteFromOSS,
  extractFileNameFromUrl,
  generateFileName,
  uploadToOSS,
} from '../../../../lib/oss';
import { UserService } from '../../../../services/userService';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// POST /api/upload/avatar - 上传头像
export async function POST(request: NextRequest) {
  try {
    // 验证用户身份
    const token = request.cookies.get('auth_token_local')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: '未登录' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch {
      return NextResponse.json({ success: false, message: '登录已过期' }, { status: 401 });
    }

    // 获取上传的文件
    const formData = await request.formData();
    const file = formData.get('avatar') as File;

    if (!file) {
      return NextResponse.json({ success: false, message: '请选择要上传的文件' }, { status: 400 });
    }

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: '只支持图片格式：JPEG、PNG、GIF、WebP' },
        { status: 400 }
      );
    }

    // 验证文件大小（限制5MB）
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ success: false, message: '文件大小不能超过5MB' }, { status: 400 });
    }

    // 获取用户当前头像信息
    const currentUser = await UserService.getUserById(decoded.userId);
    if (!currentUser) {
      return NextResponse.json({ success: false, message: '用户不存在' }, { status: 404 });
    }

    // 转换文件为Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 生成文件名并上传到OSS
    const fileName = generateFileName(file.name);
    const avatarUrl = await uploadToOSS(buffer, fileName);

    // 更新用户头像URL到数据库
    await UserService.updateUser(decoded.userId, {
      avatar_url: avatarUrl,
    });

    // 删除旧头像（如果存在）
    if (currentUser.avatar_url) {
      try {
        const oldFileName = extractFileNameFromUrl(currentUser.avatar_url);
        await deleteFromOSS(oldFileName);
      } catch (deleteError) {
        console.warn('删除旧头像失败：', deleteError);
        // 删除失败不影响主流程
      }
    }

    return NextResponse.json({
      success: true,
      message: '头像上传成功',
      data: {
        avatarUrl: avatarUrl,
      },
    });
  } catch (error) {
    console.error('头像上传错误：', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : '上传失败，请重试',
      },
      { status: 500 }
    );
  }
}
