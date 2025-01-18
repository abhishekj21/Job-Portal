import "./App.css";
import { Button } from "@/components/ui/button";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import LandingPage from "./pages/landing";
import Onboarding from "./pages/onboarding";
// import AppLayout from "./AppLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout />, // Define the path and associate it with the element
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
