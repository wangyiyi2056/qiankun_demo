/**
 * 微应用 SDK
 * 用于子应用与主应用通信
 */

class MicroAppSDK {
  constructor() {
    this.isInMicroApp = window.parent !== window;
    this.appName = null;
    this.route = null;
    this.globalState = {};
    this.eventBus = new EventTarget();

    if (this.isInMicroApp) {
      this.setupCommunication();
    }
  }

  /**
   * 设置通信
   */
  setupCommunication() {
    // 监听来自主应用的消息
    window.addEventListener("message", (event) => {
      if (event.source !== window.parent) return;

      const { type, data } = event.data;

      switch (type) {
        case "init":
          this.appName = data.appName;
          this.route = data.route;
          this.eventBus.dispatchEvent(
            new CustomEvent("init", { detail: data })
          );
          break;
        case "mount":
          this.eventBus.dispatchEvent(
            new CustomEvent("mount", { detail: data })
          );
          break;
        case "unmount":
          this.eventBus.dispatchEvent(
            new CustomEvent("unmount", { detail: data })
          );
          break;
        case "global-state-update":
          this.globalState = { ...this.globalState, ...data };
          this.eventBus.dispatchEvent(
            new CustomEvent("global-state-change", { detail: data })
          );
          break;
      }
    });

    // 通知主应用子应用已准备就绪
    this.postMessage({ type: "ready" });
  }

  /**
   * 向主应用发送消息
   */
  postMessage(message) {
    if (this.isInMicroApp && window.parent) {
      window.parent.postMessage(message, "*");
    }
  }

  /**
   * 通知路由变化
   */
  setRoute(route) {
    this.route = route;
    this.postMessage({
      type: "route-change",
      data: { route },
    });
  }

  /**
   * 更新全局状态
   */
  setGlobalState(state) {
    this.globalState = { ...this.globalState, ...state };
    this.postMessage({
      type: "global-state-change",
      data: state,
    });
  }

  /**
   * 获取全局状态
   */
  getGlobalState() {
    return this.globalState;
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

  /**
   * 获取应用信息
   */
  getAppInfo() {
    return {
      name: this.appName,
      route: this.route,
      isInMicroApp: this.isInMicroApp,
    };
  }
}

// 创建全局实例
const microAppSDK = new MicroAppSDK();

export default microAppSDK;
