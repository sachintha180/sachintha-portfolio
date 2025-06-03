import type { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import ModelDashboard from "../pages/ModelDashboard";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/model-dashboard",
    element: <ModelDashboard />,
  },
];

export const navigationLinks = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/model-dashboard",
    label: "Model Dashboard",
  },
];
