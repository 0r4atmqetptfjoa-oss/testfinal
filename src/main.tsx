
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/theme.css";
import { themeBoot } from "./lib/themeBoot";
import { App } from "./router";
import InstallPrompt from "./components/InstallPrompt";
themeBoot();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* rezervă pentru banner viitor */}
    <div className="header-ad-reserved" />
    <App />
    <InstallPrompt />
  </React.StrictMode>
);
