
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/theme.css";
import { themeBoot } from "./lib/themeBoot";
import { App } from "./router";
import InstallPrompt from "./components/InstallPrompt";
import { AuthProvider } from "./providers/AuthProvider";

// Bootstraps any global CSS variables or theme settings
themeBoot();

// Mount the React application. We wrap the whole app in
// AuthProvider so that authentication state is available
// throughout the component tree. The reserved header div
// remains for future banners or ads.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <div className="header-ad-reserved" />
      <App />
      <InstallPrompt />
    </AuthProvider>
  </React.StrictMode>
);
