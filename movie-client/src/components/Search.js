import React from 'react';
import Movies from './Movies';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

function Search({ movies }) {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search Movies"
        onChange={event => {
          setSearchTerm(event.target.value);
        }}
      />
      <ul className="movies">
        {movies
          .filter(val => {
            if (searchTerm === '') {
              console.log(val);
              return val;
            } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
              console.log(val);
              return val;
            }
          })
          .map(({ id, title, genre, reviews, image }) => (
            <li key={id}>
              <Link to={`/${id}`}>
                <h2 className="title">{title}</h2>
                <img src={image} alt={title} style={imageStyle}></img>
              </Link>
              <h3>{genre}</h3>
            </li>
          ))}
        <Outlet />
      </ul>
    </div>
  );
}

const imageStyle = {
  width: '500px',
  height: '750px'
};

export default Search;
