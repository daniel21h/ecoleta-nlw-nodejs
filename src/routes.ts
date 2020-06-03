import express from 'express';

import PointsController from './controllers/PointController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router(); 
const pointsController = new PointsController();
const itemsController = new ItemsController();

// index, show, create, update, delete

// Get Users
routes.get('/items', itemsController.index);
// Create collects point
routes.post('/points', pointsController.create);
// Filter list by state/city/items
routes.get('/points', pointsController.index);
// List a specific collects point
routes.get('/points/:id', pointsController.show);

export default routes;