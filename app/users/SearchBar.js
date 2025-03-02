'use client';

import React from 'react';
import { SearchInput } from './UsersPage.styles';

export default function SearchBar({ search, handleSearch }) {
  return (
    <SearchInput
      type="text"
      placeholder="Search by First or Last Name"
      value={search}
      onChange={handleSearch}
    />
  );
}