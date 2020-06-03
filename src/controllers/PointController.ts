import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  // Filter list by state/city/items
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(', ')
      .map(item => Number(item.trim()));

    // Query to database
    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      // Return only point of distinct collects
      .distinct()
      .select('points.*');

    return response.json(points);
  }

  // List a specific collects point
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if(!point) {
      return response.status(400).json({ message: 'Point not found.' });
    }

    // Listing items that relate to that collection point
    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    return response.json({ point, items });
  }

  // Create collects point
  async create(request: Request, response: Response) {
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
  
    const trx = await knex.transaction();

    const point = {
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    };
  
    const insertedIds = await trx('points').insert(point);
  
    const point_id = insertedIds[0];
    
    // Relationship with the items table
    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    })
  
    await trx('point_items').insert(pointItems);

    // Here it really does the inserts in the database
    await trx.commit();
  
    return response.json({
      id: point_id,
      ...point, 
    });
  };
}

export default PointsController;