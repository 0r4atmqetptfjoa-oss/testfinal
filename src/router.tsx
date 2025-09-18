// ===============================================
// FILE: src/router.tsx
// Unified router configuration for Mentor ANA
// All routes are defined here and lazy‑loaded to improve performance.
// ===============================================

import React, { Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import Shell from './components/Shell';
import ErrorBoundary from './components/ErrorBoundary';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Generic loader component displayed while lazy modules load
const PageLoader = () => (
  <div className="p-4">
    <Skeleton count={10} />
  </div>
);

// Lazy‑loaded page components
const Onboarding = React.lazy(() => import('./pages/Onboarding'));
const Home = React.lazy(() => import('./pages/Home'));
const Learning = React.lazy(() => import('./pages/Learning'));
const English = React.lazy(() => import('./pages/English'));
const ExamSim = React.lazy(() => import('./pages/ExamSim'));
const AllTopics = React.lazy(() => import('./pages/AllTopics'));
const Psychology = React.lazy(() => import('./pages/Psychology'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Fitness = React.lazy(() => import('./pages/Fitness'));
const Mentor = React.lazy(() => import('./pages/Mentor'));
const Progress = React.lazy(() => import('./pages/Progress'));
const AdaptiveLearning = React.lazy(() => import('./pages/AdaptiveLearning'));
const GuideIndirecta = React.lazy(() => import('./pages/GuideIndirecta'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Badges = React.lazy(() => import('./pages/Badges'));
const About = React.lazy(() => import('./pages/About'));
const ModuleHome = React.lazy(() => import('./pages/ModuleHome'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Build the router tree using createRoutesFromElements
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Shell />} errorElement={<ErrorBoundary />}>
      {/* Redirect root to /home */}
      <Route index element={<Navigate to="/home" replace />} />
      {/* Core pages */}
      <Route path="home" element={<Home />} />
      <Route path="onboarding" element={<Onboarding />} />
      <Route path="learning" element={<Learning />} />
      <Route path="english" element={<English />} />
      <Route path="exam" element={<ExamSim />} />
      <Route path="all-tests" element={<AllTopics />} />
      <Route path="psychology" element={<Psychology />} />
      <Route path="settings" element={<Settings />} />
      <Route path="fitness" element={<Fitness />} />
      <Route path="mentor" element={<Mentor />} />
      <Route path="progress" element={<Progress />} />
      <Route path="adaptive-learning" element={<AdaptiveLearning />} />
      <Route path="ghid" element={<GuideIndirecta />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="badges" element={<Badges />} />
      <Route path="about" element={<About />} />
      <Route path="module/:slug" element={<ModuleHome />} />
      {/* Catch‑all for 404 */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

// Entry point for the app – wraps RouterProvider in Suspense with a loader
export function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}