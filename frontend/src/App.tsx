import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./pages/Root";
import { LandingPage } from "./pages/Landing";
import "./App.css";
import { DashboardPage } from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "/landing",
    element: <LandingPage />,
    children: [],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
