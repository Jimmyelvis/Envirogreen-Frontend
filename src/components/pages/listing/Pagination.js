import React from 'react';

export const Pagination = ({ lastPage, currentPage, paginate }) => {
  return (
    <div className="pagination">
      {Array.from({ length: lastPage }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => {
            paginate(index + 1);
            window.scrollTo({
              top: 100,
              behavior: 'smooth',
            });
          }}
          className={`pagination-button ${
            currentPage === index + 1 ? 'active' : ''
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

