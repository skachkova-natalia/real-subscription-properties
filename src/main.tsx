import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'components/App'
import './index.css'
import './i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

console.log(
  `BUILD: ${import.meta.env.VITE_APP_VERSION_BUILD}\n HASH: ${import.meta.env.VITE_APP_VERSION_HASH}\n TIME: ${import.meta.env.VITE_APP_BUILD_TIME}`,
);
