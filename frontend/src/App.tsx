import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './pages/Root';
import './App.css';
import { ExperimentSetupPage } from './pages/ExperimentSetup';
import React from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: 'experimentSetup', element: <ExperimentSetupPage /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;