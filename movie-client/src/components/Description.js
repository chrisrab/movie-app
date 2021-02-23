import React from 'react';
import { useParams } from 'react-router-dom';

function Description({ movies }) {
  const { id } = useParams();
  const anyMovie = movies.filter(movie => movie.id == id);

  const movie = anyMovie[0];

  if (!movie) {
    return <h2>Movie Not Found</h2>;
  }

  const { title, image, reviews, genre, description } = movie;

  return (
    <div>
      <h2>{title}</h2>
      <img src={image} alt={title} style={bigImageStyle} />
      <h3>{genre}</h3>
      <p>{description}</p>
      <form method="POST" action="http://localhost:3000/movies/:id/reviews">
        <input type="text" name="review" placeholder="Write review here..."></input>
        <input type="submit" value="submit"></input>
      </form>
    </div>
  );
}

const bigImageStyle = {
  width: '500px',
  height: '750px'
};

export default Description;
