import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LandingLayout } from '@/layouts/LandingLayout';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

const LandingPage = lazy(() => import('@/pages/LandingPage').then((m) => ({ default: m.LandingPage })));
const SuccessPage = lazy(() => import('@/pages/SuccessPage').then((m) => ({ default: m.SuccessPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

const router = createBrowserRouter([
  {
    element: <LandingLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        path: 'dang-ky/thanh-cong',
        element: <SuccessPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export const AppRouter = () => (
  <Suspense fallback={<LoadingScreen />}>
    <RouterProvider router={router} fallbackElement={<LoadingScreen />} />
  </Suspense>
);
