import { Router } from 'express';
import { login, register } from '../controllers/accounts.controllers';

const routes : Router = Router();

routes.post('/', register);

routes.post('/login', login);

export default routes;