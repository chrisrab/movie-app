import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Movies({ movies }) {
  return (
    <ul className="movies">
      {movies.map(({ id, title, genre, reviews, image }) => (
        <li key={id} className="movie">
          <Link to={`/${id}`}>
            <h2 className="title">{title}</h2>
            <img src={image} alt={title} style={imageStyle}></img>
          </Link>
          <h3>{genre}</h3>
        </li>
      ))}
      <Outlet />
    </ul>
  );
}

const imageStyle = {
  width: '500px',
  height: '750px'
};

export default Movies;
