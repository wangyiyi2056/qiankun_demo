import { createApp } from 'vue';

const App = {
  template: '<div>Hello from Vue App (Microfrontend)</div>'
};

let appInstance = null;

function render() {
  appInstance = createApp(App).mount('#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// qiankun 生命周期
export async function bootstrap() {}
export async function mount() { render(); }
export async function unmount() { appInstance.unmount(); }
