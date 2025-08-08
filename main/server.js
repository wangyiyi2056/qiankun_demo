import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// 静态文件服务
app.use(express.static(join(__dirname, "dist")));

// SPA 路由支持
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`🚀 主应用运行在 http://localhost:${port}`);
});
