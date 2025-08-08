import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return <div>Hello from React App (Microfrontend)</div>;
}

// 兼容 qiankun 的挂载方式
function render() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// qiankun 生命周期
export async function bootstrap() {}
export async function mount() { render(); }
export async function unmount() { ReactDOM.unmountComponentAtNode(document.getElementById('root')); }
