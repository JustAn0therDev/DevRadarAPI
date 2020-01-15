import { Router } from 'express';
import devController from './controllers/DevController';
import searchController from './controllers/SearchController';

const routes = Router();

routes.get('/devs', devController.index);
routes.post('/devs', devController.store);
routes.put('/devs', devController.update);
routes.delete('/devs', devController.destroy);

routes.get('/search', searchController.index);

export default routes;