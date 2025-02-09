import WeatherLoader from '@/components/utils/WeatherLoader';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('../../pages/user/HomePage'))
const TrialPage = lazy(() => import('../../pages/Trial'))

const userRoutes = [
    {
        path: "/",
        element: (
            <Suspense fallback={<WeatherLoader/>}>
                <HomePage/>
            </Suspense>
        ),
    },
    {
        path: "/trial-page",
        element: (
            <Suspense fallback={<WeatherLoader/>}>
                <TrialPage/>
            </Suspense>
        ),
    },
    // {
    //     path: "/signup",
    //     element: (
    //         <Suspense fallback={<div>Loading...</div>}>
    //             <RegisterPage />
    //         </Suspense>
    //     ),
    // },
    // {
    //     path: "/otp-verification",
    //     element: (
    //         <Suspense fallback={<div>Loading...</div>}>
    //             <OTPVerificationPage />
    //         </Suspense>
    //     ),
    // },
];

export default userRoutes;
