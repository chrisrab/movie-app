const express = require('express');
const cors = require('cors');
const config = require('./config');
const movies = require('./movies.json');
const bodyParser = require('body-parser');

const app = express();

var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());

app.get('/movies', (req, res) => {
  res.send(movies);
});

app.get('/movies/:id', (req, res) => {
  const id = req.params.id;

  movie(id);

  if (!movie) {
    res.status(404).send('Not found');
    return;
  }

  res.send(movie);
});

app.post('/movies/:id/reviews', urlencodedParser, (req, res) => {
  console.log(req.params.id);
  console.log(req.body.review);
});

const movie = id => {
  movies.find(movie => {
    return movie.id === id;
  });
};

app.listen(config.PORT, () => {
  console.log(`App is running at port http://localhost:${config.PORT}`);
});
