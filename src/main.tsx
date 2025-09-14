
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/theme.css";
import { themeBoot } from "./lib/themeBoot";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
themeBoot();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </React.StrictMode>
);
