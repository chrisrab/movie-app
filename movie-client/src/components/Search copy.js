import Movie from './Movie';
import Movies from './Movies';
import { useState } from 'react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div>
      <input
        id="search"
        type="text"
        placeholder="Search Movies"
        onChange={event => {
          setSearchTerm(event.target.value);
        }}
      />
      {movies
        .filter(val => {
          if (searchTerm === '') {
            return val;
          } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val;
          }
        })
        .map(movie => (
          <Movie key={movie.id} movie={movie} onClick={onClick} />
        ))}
      }
    </div>
  );
};

export default Search;
