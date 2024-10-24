import {createBrowserRouter} from 'react-router-dom';
import App from '@components/App';
import {TablePage} from '@pages/TablePage';
import {LoginPage} from '@pages/LoginPage';

export const router = createBrowserRouter([{
  element: <App />,
  path: '/',
  children: [
    {
      path: '/',
      element: <TablePage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
  ],
},
]);
