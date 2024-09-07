import axios from 'axios';

const OMDB_API_KEY = '1e94ff26';  // Replace with your OMDB API key
const GOOGLE_API_KEY = 'AIzaSyCbwnx7wfwz_zSCDhW7FeWzuUMKbLyrKwo'; // Replace with your Google API key
const GOOGLE_CX = 'a479fbee333b5430a';
const TMDB_API_KEY='fb7bb23f03b6994dafc674c074d01761';
const fetchMoviesFromOMDB = async (searchTerm) => {
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?i=tt3896198&apikey=${OMDB_API_KEY}&s=${searchTerm}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch movies from OMDB.");
  }
};
const fetchMoviesFromTMDB = async (searchTerm) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/latest?api_key=${TMDB_API_KEY}&language=en-US`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch movies from TMDB.");
  }
};

const fetchMoviesFromGoogle = async (searchTerm) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/customsearch/v1?q=${searchTerm}&key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch results from Google.");
  }
};
 export default{
  fetchMoviesFromOMDB,fetchMoviesFromGoogle,fetchMoviesFromTMDB
 }