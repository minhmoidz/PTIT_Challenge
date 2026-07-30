import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LandingLayout } from '@/layouts/LandingLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

const LandingPage = lazy(() => import('@/pages/LandingPage').then((m) => ({ default: m.LandingPage })));
const RegistrationPage = lazy(() => import('@/pages/RegistrationPage').then((m) => ({ default: m.RegistrationPage })));
const TeamsPage = lazy(() => import('@/pages/TeamsPage').then((m) => ({ default: m.TeamsPage })));
const TeamDetailPage = lazy(() => import('@/pages/TeamDetailPage').then((m) => ({ default: m.TeamDetailPage })));
const SuccessPage = lazy(() => import('@/pages/SuccessPage').then((m) => ({ default: m.SuccessPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));
const AdminLoginPage = lazy(() => import('@/pages/AdminLoginPage').then((m) => ({ default: m.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import('@/pages/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })));

const router = createBrowserRouter([
  // ── Public website routes (with LandingLayout + footer + sticky CTA)
  {
    element: <LandingLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'dang-ky', element: <RegistrationPage /> },
      { path: 'dang-ky/thanh-cong', element: <SuccessPage /> },
      { path: 'doi-thi', element: <TeamsPage /> },
      { path: 'doi-thi/:slug', element: <TeamDetailPage /> },
    ],
  },
  // ── Admin Login (standalone, no sidebar)
  {
    path: 'admin',
    element: <AdminLoginPage />,
  },
  // ── Admin Portal (with AdminLayout = sidebar + topbar)
  {
    element: <AdminLayout />,
    children: [
      { path: 'admin/dashboard', element: <AdminDashboardPage /> },
    ],
  },
  // ── 404
  {
    path: '*',
    element: <NotFoundPage />,
  },
], { basename: import.meta.env.BASE_URL });

export const AppRouter = () => (
  <Suspense fallback={<LoadingScreen />}>
    <RouterProvider router={router} />
  </Suspense>
);
