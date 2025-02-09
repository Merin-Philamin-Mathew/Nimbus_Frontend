import { lazy, Suspense } from 'react';

const UserManagement = lazy(() => import('@/pages/user/UserManagement'));
const adminRoutes = [
    {
        path: "/user-management",
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <UserManagement/>
            </Suspense>
        ),
    },
 
];

export default adminRoutes;
