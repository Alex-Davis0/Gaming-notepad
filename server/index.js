require('dotenv/config');
const pg = require('pg');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.use(staticMiddleware);

app.get('/api/notes', (req, res, next) => {
  const sql = `
  select *
  from notes
  order by "noteId"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));

});

app.post('/api/notes', (req, res, next) => {
  const note = req.body.note;
  const gameId = req.body.gameId;
  const backgroundImage = req.body.backgroundImage;
  const name = req.body.name;
  const userId = 1;
  if (!note) {
    throw new ClientError(400, 'Notes is a required field');
  }
  const sql = `
  insert into "notes" ("note", "name", "backgroundImage", "gameId", "userId")
  values ($1, $2, $3, $4, $5)
  returning*
  `;
  const params = [note, name, backgroundImage, gameId, userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
