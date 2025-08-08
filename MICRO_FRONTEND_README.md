# 轻量级微前端框架

基于 iframe + postMessage 的微前端解决方案，完全避免跨域问题。

## 🚀 特性

- ✅ **零跨域问题** - 基于 iframe 完全隔离
- ✅ **轻量级** - 核心代码不到 200 行
- ✅ **框架无关** - 支持任何前端框架
- ✅ **通信机制** - 基于 postMessage 的双向通信
- ✅ **路由同步** - 支持浏览器前进后退
- ✅ **全局状态** - 跨应用状态共享
- ✅ **生命周期** - 完整的应用生命周期管理

## 📦 项目结构

```
├── main/                    # 主应用
│   ├── src/
│   │   ├── micro-frontend.js    # 微前端框架核心
│   │   ├── main.js              # 应用入口
│   │   └── App.vue              # 主组件
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── shared/                  # 共享资源
│   └── micro-app-sdk.js     # 子应用 SDK
├── react-app/               # React 子应用
├── vue-app/                 # Vue 子应用
├── package.json             # 工作空间配置
└── start-all.js             # 启动脚本
```

## 🛠 使用方法

### 1. 安装依赖

```bash
# 安装所有应用的依赖
npm run install:all
```

### 2. 启动所有应用

```bash
npm run start:all
```

### 3. 单独启动

```bash
# 主应用 (开发模式)
npm run dev:main

# React 子应用
npm run start:react

# Vue 子应用
npm run start:vue
```

### 3. 访问应用

- 主应用: http://localhost:3000
- React 应用: http://localhost:3001
- Vue 应用: http://localhost:3002

## 🔧 API 文档

### 主应用 API

```javascript
import microFrontend from "./micro-frontend.js";

// 注册应用
microFrontend.registerApp({
  name: "my-app",
  url: "http://localhost:3001",
  container: "#app-container",
  route: "/my-app",
});

// 加载应用
await microFrontend.loadApp("my-app");

// 监听事件
microFrontend.on("app-loaded", (event) => {
  console.log("应用加载完成", event.detail.name);
});
```

### 子应用 SDK

```javascript
import microAppSDK from "./micro-app-sdk.js";

// 监听生命周期
microAppSDK.on("mount", () => {
  console.log("应用挂载");
});

microAppSDK.on("unmount", () => {
  console.log("应用卸载");
});

// 路由变化
microAppSDK.setRoute("/user/123");

// 全局状态
microAppSDK.setGlobalState({ user: "John" });
```

## 🔄 通信机制

### 主应用 → 子应用

```javascript
// 主应用发送消息
iframe.contentWindow.postMessage(
  {
    type: "mount",
    data: { route: "/user" },
  },
  "*"
);
```

### 子应用 → 主应用

```javascript
// 子应用发送消息
window.parent.postMessage(
  {
    type: "route-change",
    data: { route: "/user/123" },
  },
  "*"
);
```

## 📋 消息类型

| 类型                  | 方向    | 说明           |
| --------------------- | ------- | -------------- |
| `init`                | 主 → 子 | 初始化子应用   |
| `mount`               | 主 → 子 | 挂载子应用     |
| `unmount`             | 主 → 子 | 卸载子应用     |
| `ready`               | 子 → 主 | 子应用准备就绪 |
| `route-change`        | 子 → 主 | 路由变化       |
| `global-state-change` | 双向    | 全局状态变化   |

## 🎯 优势对比

| 特性     | iframe 方案 | qiankun   | single-spa |
| -------- | ----------- | --------- | ---------- |
| 跨域问题 | ✅ 无       | ❌ 复杂   | ❌ 复杂    |
| 样式隔离 | ✅ 完全隔离 | ⚠️ 需配置 | ❌ 需处理  |
| JS 隔离  | ✅ 完全隔离 | ✅ 沙箱   | ❌ 需处理  |
| 学习成本 | ✅ 低       | ⚠️ 中等   | ❌ 高      |
| 性能     | ⚠️ 中等     | ✅ 好     | ✅ 好      |
| SEO      | ❌ 不友好   | ✅ 支持   | ✅ 支持    |

## 🚨 注意事项

1. **性能考虑** - iframe 会增加内存占用
2. **SEO 限制** - 搜索引擎无法索引 iframe 内容
3. **移动端适配** - 需要特别处理移动端滚动
4. **安全性** - 注意 postMessage 的来源验证

## 🔮 扩展功能

- [ ] 应用预加载
- [ ] 错误边界处理
- [ ] 性能监控
- [ ] 应用缓存
- [ ] 主题切换
- [ ] 国际化支持
