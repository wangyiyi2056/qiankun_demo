import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🚀 启动微前端应用...\n");

// 启动主应用 (开发模式)
console.log("📦 启动主应用 (端口 3000)...");
const mainApp = spawn("npm", ["run", "dev"], {
  cwd: join(__dirname, "main"),
  stdio: "inherit",
  shell: true,
});

// 启动 React 应用
console.log("⚛️  启动 React 应用 (端口 3001)...");
const reactApp = spawn("npm", ["start"], {
  cwd: join(__dirname, "react-app"),
  stdio: "inherit",
  shell: true,
});

// 启动 Vue 应用
console.log("💚 启动 Vue 应用 (端口 3002)...");
const vueApp = spawn("npm", ["start"], {
  cwd: join(__dirname, "vue-app"),
  stdio: "inherit",
  shell: true,
});

// 处理进程退出
process.on("SIGINT", () => {
  console.log("\n🛑 正在关闭所有应用...");
  mainApp.kill();
  reactApp.kill();
  vueApp.kill();
  process.exit();
});

console.log("\n✅ 所有应用已启动！");
console.log("🌐 主应用: http://localhost:3000");
console.log("⚛️  React 应用: http://localhost:3001");
console.log("💚 Vue 应用: http://localhost:3002");
console.log("\n按 Ctrl+C 停止所有应用");
