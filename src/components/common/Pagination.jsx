import React from "react";
import '../../styles/pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages === 0) {
        return null;
    }

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={number === currentPage ? 'active' : ''}
                    disabled={number === currentPage} // Disable button if it's the current page
                >
                    {number}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
