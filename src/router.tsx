
import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Shell from "./components/Shell";
import Home from "./pages/Home";
import Learning from "./pages/Learning";
import Exam from "./pages/Exam";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import Hub from "./pages/Hub";
import Onboarding from "./pages/Onboarding";
import ModuleHome from "./pages/ModuleHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Shell/>,
    children: [
      { index: true, element: <Navigate to="/hub" replace /> },
      { path: "/hub", element: <Hub/> },
      { path: "/home", element: <Home/> },
      { path: "/learning", element: <Learning/> },
      { path: "/exam", element: <Exam/> },
      { path: "/progress", element: <Progress/> },
      { path: "/settings", element: <Settings/> },
      { path: "/onboarding", element: <Onboarding/> },
      { path: "/unbordin", element: <Onboarding/> }, // alias
      { path: "/module/:slug", element: <ModuleHome/> },
    ]
  }
]);
