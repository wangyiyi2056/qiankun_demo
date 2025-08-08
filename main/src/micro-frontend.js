/**
 * 轻量级微前端框架
 * 基于 iframe + postMessage 通信
 */

class MicroFrontend {
  constructor() {
    this.apps = new Map();
    this.currentApp = null;
    this.eventBus = new EventTarget();
  }

  /**
   * 注册微应用
   */
  registerApp(config) {
    const { name, url, container, route } = config;

    this.apps.set(name, {
      name,
      url,
      container,
      route,
      iframe: null,
      loaded: false,
      mounted: false,
    });
  }

  /**
   * 加载并挂载应用
   */
  async loadApp(name) {
    const app = this.apps.get(name);
    if (!app) {
      throw new Error(`应用 ${name} 未注册`);
    }

    // 卸载当前应用
    if (this.currentApp && this.currentApp !== name) {
      await this.unmountApp(this.currentApp);
    }

    // 如果应用已经加载，直接显示
    if (app.loaded && app.iframe) {
      this.showApp(app);
      this.currentApp = name;
      return;
    }

    // 创建 iframe
    const iframe = document.createElement("iframe");
    iframe.src = app.url;
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
      background: white;
    `;

    // 监听 iframe 加载完成
    iframe.onload = () => {
      app.loaded = true;
      app.mounted = true;
      this.setupCommunication(app, iframe);
      this.eventBus.dispatchEvent(
        new CustomEvent("app-loaded", { detail: { name } })
      );
    };

    // 获取容器并挂载
    const container = document.querySelector(app.container);
    if (!container) {
      throw new Error(`容器 ${app.container} 不存在`);
    }

    container.innerHTML = "";
    container.appendChild(iframe);

    app.iframe = iframe;
    this.currentApp = name;
  }

  /**
   * 显示应用
   */
  showApp(app) {
    const container = document.querySelector(app.container);
    if (container && app.iframe) {
      container.style.display = "block";
      app.mounted = true;
    }
  }

  /**
   * 卸载应用
   */
  async unmountApp(name) {
    const app = this.apps.get(name);
    if (!app || !app.mounted) return;

    const container = document.querySelector(app.container);
    if (container) {
      container.style.display = "none";
    }

    app.mounted = false;

    // 通知子应用卸载
    if (app.iframe) {
      this.postMessage(app.iframe, { type: "unmount" });
    }
  }

  /**
   * 设置与子应用的通信
   */
  setupCommunication(app, iframe) {
    // 监听来自子应用的消息
    window.addEventListener("message", (event) => {
      if (event.source !== iframe.contentWindow) return;

      const { type, data } = event.data;

      switch (type) {
        case "ready":
          // 子应用准备就绪
          this.postMessage(iframe, {
            type: "mount",
            data: { route: app.route },
          });
          break;
        case "route-change":
          // 子应用路由变化
          this.handleRouteChange(app.name, data.route);
          break;
        case "global-state-change":
          // 全局状态变化
          this.broadcastGlobalState(data);
          break;
      }
    });

    // 发送初始化消息
    this.postMessage(iframe, {
      type: "init",
      data: {
        appName: app.name,
        route: app.route,
      },
    });
  }

  /**
   * 向子应用发送消息
   */
  postMessage(iframe, message) {
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(message, "*");
    }
  }

  /**
   * 处理路由变化
   */
  handleRouteChange(appName, route) {
    // 更新浏览器 URL
    const fullRoute = `/${appName}${route}`;
    history.pushState(null, "", fullRoute);

    // 触发路由变化事件
    this.eventBus.dispatchEvent(
      new CustomEvent("route-change", {
        detail: { appName, route, fullRoute },
      })
    );
  }

  /**
   * 广播全局状态
   */
  broadcastGlobalState(state) {
    this.apps.forEach((app) => {
      if (app.iframe && app.mounted) {
        this.postMessage(app.iframe, {
          type: "global-state-update",
          data: state,
        });
      }
    });
  }

  /**
   * 获取当前应用
   */
  getCurrentApp() {
    return this.currentApp;
  }

  /**
   * 监听事件
   */
  on(event, callback) {
    this.eventBus.addEventListener(event, callback);
  }

  /**
   * 移除事件监听
   */
  off(event, callback) {
    this.eventBus.removeEventListener(event, callback);
  }
}

// 创建全局实例
const microFrontend = new MicroFrontend();

export default microFrontend;
