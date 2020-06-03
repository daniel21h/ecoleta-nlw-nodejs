import express from 'express';
import knex from './database/connection';

const routes = express.Router(); 

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
routes.post('/points', async(request, response) => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items
  } = request.body;

  const ids = await knex('points').insert({
    image: 'image-fake',
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf
  });
  
  // Relationship with the items table
  const pointItems = items.map((item_id: number) => {
    return {
      item_id,
      point_id: ids[0],
    };
  })

  await knex('point_items').insert(pointItems);

  return response.json({ success: true });
});

export default routes;