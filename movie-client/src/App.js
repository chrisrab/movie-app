import './App.css';
import React from 'react';
import Home from './components/Home';
import Description from './components/Description';
import Movies from './components/Movies';
import Search from './components/Search';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      const moviesFromServer = await fetchMovies();
      setMovies(moviesFromServer);
    };
    getMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await fetch('http://localhost:3000/movies');
    const data = await res.json();

    return data;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home movies={movies} />} />
        <Route path="search" element={<Search movies={movies} />} />
        <Route path=":id" element={<Description movies={movies} />} />
      </Routes>
    </Router>
  );
};

export default App;
