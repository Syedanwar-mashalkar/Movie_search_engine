import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MovieService from './MovieService'; // Import the default export object
import './Movies.css'; // Import the CSS file

const { fetchMoviesFromOMDB, fetchMoviesFromGoogle, fetchMoviesFromTMDB } = MovieService; // Destructure the functions

function Movies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMovies, setSearchMovies] = useState([]);
  const [googleResults, setGoogleResults] = useState([]);
  const [tmdbResults, setTmdbResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchMovies(event) {
    setLoading(true);
    event.preventDefault();
    try {
      // Fetch from OMDB API
      const omdbData = await fetchMoviesFromOMDB(searchTerm);
      if (omdbData.Response === "True" && omdbData.Search) {
        setSearchMovies(omdbData.Search);
        setErrorMessage("");
      } else {
        setSearchMovies([]);
        setErrorMessage("No movies found in OMDB :( TRY AGAIN");
      }

      // Fetch from Google Custom Search API
      const googleData = await fetchMoviesFromGoogle(searchTerm);
      if (googleData.items) {
        setGoogleResults(googleData.items);
      } else {
        setGoogleResults([]);
      }

      // Fetch from TMDB API
      const tmdbData = await fetchMoviesFromTMDB(searchTerm);
      if (tmdbData.results) {
        setTmdbResults(tmdbData.results);
      } else {
        setTmdbResults([]);
      }

    } catch (error) {
      setErrorMessage("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="movie__page" className="bg-gradient flex flex-col w-full min-h-screen">
      <div className="search-container">
        <h1>Movie Explorer</h1>
        <form onSubmit={fetchMovies} className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Search movie..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
        
        {errorMessage && <h2 className="text-red-500">{errorMessage}</h2>}
        {loading ? (
          <div className="loader-container">
            <div className="bouncing-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        ) : (
          <>
            <h1>OMDB Result</h1>
            <div className="movie-container">
              {searchMovies.map((movie) => (
                <div key={movie.imdbID} className="movie-card">
                  <Link to={`/movies/${movie.imdbID}`}>
                    <img src={movie.Poster} alt={movie.Title} />
                    <div className="movie-card-content">
                      <h3>{movie.Title}</h3>
                      <p>{movie.Year}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            
            <h1>Google Results</h1>
            <div className="google-results-container">
              {googleResults.map((result) => (
                <div key={result.cacheId} className="google-result-card">
                  <a href={result.link} target="_blank" rel="noopener noreferrer">
                    <h3>{result.title}</h3>
                    <p>{result.snippet}</p>
                  </a>
                </div>
              ))}
            </div>

            <h1>TMDB Results</h1>
            <div className="tmdb-results-container">
              {tmdbResults.map((movie) => (
                <div key={movie.id} className="tmdb-result-card">
                  <Link to={`/movies/${movie.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div className="tmdb-card-content">
                      <h3>{movie.title}</h3>
                      <p>{movie.release_date}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Movies;
