import { createApp } from "vue";
import App from "./App.vue";
import microFrontend from "./micro-frontend.js";

const app = createApp(App);

// 注册微应用
microFrontend.registerApp({
  name: "react-app",
  url: "http://localhost:3001",
  container: "#react-container",
  route: "/react",
});

microFrontend.registerApp({
  name: "vue-app",
  url: "http://localhost:3002",
  container: "#vue-container",
  route: "/vue",
});

// 监听应用加载事件
microFrontend.on("app-loaded", (event) => {
  console.log(`应用 ${event.detail.name} 加载完成`);
});

microFrontend.on("route-change", (event) => {
  console.log(`路由变化: ${event.detail.fullRoute}`);
});

// 将微前端实例挂载到全局，供 Vue 组件使用
app.config.globalProperties.$microFrontend = microFrontend;

app.mount("#app");
