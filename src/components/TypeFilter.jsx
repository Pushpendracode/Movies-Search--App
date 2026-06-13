import React from 'react';

/**
 * TypeFilter — dropdown to filter by movie/series/episode
 * Uses API-level filtering (no array.filter())
 */
const TypeFilter = ({ selectedType, onTypeChange }) => {
  const types = [
    { value: '', label: 'All Types' },
    { value: 'movie', label: 'Movies' },
    { value: 'series', label: 'TV Series' },
    { value: 'episode', label: 'Episodes' },
  ];

  return (
    <select
      value={selectedType}
      onChange={(e) => onTypeChange(e.target.value)}
      className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 bg-white"
    >
      {types.map((type) => (
        <option key={type.value} value={type.value}>
          {type.label}
        </option>
      ))}
    </select>
  );
};

export default TypeFilter;