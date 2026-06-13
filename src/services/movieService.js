import axios from 'axios';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY || '63540b64';
const BASE_URL = 'https://www.omdbapi.com';

/**
 * Search movies by title and type with pagination
 */
export const searchMovies = async (query, page = 1, type = '') => {
  try {
    const params = {
      apikey: API_KEY,
      s: query,
      page,
    };
    if (type) params.type = type;

    const response = await axios.get(BASE_URL, { params });

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch movies');
  }
};

/**
 * Get detailed movie info by IMDB ID
 */
export const getMovieById = async (imdbID) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: imdbID,
        plot: 'full',
      },
    });

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch movie details');
  }
};