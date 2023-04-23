import { Router } from 'express';
import { authorize } from '../middlewares/authorize.middlewares'
import productRoutes from './products.routes';
import accountRoutes from './accounts.routes';

const routes: Router = Router();

routes.use('/products', authorize, productRoutes);

routes.use('/accounts', accountRoutes);

routes.get('/access', authorize, (req, res) => {
    res.status(200).send(true);
})

export default routes;