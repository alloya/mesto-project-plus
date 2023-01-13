import { Router } from 'express';
import userRoutes from './usersRoutes';
import cardsRouter from './cardsRoutes';
import notFoundRouter from './notFoundRoutes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/cards', cardsRouter);
routes.use('/*', notFoundRouter);

export default routes;
