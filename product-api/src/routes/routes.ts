import { Router } from 'express';
import { authorize } from '../middlewares/authorize.middlewares'
import productRoutes from './products.routes';
import accountRoutes from './accounts.routes';

const routes: Router = Router();

routes.use('/products', authorize, productRoutes);

routes.use('/accounts', accountRoutes);

export default routes;