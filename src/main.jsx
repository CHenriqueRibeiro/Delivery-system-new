import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import Home from './pages/Home.jsx';
import RegisterScreen from './pages/RegisterScreen.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/cadastro',
        element: <RegisterScreen />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
