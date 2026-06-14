import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { searchMovies } from '../services/movieService';

/**
 * SearchPage — main page with search, filter, results, pagination
 */
const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('batman');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load batman movies on page load
  useEffect(() => {
    fetchMovies('batman', 1, '');
  }, []);

  const fetchMovies = async (searchQuery, page, selectedType) => {
    setLoading(true);
    setError('');
    try {
      const data = await searchMovies(searchQuery, page, selectedType);
      setMovies(data.Search);
      setTotalResults(parseInt(data.totalResults));
    } catch (err) {
      setError(err.message);
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setCurrentPage(1);
    fetchMovies(searchQuery, 1, type);
  };

  const handleTypeChange = (selectedType) => {
    setType(selectedType);
    setCurrentPage(1);
    if (query) fetchMovies(query, 1, selectedType);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchMovies(query, page, type);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-400 mb-2">🎬 Movie Search</h1>
        <p className="text-gray-400">Search millions of movies and TV series</p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto mb-8">
        <div className="flex-1">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>
        <TypeFilter selectedType={type} onTypeChange={handleTypeChange} />
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-yellow-400 text-xl mt-12">
          Loading...
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="text-center mt-12">
          <p className="text-red-400 text-lg">{error}</p>
        </div>
      )}

      {/* Results Grid */}
      {!loading && movies.length > 0 && (
        <>
          <p className="text-gray-400 text-sm mb-4 text-center">
            Found {totalResults} results
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalResults={totalResults}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default SearchPage;