
import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Shell from "./components/Shell";
import Home from "./pages/Home";
import ModuleHome from "./pages/ModuleHome";
import Learning from "./pages/Learning";
import Exam from "./pages/ExamSim";
import English from "./pages/English";
import Psychology from "./pages/Psychology";
import Settings from "./pages/Settings";
import Onboarding from "./pages/Onboarding";

export const router = createBrowserRouter([
  { path: "/", element: <Shell/>, children: [
    { index: true, element: <Navigate to="/home" replace /> },
    { path: "/home", element: <Home/> },
    { path: "/module/:slug", element: <ModuleHome/> },
    { path: "/learning", element: <Learning/> },
    { path: "/exam", element: <Exam/> },
    { path: "/english", element: <English/> },
    { path: "/psychology", element: <Psychology/> },
    { path: "/settings", element: <Settings/> },
    { path: "/onboarding", element: <Onboarding/> },
  ]}
]);
