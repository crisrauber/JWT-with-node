import { Router } from 'express';
import cors from 'cors';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import CardController from './app/controllers/CardController';

import checkCard from './app/middlewares/checkCard';
import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.use(cors());

routes.get('/', (req, res) => res.json('JWT-API'));
routes.post('/users', UserController.store);
routes.post('/login', AuthController.store);

routes.use(authMiddleware);

routes.get('/cards', CardController.index);
routes.get('/cards/:id', checkCard, CardController.show);
routes.post('/cards', CardController.store);
routes.put('/cards/:id', checkCard, CardController.update);
routes.delete('/cards/:id', checkCard, CardController.delete);

routes.get('/test-auth', (req, res) =>
  res.json({ logged: req.userId, result: 'JWT-API-AUTH' })
);

export default routes;
