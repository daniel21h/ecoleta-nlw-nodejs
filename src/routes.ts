import express from 'express';

const routes = express.Router();

// GET USERS
routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

export default routes;