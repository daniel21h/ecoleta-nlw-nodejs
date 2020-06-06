import express from 'express';
// Validation
import { celebrate, Joi } from 'celebrate';

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
routes.post(
  '/points', 
  upload.single('image'), 
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required(),
    })
  }, {
    // Returns all validation errors at once
    abortEarly: false
  }),
  pointsController.create
);


// Get Users
routes.get('/items', itemsController.index);
// Filter list by state/city/items
routes.get('/points', pointsController.index);
// List a specific collects point
routes.get('/points/:id', pointsController.show);

export default routes;