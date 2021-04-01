import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function Description({ movies }) {
  //const [movie, setMovie] = useState([])
  const { id } = useParams();
  const anyMovie = movies.filter(movie => movie.id === id);
  //const [revs, setRevs] = useState([]);

  const movie = anyMovie[0];
  console.log(movie);

  if (!movie) {
    return <h2>Movie Not Found</h2>;
  }

  const { title, image, reviews, genre, description } = movie;

  function refreshPage() {
    const reload = window.location.reload();
    return reload;
  }

  function renderReviews(reviews) {
    let getScores = reviews.map(function(e) {
      return parseInt(e.score);
    });

    function average(array) {
      return array.reduce((a, b) => a + b, 0) / array.length;
    }

    let reviewArray = reviews.map(function(e) {
      return e.review;
    });

    const averageScoreNotFound = <h3>There are no reviews yet</h3>;

    const averageScoreFound = <h3> The average user review score for this film is: {average(getScores)}/10</h3>;

    return (
      <div>
        {reviews.length > 0 ? averageScoreFound : averageScoreNotFound}
        <h2>These are the most recent reviews: </h2>
        <ul>
          {reviewArray.map(review => (
            <li key={review}>"{review}"</li>
          ))}
        </ul>
      </div>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    let review = event.target[0].value;
    let score = event.target[1].value;

    const payload = { review, score };

    fetch(`http://localhost:3000/movies/${id}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(movie => {
        console.log(movie); // Waz, is there a way to get the info that is returned out from here so i  can use this to render my reviews
      });
    refreshPage(); //Warren, I know this is disgusting amd goes against the whole point of react ha
    //, I know there must be a really easy way to do this, i've tried quite a few!
  }

  return (
    <div>
      <h2>{title}</h2>
      <img src={image} alt={title} style={bigImageStyle} />
      <h3>{genre}</h3>
      <p>{description}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="review" placeholder="Write review here..."></input>
        <input type="number" name="score" placeholder="Review score out of 10"></input>
        <input type="submit" value="submit"></input>
      </form>
      <div>{renderReviews(reviews)}</div>
    </div>
  );
}

const bigImageStyle = {
  width: '500px',
  height: '750px'
};

export default Description;

//method="POST" action="http://localhost:3000/movies/godzilla/reviews"
