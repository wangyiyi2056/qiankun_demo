<template>
  <div class="app">
    <header class="header">
      <h1>轻量级微前端主应用</h1>
      <p>基于 iframe + postMessage 的微前端架构演示</p>
    </header>

    <nav class="nav">
      <a
        href="/"
        @click="showWelcome"
        :class="{ active: currentRoute === '/' }"
      >
        首页
      </a>
      <a
        href="/react"
        @click="loadApp('react-app')"
        :class="{ active: currentRoute === '/react' }"
      >
        React 应用
      </a>
      <a
        href="/vue"
        @click="loadApp('vue-app')"
        :class="{ active: currentRoute === '/vue' }"
      >
        Vue 应用
      </a>
    </nav>

    <main class="container">
      <div v-show="showWelcomeContent" class="welcome">
        <h2>欢迎使用微前端应用</h2>
        <p>请点击上方导航切换到不同的子应用</p>
        <div class="features">
          <h3>框架特性：</h3>
          <ul>
            <li>✅ 完全避免跨域问题</li>
            <li>✅ 基于 iframe 的应用隔离</li>
            <li>✅ postMessage 通信机制</li>
            <li>✅ 支持路由同步</li>
            <li>✅ 全局状态管理</li>
            <li>✅ 生命周期管理</li>
          </ul>
        </div>
        <p>确保以下子应用正在运行：</p>
        <ul>
          <li>
            React 应用:
            <a href="http://localhost:3001" target="_blank">
              http://localhost:3001
            </a>
          </li>
          <li>
            Vue 应用:
            <a href="http://localhost:3002" target="_blank">
              http://localhost:3002
            </a>
          </li>
        </ul>
      </div>
      <div
        id="react-container"
        class="app-container"
        v-show="currentRoute === '/react'"
      ></div>
      <div
        id="vue-container"
        class="app-container"
        v-show="currentRoute === '/vue'"
      ></div>
    </main>
  </div>
</template>

<script setup>
  import { ref, onMounted, getCurrentInstance } from "vue";

  const currentRoute = ref("/");
  const showWelcomeContent = ref(true);
  const { proxy } = getCurrentInstance();

  // 显示欢迎页面
  const showWelcome = (e) => {
    e?.preventDefault();
    currentRoute.value = "/";
    showWelcomeContent.value = true;
    history.pushState(null, "", "/");
  };

  // 加载指定应用
  const loadApp = (appName) => {
    return async (e) => {
      e?.preventDefault();
      showWelcomeContent.value = false;

      try {
        await proxy.$microFrontend.loadApp(appName);

        if (appName === "react-app") {
          currentRoute.value = "/react";
          history.pushState(null, "", "/react");
        } else if (appName === "vue-app") {
          currentRoute.value = "/vue";
          history.pushState(null, "", "/vue");
        }
      } catch (error) {
        console.error(`加载应用 ${appName} 失败:`, error);
        alert(`加载应用失败，请确保 ${appName} 正在运行`);
        showWelcome();
      }
    };
  };

  // 处理浏览器前进后退
  const handlePopState = () => {
    const path = window.location.pathname;
    if (path === "/react") {
      loadApp("react-app")();
    } else if (path === "/vue") {
      loadApp("vue-app")();
    } else {
      showWelcome();
    }
  };

  onMounted(() => {
    // 初始化时根据URL加载对应应用
    const path = window.location.pathname;
    if (path === "/react") {
      loadApp("react-app")();
    } else if (path === "/vue") {
      loadApp("vue-app")();
    } else {
      showWelcome();
    }

    // 监听浏览器前进后退
    window.addEventListener("popstate", handlePopState);
  });
</script>

<style scoped>
  .app {
    min-height: 100vh;
    background-color: #f5f5f5;
  }

  .header {
    background-color: #1890ff;
    color: white;
    padding: 1rem;
    text-align: center;
  }

  .header h1 {
    margin: 0 0 0.5rem 0;
  }

  .header p {
    margin: 0;
    opacity: 0.9;
  }

  .nav {
    background-color: #001529;
    padding: 1rem;
    text-align: center;
  }

  .nav a {
    color: white;
    text-decoration: none;
    margin: 0 1rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s;
  }

  .nav a:hover,
  .nav a.active {
    background-color: #1890ff;
  }

  .container {
    min-height: calc(100vh - 120px);
    padding: 1rem;
  }

  .welcome {
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    margin: 1rem 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .welcome h2 {
    color: #1890ff;
    margin-bottom: 1rem;
  }

  .welcome ul {
    text-align: left;
    display: inline-block;
    margin: 1rem 0;
  }

  .welcome a {
    color: #1890ff;
  }

  .features {
    margin: 1.5rem 0;
    text-align: left;
    display: inline-block;
  }

  .features h3 {
    color: #1890ff;
    margin-bottom: 0.5rem;
  }

  .features ul {
    margin: 0;
  }

  .app-container {
    height: calc(100vh - 200px);
    min-height: 500px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
</style>
