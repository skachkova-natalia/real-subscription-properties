import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router';
import './index.css';
import './i18n';
import {router} from '@src/routes';

console.log('main');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
