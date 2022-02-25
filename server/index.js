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

app.post('/api/notes', (req, res, next) => {
  const note = req.body.note;
  const gameId = req.body.gameId;
  const userId = 1;
  if (!note) {
    throw new ClientError(400, 'Notes is a required field');
  }
  const sql = `
  insert into "notes" ("note", "gameId", "userId")
  values ($1, $2, $3)
  returning*
  `;
  const params = [note, gameId, userId];
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
