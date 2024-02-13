import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './pages/Root';
import { LandingPage } from './pages/Landing';
import './App.css';
import { ExperimentSetupPage } from './pages/ExperimentSetup';
import React from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // put name of page and the corresponding components here to add to Sidebar navigation
      { path: 'experimentSetup', element: <ExperimentSetupPage /> }
    ]
  },
  {
    path: '/landing',
    element: <LandingPage />,
    children: [

    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;