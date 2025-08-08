# 贡献指南

感谢你对轻量级微前端框架的关注！我们欢迎任何形式的贡献。

## 🚀 如何贡献

### 报告 Bug

如果你发现了 bug，请：

1. 检查 [Issues](../../issues) 确认问题未被报告
2. 创建新的 Issue，包含：
   - 详细的问题描述
   - 复现步骤
   - 期望的行为
   - 实际的行为
   - 环境信息（Node.js 版本、操作系统等）

### 提出新功能

1. 先在 Issues 中讨论你的想法
2. 确保功能符合项目目标
3. 提供详细的功能描述和使用场景

### 提交代码

1. Fork 这个仓库
2. 创建你的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📝 开发规范

### 代码风格

- 使用 2 空格缩进
- 使用分号结尾
- 使用单引号
- 变量和函数使用 camelCase
- 常量使用 UPPER_CASE

### 提交信息

使用清晰的提交信息：

```
feat: 添加新功能
fix: 修复 bug
docs: 更新文档
style: 代码格式化
refactor: 重构代码
test: 添加测试
chore: 构建过程或辅助工具的变动
```

### 测试

- 为新功能添加测试
- 确保所有测试通过
- 保持测试覆盖率

## 🔧 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/your-username/micro-frontend-framework.git

# 安装依赖
npm run install:all

# 启动开发环境
npm run start:all
```

## 📖 项目结构

```
├── main/                    # 主应用
├── react-app/               # React 示例应用
├── vue-app/                 # Vue 示例应用
├── shared/                  # 共享 SDK
├── docs/                    # 文档
└── tests/                   # 测试文件
```

## 🤝 行为准则

- 保持友善和专业
- 尊重不同的观点和经验
- 接受建设性的批评
- 专注于对社区最有利的事情

## 📞 联系方式

如果你有任何问题，可以：

- 创建 Issue
- 发送邮件到 [your-email@example.com]
- 在 Discussions 中讨论

感谢你的贡献！🎉
