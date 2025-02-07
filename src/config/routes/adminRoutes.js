// import { lazy } from 'react';
// import ProtectedRoute from '../ProtectedRoute';
// import { Outlet } from 'react-router-dom';

// const AdminOutlet = lazy(() => import('@/components/Layouts/admin/AdminOutlet'));
// const AdminLogin = lazy(() => import('@/pages/admin/Login/AdminLogin'));
// const AdminDashboardPage = lazy(() => import('@/pages/admin/dashboarf.jsx/AdminDashboardPage'));
// const UserListingPage = lazy(() => import('@/pages/admin/Users/UsersListingPage'));

// const adminRoutes = [
//     {
//         path: "/admin/login",
//         element: <AdminLogin />
//     },
//     {
//         path: "/admin",
//         element: (
//             <ProtectedRoute roleRequired="admin">
//                 <AdminOutlet>
//                     <Outlet />
//                 </AdminOutlet>
//             </ProtectedRoute>
//         ),
//         children: [
//             { path: "dashboard", element: <AdminDashboardPage /> },
//             { path: "users", element: <UserListingPage /> },
//         ]
//     }
// ];

// export default adminRoutes;
