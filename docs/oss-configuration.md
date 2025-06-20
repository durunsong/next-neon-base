# 阿里云OSS配置说明

## 前言

本项目集成了阿里云OSS（对象存储服务）来处理文件上传功能，特别是用户头像上传。本文档将指导你如何正确配置阿里云OSS。

## 1. 获取阿里云OSS配置信息

### 1.1 创建OSS Bucket

1. 登录阿里云控制台
2. 进入OSS管理控制台
3. 创建Bucket，记录以下信息：
   - Bucket名称（如：`next-static-oss`）
   - 地域节点（如：`oss-rg-china-mainland`）

### 1.2 获取AccessKey

1. 进入阿里云控制台 > 用户信息 > AccessKey管理
2. 创建AccessKey，记录：
   - AccessKey ID
   - AccessKey Secret

## 2. 配置环境变量

在项目根目录的`.env`文件中配置以下变量：

```env
# 阿里云OSS配置
OSS_ACCESS_KEY_ID=你的AccessKeyId
OSS_ACCESS_KEY_SECRET=你的AccessKeySecret
OSS_REGION=oss-rg-china-mainland
OSS_BUCKET=next-static-oss
BASE_OSS_URL=https://next-static-oss.oss-rg-china-mainland.aliyuncs.com
```

### 配置说明：

- `OSS_ACCESS_KEY_ID`: 阿里云AccessKey ID
- `OSS_ACCESS_KEY_SECRET`: 阿里云AccessKey Secret
- `OSS_REGION`: OSS地域节点
- `OSS_BUCKET`: OSS存储桶名称
- `BASE_OSS_URL`: OSS访问域名（格式：`https://[bucket].[region].aliyuncs.com`）

## 3. OSS Bucket配置

### 3.1 设置Bucket权限

- 读写权限：公共读（或更严格的权限配置）
- 确保可以通过URL直接访问上传的文件

### 3.2 跨域配置（CORS）

如果需要在浏览器中直接上传，需要配置CORS：

```json
{
  "allowedOrigins": ["*"],
  "allowedMethods": ["GET", "POST", "PUT", "DELETE"],
  "allowedHeaders": ["*"],
  "exposeHeaders": ["ETag", "x-oss-request-id"],
  "maxAgeSeconds": 3000
}
```

## 4. 目录结构

上传的文件将按以下结构存储：

```
avatars/
├── 1702834567890-abc123.jpg
├── 1702834567891-def456.png
└── ...
```

文件名格式：`时间戳-随机字符串.扩展名`

## 5. 功能特性

### 5.1 支持的文件格式

- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

### 5.2 文件大小限制

- 最大文件大小：5MB
- 建议头像尺寸：200x200 到 800x800 像素

### 5.3 自动功能

- 上传新头像时自动删除旧头像
- 生成唯一文件名避免冲突
- 数据库URL自动更新

## 6. 使用方式

### 6.1 在个人中心上传头像

1. 登录系统
2. 点击用户头像菜单 > "个人中心"
3. 在头像区域点击"更换头像"按钮
4. 选择图片文件上传

### 6.2 API接口

- 上传头像：`POST /api/upload/avatar`
- 需要登录状态（JWT Token）
- 使用FormData格式，字段名为`avatar`

## 7. 故障排除

### 7.1 上传失败

检查以下项目：

- OSS配置信息是否正确
- AccessKey是否有效
- Bucket权限设置是否正确
- 网络连接是否正常

### 7.2 图片无法显示

检查以下项目：

- Bucket是否设置为公共读
- 图片URL是否正确
- CDN配置（如果使用）

### 7.3 权限错误

确保AccessKey有以下权限：

- OSS读写权限
- 对应Bucket的操作权限

## 8. 安全建议

1. 使用子账号AccessKey，避免使用主账号
2. 限制AccessKey权限，只授予必要的OSS权限
3. 定期轮换AccessKey
4. 不要将AccessKey提交到版本控制系统

## 9. 性能优化

1. 使用CDN加速图片访问
2. 配置合适的图片缓存策略
3. 考虑图片压缩和格式优化

## 10. 监控和日志

建议开启以下功能：

- OSS访问日志
- 异常监控
- 成本监控
