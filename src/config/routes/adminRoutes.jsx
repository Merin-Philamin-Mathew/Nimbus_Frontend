import WeatherLoader from '@/components/utils/WeatherLoader';
import { lazy, Suspense } from 'react';

const UserManagement = lazy(() => import('@/pages/user/UserManagement'));
const adminRoutes = [
    {
        path: "/user-management",
        element: (
            <Suspense fallback={<WeatherLoader/>}>
                <UserManagement/>
            </Suspense>
        ),
    },
 
];

export default adminRoutes;
