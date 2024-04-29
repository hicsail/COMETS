import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./pages/Root";
import { LandingPage } from "./pages/Landing";
import "./App.css";
import { DashboardPage } from "./pages/Dashboard";
import { SummaryReviewPage } from "./pages/SummaryReview";
import { ResultsPage } from "./pages/Results";
import { ExperimentSubmittedPage } from "./pages/ExperimentSubmitted";

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
      {
        path: "/experiment-submitted",
        element: <ExperimentSubmittedPage />
      },
      {
        path: "/results",
        element: <ResultsPage />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
