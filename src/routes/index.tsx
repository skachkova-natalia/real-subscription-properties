import {createBrowserRouter} from 'react-router-dom';
import App from '@components/App';
import {TablePage} from '@pages/TablePage';
import {LoginPage} from '@pages/LoginPage';
import {RegisterPage} from '@pages/RegisterPage';
import {ProfilePage} from '@pages/ProfilePage';

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
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/profile',
      element: <ProfilePage />,
    },
  ],
},
]);
