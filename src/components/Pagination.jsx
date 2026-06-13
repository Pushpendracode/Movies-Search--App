import React from 'react';

/**
 * Pagination — handles page navigation
 */
const Pagination = ({ currentPage, totalResults, onPageChange }) => {
  const totalPages = Math.ceil(totalResults / 10);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg disabled:opacity-40 hover:bg-yellow-500 transition"
      >
        ← Prev
      </button>

      <span className="text-white font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg disabled:opacity-40 hover:bg-yellow-500 transition"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;