import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const poster =
    movie.Poster !== 'N/A'
      ? movie.Poster
      : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <div
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
      className="cursor-pointer bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-yellow-400/30 transition-transform duration-200"
    >
      <img
        src={poster}
        alt={movie.Title}
        className="w-full h-72 object-cover"
      />
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm truncate">{movie.Title}</h3>
        <div className="flex justify-between mt-1">
          <span className="text-gray-400 text-xs">{movie.Year}</span>
          <span className="text-yellow-400 text-xs capitalize">{movie.Type}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;