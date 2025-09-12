import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import Shell from '@/components/Shell';
import InstallPrompt from '@/components/InstallPrompt';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// --- LAZY LOADING PENTRU PERFORMANȚĂ ---
const Onboarding = React.lazy(() => import('@/pages/Onboarding')); // Pagina noua, unica
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

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Shell/>}>
    {/* Onboarding este acum ruta principală dacă utilizatorul nu a făcut o selecție */}
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
  </Route>
));

const AppLoader = () => (
  <div className="p-4"><Skeleton count={10} /></div>
);

export default function App(){
  return (
    <Suspense fallback={<AppLoader />}>
      <RouterProvider router={router}/>
      <InstallPrompt/>
    </Suspense>
  );
}