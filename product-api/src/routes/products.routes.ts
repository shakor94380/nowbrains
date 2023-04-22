import { Router } from 'express';
import { getAll, get, post, patch, remove, search } from '../controllers/products.controllers';

const routes : Router = Router();

routes.get('/', getAll);

routes.get('/:id', get);

routes.post('/', post);

routes.patch('/:id', patch);

routes.delete('/:id', remove);

routes.post('/search', search);

export default routes;