// ===============================================
// FILE: src/App.tsx
// CHANGE: add /ghid route
// ===============================================
import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import Shell from '@/components/Shell';
import ErrorBoundary from '@/components/ErrorBoundary';
import InstallPrompt from '@/components/InstallPrompt';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Onboarding = React.lazy(() => import('@/pages/Onboarding'));
const Home = React.lazy(() => import('@/pages/Home'));
const Learning = React.lazy(() => import('@/pages/Learning'));
const English = React.lazy(() => import('@/pages/English'));
const ExamSim = React.lazy(() => import('@/pages/ExamSim'));
const AllTopics = React.lazy(() => import('@/pages/AllTopics'));
const Psychology = React.lazy(() => import('@/pages/Psychology'));
const Settings = React.lazy(() => import('@/pages/Settings'));
const Fitness = React.lazy(() => import('@/pages/Fitness'));
const Mentor = React.lazy(() => import('@/pages/Mentor'));
const Progress = React.lazy(() => import('@/pages/Progress'));
const AdaptiveLearning = React.lazy(() => import('@/pages/AdaptiveLearning'));
const GuideIndirecta = React.lazy(() => import('@/pages/GuideIndirecta'));
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const Badges = React.lazy(() => import('@/pages/Badges'));

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Shell/>}>
    <Route index element={<Onboarding/>}/>
    <Route path='home' element={<Home/>}/>
    <Route path='learning' element={<Learning/>}/>
    <Route path='english' element={<English/>}/>
    <Route path='exam' element={<ExamSim/>}/>
    <Route path='all-tests' element={<AllTopics/>}/>
    <Route path='psychology' element={<Psychology/>}/>
    <Route path='settings' element={<Settings/>}/>
    <Route path='fitness' element={<Fitness/>}/>
    <Route path='mentor' element={<Mentor/>}/>
    <Route path='progress' element={<Progress/>}/>
    <Route path='adaptive-learning' element={<AdaptiveLearning/>}/>
    <Route path='ghid' element={<GuideIndirecta/>}/>
    <Route path='dashboard' element={<Dashboard/>}/>
    <Route path='badges' element={<Badges/>}/>
  </Route>
));

const AppLoader = () => (
  <div className="p-4"><Skeleton count={10} /></div>
);

export default function App(){
  return (
    <Suspense fallback={<AppLoader />}>
      {/* Wrap router in an error boundary so runtime errors render a user friendly message */}
      <ErrorBoundary>
        <RouterProvider router={router}/>
      </ErrorBoundary>
      <InstallPrompt/>
    </Suspense>
  );
}
