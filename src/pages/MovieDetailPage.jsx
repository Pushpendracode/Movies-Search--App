import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../services/movieService';

/**
 * MovieDetailPage — shows full details of a selected movie
 */
const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <p className="text-yellow-400 text-2xl">Loading...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <p className="text-red-400 text-xl mb-4">{error}</p>
      <button onClick={() => navigate('/')} className="px-4 py-2 bg-yellow-400 text-black rounded-lg font-bold">
        ← Back to Search
      </button>
    </div>
  );

  const poster = movie.Poster !== 'N/A'
    ? movie.Poster
    : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition"
        >
          ← Back to Search
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <img
            src={poster}
            alt={movie.Title}
            className="w-full md:w-72 rounded-xl shadow-lg object-cover"
          />

          {/* Details */}
          <div className="flex-1 text-white">
            <h1 className="text-3xl font-bold text-yellow-400 mb-2">{movie.Title}</h1>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">{movie.Year}</span>
              <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">{movie.Rated}</span>
              <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">{movie.Runtime}</span>
              <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm capitalize">{movie.Type}</span>
            </div>

            <p className="text-gray-300 mb-4">{movie.Genre}</p>
            <p className="text-gray-300 mb-6 leading-relaxed">{movie.Plot}</p>

            <div className="space-y-2 text-sm">
              <p><span className="text-yellow-400 font-semibold">Director:</span> <span className="text-gray-300">{movie.Director}</span></p>
              <p><span className="text-yellow-400 font-semibold">Cast:</span> <span className="text-gray-300">{movie.Actors}</span></p>
              <p><span className="text-yellow-400 font-semibold">Language:</span> <span className="text-gray-300">{movie.Language}</span></p>
              <p><span className="text-yellow-400 font-semibold">Country:</span> <span className="text-gray-300">{movie.Country}</span></p>
            </div>

            {/* Ratings */}
            {movie.Ratings && movie.Ratings.length > 0 && (
              <div className="mt-6">
                <h3 className="text-yellow-400 font-semibold mb-2">Ratings</h3>
                <div className="flex flex-wrap gap-3">
                  {movie.Ratings.map((rating) => (
                    <div key={rating.Source} className="bg-gray-700 px-3 py-2 rounded-lg text-center">
                      <p className="text-white font-bold">{rating.Value}</p>
                      <p className="text-gray-400 text-xs">{rating.Source}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;