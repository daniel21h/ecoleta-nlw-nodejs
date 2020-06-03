import express from 'express';

const app = express();

app.get('/users', (request, response) => {
  response.json({ message: 'Hello Rocketseat' })
});

app.listen(3333);