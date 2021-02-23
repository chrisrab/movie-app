import React from 'react';
import Movies from './Movies';

import { Link, Outlet } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';

function Home({ movies }) {
  console.log(movies);
  return (
    <div className="main">
      <h1>Movies</h1>
      <Link to={'/search'}>
        <BiSearch />
      </Link>
      <Movies movies={movies} />
    </div>
  );
}

export default Home;
