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

app.put('/api/notes/:id', (req, res) => {
  const body = req.body;
  const id = Number(req.params.id);
  if (!id || !Number.isInteger(id) || id < 0) {
    res.status(400).json({
      error: 'Id must be a positive integer'
    });
    return;
  } else if (!body.name && !body.course) {
    res.status(400).json({
      error: ''
    });
    return;
  }
  const sql = `
  update "notes"
  set "note" = $1,
      "name" = $2,
      "gameId" = $3
  where "noteId" = $4
  returning*;
  `;
  const values = [body.note, body.name, body.gameId, id];
  db.query(sql, values)
    .then(result => {
      const grade = result.rows[0];
      if (!grade) {
        res.status(404).json({
          error: 'Grade does not exist'
        });
        return;
      }
      res.json(grade);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({
        error: 'Unexpected error'
      });
    });
});

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!id || !Number.isInteger(id)) {
    res.status(400).json({ error: 'id must be a positive integer' });
  }
  const sql = `
  delete from "notes"
  where "noteId" = $1
  returning*
  `;
  const values = [id];
  db.query(sql, values)
    .then(result => {
      const note = result.rows[0];
      if (!note) {
        res.status(404).json({ error: 'gradeId does not exist' });
        return;
      }
      res.status(204).json(note);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    });
});
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
