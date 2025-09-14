
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";            // tailwind base/components/utilities
import "./styles/theme.css";     // our CSS variables + helpers
import { RouterProvider } from "react-router-dom";
import { themeBoot } from "./lib/themeBoot";
import { router } from "./router";

themeBoot();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </React.StrictMode>
);
