import { Router } from 'express';
import userRoutes from './usersRoutes';
import cardsRouter from './cardsRoutes';
import notFoundRouter from './notFoundRoutes';
import { login, createUser } from '../controllers/signController';
import { validateLogin, validateCreateUser } from '../middlewares/validations';

const routes = Router();

routes.post('/signin', validateLogin, login);
routes.post('/signup', validateCreateUser, createUser);
routes.use('/users', userRoutes);
routes.use('/cards', cardsRouter);
routes.use('/*', notFoundRouter);

export default routes;
