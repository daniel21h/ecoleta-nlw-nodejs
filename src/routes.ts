import express from 'express';

import PointsController from './controllers/PointController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router(); 
const pointsController = new PointsController();
const itemsController = new ItemsController();

// index, show, create, update, delete

// Get Users
routes.get('/items', itemsController.index);
// Create collection point
routes.post('/points', pointsController.create);
// List a specific collection point
routes.get('/points/:id', pointsController.show);

export default routes;