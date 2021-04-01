const express = require('express');
const cors = require('cors');
const config = require('./config');
const movies = require('./movies.json');
const bodyParser = require('body-parser');

const app = express();

var jsonParser = bodyParser.json();

const getMovie = id => {
  return movies.find(movie => {
    return movie.id === id;
  });
};

app.use(cors());

app.use(jsonParser);

app.get('/movies', (req, res) => {
  res.send(movies);
});

app.get('/movies/:id', (req, res) => {
  const id = req.params.id;

  const movie = getMovie(id);

  if (!movie) {
    res.status(404).send('Not found');
    return;
  }

  res.send(movie);
});

app.post('/movies/:id/reviews', (req, res) => {
  //urlencoder or jsonParser\

  const id = req.params.id;
  const movie = getMovie(id);
  //console.log(req.body, 'body');
  const review = req.body;
  console.log(req.body, 'review here');
  movie.reviews.push(review);
  console.log(movie);

  //console.log(req.params.id);
  res.status(200).send(movie);
});

app.get('/movies/:id/reviews', (req, res) => {
  const id = req.params.id;

  const movie = getMovie(id);
  const reviews = movie.reviews;

  if (!movie) {
    res.status(404).send('Not found');
    return;
  }

  res.send(reviews);
});

app.listen(config.PORT, () => {
  console.log(`App is running at port http://localhost:${config.PORT}`);
});
