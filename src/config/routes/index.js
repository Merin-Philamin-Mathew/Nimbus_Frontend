import adminRoutes from './adminRoutes';
import userRoutes from './userRoutes';

const routes = [
    ...userRoutes,
    ...adminRoutes,
];

export default routes;
