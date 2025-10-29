import {createBrowserRouter} from 'react-router-dom';
import App from '@components/App';
import {LoginPage} from '@pages/LoginPage';
import {RegisterPage} from '@pages/RegisterPage';
import {ProfilePage} from '@pages/ProfilePage';
import VerificationPage from '@pages/VerificationPage';
import ChangeEmailPage from '@pages/ChangeEmailPage';
import CalculatorPage from '@pages/CalculatorPage';
import PropertiesTable from '@components/PropertiesTable';
import PropertiesGraphic from '@components/PropertiesGraphic';

export const router = createBrowserRouter([{
  element: <App />,
  path: '/',
  children: [
    {
      path: '/',
      element: <CalculatorPage />,
      children: [
        {
          path: '*',
          element: <PropertiesTable />,
        },
        {
          path: '/calculation',
          element: <PropertiesTable />,
        },
        {
          path: '/graphic',
          element: <PropertiesGraphic />,
        }
      ],
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
    {
      path: '/verify',
      element: <VerificationPage />,
    },
    {
      path: '/change-email',
      element: <ChangeEmailPage />,
    },
  ],
},
]);
