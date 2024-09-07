import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MovieDetail.css'; // Import the CSS file for styling

const API_KEY = '1e94ff26';  // Replace with your OMDB API key

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
                if (response.data.Response === 'True') {
                    setMovie(response.data);
                    setError('');
                } else {
                    setError(response.data.Error);
                    setMovie(null);
                }
            } catch (err) {
                setError('An error occurred. Please try again.');
                setMovie(null);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetail();
    }, [id]);

    if (loading) return <div className="loader">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="movie-detail-card">
            {movie && (
                <div className="movie-detail">
                    <div className="movie-poster">
                        <img src={movie.Poster} alt={movie.Title} />
                    </div>
                    <div className="movie-info">
                        <h1>{movie.Title}</h1>
                        <p><strong>Year:</strong> {movie.Year}</p>
                        <p><strong>Rated:</strong> {movie.Rated}</p>
                        <p><strong>Released:</strong> {movie.Released}</p>
                        <p><strong>Runtime:</strong> {movie.Runtime}</p>
                        <p><strong>Genre:</strong> {movie.Genre}</p>
                        <p><strong>Director:</strong> {movie.Director}</p>
                        <p><strong>Writer:</strong> {movie.Writer}</p>
                        <p><strong>Actors:</strong> {movie.Actors}</p>
                        <p><strong>Plot:</strong> {movie.Plot}</p>
                        <p><strong>Language:</strong> {movie.Language}</p>
                        <p><strong>Country:</strong> {movie.Country}</p>
                        <p><strong>Awards:</strong> {movie.Awards}</p>
                        <div className="movie-ratings">
                            <h3>Ratings:</h3>
                            {movie.Ratings.map((rating) => (
                                <p key={rating.Source}><strong>{rating.Source}:</strong> {rating.Value}</p>
                            ))}
                        </div>
                        <p><strong>IMDB Rating:</strong> {movie.imdbRating} ({movie.imdbVotes} votes)</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieDetail;
