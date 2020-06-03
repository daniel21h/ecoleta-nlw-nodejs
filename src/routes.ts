import express from 'express';
import knex from './database/connection';

import PointsController from './controllers/PointController';

const routes = express.Router(); 
const pointsController = new PointsController();



// Get Users
routes.get('/items', async (request, response) => {
  const items = await knex('items').select('*');

  const serializedItems = items.map(item => {
    return {
      id: item.id,
      name: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    }
  })

  return response.json(serializedItems);
});

// Create collection point
routes.post('/points', pointsController.create);

export default routes;