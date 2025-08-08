#!/bin/bash

# 轻量级微前端框架 - 快速设置脚本

echo "🚀 开始设置轻量级微前端框架..."

# 检查 Node.js 版本
echo "📋 检查环境..."
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 14 ]; then
    echo "❌ 错误: 需要 Node.js 14 或更高版本"
    echo "   当前版本: $(node -v)"
    echo "   请访问 https://nodejs.org/ 下载最新版本"
    exit 1
fi

echo "✅ Node.js 版本检查通过: $(node -v)"

# 安装依赖
echo "📦 安装依赖..."
npm run install:all

if [ $? -eq 0 ]; then
    echo "✅ 依赖安装完成"
else
    echo "❌ 依赖安装失败"
    exit 1
fi

# 提示启动
echo ""
echo "🎉 设置完成！"
echo ""
echo "现在你可以运行以下命令启动应用:"
echo "  npm run start:all"
echo ""
echo "然后访问:"
echo "  🏠 主应用: http://localhost:3000"
echo "  ⚛️ React 应用: http://localhost:3001"
echo "  💚 Vue 应用: http://localhost:3002"
echo ""
echo "📖 更多信息请查看 README.md"