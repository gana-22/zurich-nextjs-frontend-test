'use client';

import React from 'react';
import { PaginationContainer, PaginationButton } from './UsersPage.styles';

export default function Pagination({ page, totalPages, handlePageChange }) {
  return (
    <PaginationContainer>
      <PaginationButton onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        Previous
      </PaginationButton>
      {Array.from({ length: totalPages }, (_, i) => (
        <PaginationButton
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          disabled={page === i + 1}
        >
          {i + 1}
        </PaginationButton>
      ))}
      <PaginationButton onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
        Next
      </PaginationButton>
    </PaginationContainer>
  );
}