import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router(); 
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

// index, show, create, update, delete

// Create collects point
routes.post('/points', upload.single('image'), pointsController.create);


// Get Users
routes.get('/items', itemsController.index);
// Filter list by state/city/items
routes.get('/points', pointsController.index);
// List a specific collects point
routes.get('/points/:id', pointsController.show);

export default routes;