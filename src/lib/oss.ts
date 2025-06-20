import OSS from 'ali-oss';

// OSS客户端配置
export const createOSSClient = () => {
  return new OSS({
    region: process.env.OSS_REGION!,
    accessKeyId: process.env.OSS_ACCESS_KEY_ID!,
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET!,
    bucket: process.env.OSS_BUCKET!,
  });
};

// 生成唯一文件名
export const generateFileName = (originalName: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  const extension = originalName.split('.').pop();
  return `avatars/${timestamp}-${random}.${extension}`;
};

// 上传文件到OSS
export const uploadToOSS = async (file: Buffer, fileName: string): Promise<string> => {
  try {
    const client = createOSSClient();
    await client.put(fileName, file);

    // 返回完整的URL地址
    const baseUrl =
      process.env.BASE_OSS_URL ||
      `https://${process.env.OSS_BUCKET}.${process.env.OSS_REGION}.aliyuncs.com`;
    return `${baseUrl}/${fileName}`;
  } catch (error) {
    console.error('OSS上传失败：', error);
    throw new Error('文件上传失败');
  }
};

// 删除OSS文件
export const deleteFromOSS = async (fileName: string): Promise<void> => {
  try {
    const client = createOSSClient();
    await client.delete(fileName);
  } catch (error) {
    console.error('OSS删除失败：', error);
    throw new Error('文件删除失败');
  }
};

// 从URL中提取文件名
export const extractFileNameFromUrl = (url: string): string => {
  const baseUrl =
    process.env.BASE_OSS_URL ||
    `https://${process.env.OSS_BUCKET}.${process.env.OSS_REGION}.aliyuncs.com`;
  return url.replace(`${baseUrl}/`, '');
};
