import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const  newApiHandler= useCallback(async ()=> {
    try {

      setIsLoading(true);
      setError(null);

      const response = await fetch('https://swapi.dev/api/films');
      if (!response.ok) {
        throw new Error("Something went wrong :(")
      }
      const data = await response.json();
      const transformMovies = data.results.map(movie => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date
        };
      });
      setMovies(transformMovies);
      setIsLoading(false);
    }
    catch (error) {
      setError(error.message);
      setIsLoading(false);
    }

  }, []);
  useEffect(()=>{
    newApiHandler()
    },[newApiHandler])

  let content = <p>Found no movies</p>

  if (movies.length>0){
    content= <MoviesList movies= {movies}/>
  }

  if (error) {
    content= <p>{error}</p>
  }

  if(isLoading){
    content =<p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={newApiHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
