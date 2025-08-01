# Tawk.to 客服集成文档

## 概述

本项目已集成 Tawk.to 在线客服系统，通过 React 组件的方式实现，确保在 Next.js 环境中安全可靠地运行。

## 组件特性

- ✅ **类型安全**: 完整的 TypeScript 支持
- ✅ **客户端渲染**: 使用 `'use client'` 确保在浏览器环境中正确加载
- ✅ **错误处理**: 包含脚本加载失败的错误处理机制
- ✅ **环境控制**: 可配置在开发环境中是否启用
- ✅ **自动清理**: 组件卸载时自动清理资源
- ✅ **防重复加载**: 智能检测避免重复加载脚本
- ✅ **自定义配置**: 支持位置、主题等自定义设置

## 使用方式

### 1. 基本使用（已在布局中配置）

组件已经在 `src/app/layout.tsx` 中全局配置，会在所有页面中显示：

```tsx
<TawkToWidget
  enableInDev={true}
  customSettings={{
    position: 'bottom-right',
    showPreChatForm: true,
    showOfflineForm: true,
  }}
/>
```

### 2. 组件参数说明

```tsx
interface TawkToWidgetProps {
  /** Tawk.to 的 Widget ID */
  widgetId?: string;
  /** Tawk.to 的 API Key */
  apiKey?: string;
  /** 是否在开发环境中启用 */
  enableInDev?: boolean;
  /** 自定义配置选项 */
  customSettings?: {
    /** 聊天窗口的位置 */
    position?: 'bottom-right' | 'bottom-left';
    /** 聊天窗口的颜色主题 */
    theme?: string;
    /** 是否显示预聊天表单 */
    showPreChatForm?: boolean;
    /** 是否显示离线表单 */
    showOfflineForm?: boolean;
  };
}
```

### 3. 参数详解

| 参数             | 类型    | 默认值                       | 说明                         |
| ---------------- | ------- | ---------------------------- | ---------------------------- |
| `widgetId`       | string  | `'688c3386cabd5919319185d9'` | 您的 Tawk.to Widget ID       |
| `apiKey`         | string  | `'1j1hqihb8'`                | 您的 Tawk.to API Key         |
| `enableInDev`    | boolean | `false`                      | 是否在开发环境中启用客服组件 |
| `customSettings` | object  | `undefined`                  | 自定义配置选项               |

## 配置说明

### 获取您的 Tawk.to 配置

1. 登录 [Tawk.to 官网](https://www.tawk.to/)
2. 进入管理面板
3. 选择您的项目
4. 在 "Chat Widget" 设置中找到您的专属代码
5. 从代码中提取 `widgetId` 和 `apiKey`：

```javascript
// 示例代码：https://embed.tawk.to/[WIDGET_ID]/[API_KEY]
// widgetId: WIDGET_ID 部分
// apiKey: API_KEY 部分
```

### 自定义配置示例

```tsx
// 放置在左下角，自定义主题色
<TawkToWidget
  widgetId="your-widget-id"
  apiKey="your-api-key"
  enableInDev={true}
  customSettings={{
    position: 'bottom-left',
    theme: '#4F46E5',
    showPreChatForm: false,
    showOfflineForm: true,
  }}
/>
```

## 在特定页面使用

如果您只想在特定页面显示客服组件，可以：

1. 从 `layout.tsx` 中移除全局配置
2. 在需要的页面中单独引入：

```tsx
'use client';

import TawkToWidget from '@/components/TawkToWidget';

export default function ContactPage() {
  return (
    <div>
      {/* 页面内容 */}
      <h1>联系我们</h1>

      {/* 客服组件 */}
      <TawkToWidget enableInDev={true} />
    </div>
  );
}
```

## 环境配置

### 开发环境

- 默认情况下开发环境中不加载客服组件
- 设置 `enableInDev={true}` 来在开发环境中启用
- 开发时会在控制台显示加载状态日志

### 生产环境

- 默认自动启用
- 会在控制台显示加载成功/失败的日志

## 故障排除

### 常见问题

1. **客服窗口不显示**

   - 检查 `widgetId` 和 `apiKey` 是否正确
   - 确认在开发环境中设置了 `enableInDev={true}`
   - 查看浏览器控制台是否有错误信息

2. **重复加载问题**

   - 组件内置了防重复加载机制
   - 如果仍有问题，检查是否在多个地方引入了组件

3. **样式冲突**
   - Tawk.to 使用独立的样式系统，一般不会与项目样式冲突
   - 如有冲突，可通过 `customSettings.theme` 调整

### 调试技巧

在浏览器控制台中，您可以通过以下命令检查 Tawk.to 状态：

```javascript
// 检查是否加载成功
console.log(window.Tawk_API);

// 检查加载时间
console.log(window.Tawk_LoadStart);
```

## 性能考虑

- 组件使用异步加载，不会阻塞页面渲染
- 脚本加载失败不会影响页面功能
- 组件卸载时自动清理资源，避免内存泄漏

## 更新日志

- **v1.0.0**: 初始版本，支持基本的 Tawk.to 集成
- 支持自定义配置和环境控制
- 完整的 TypeScript 类型支持
