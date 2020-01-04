import { Router } from 'express';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import authController from './app/controllers/AuthController';

const routes = Router();

routes.get('/', (req, res) => res.json('JWT-Node'));

routes.post('/users', UserController.store);
routes.post('/login', authController.store);

routes.use(authMiddleware);

export default routes;
