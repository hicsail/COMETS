import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./pages/Root";
import { LandingPage } from "./pages/Landing";
import "./App.css";
import { DashboardPage } from "./pages/Dashboard";
import { SummaryReviewPage } from "./pages/SummaryReview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [],
  },
  {
    element: <RootLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/summary-review",
        element: <SummaryReviewPage />
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
