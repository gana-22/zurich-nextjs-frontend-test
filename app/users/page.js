'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { CircularProgress, Alert } from '@mui/material';
import { Container, HeaderContainer } from './UsersPage.styles';
import { maskEmail } from './UsersPage.utils';
import { useFetchUsers, useInactiveTimeout } from './UsersPage.hooks';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { toggleEmailMask } from '../../store/UserSlice';
import SearchBar from './SearchBar';
import SignOut from './SignOut';
import Pagination from './Pagination';

export default function Users() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { loading, error, totalPages } = useFetchUsers(page);
  useInactiveTimeout();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.users);
  const maskedEmails = useSelector((state) => state.user.maskedEmails);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // filter the user based on the first or last name's first character
  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().startsWith(search.toLowerCase()) ||
    user.last_name.toLowerCase().startsWith(search.toLowerCase())
  );

  // table columns
  const columns = [
    { field: 'first_name', headerName: 'First Name', width: 150 },
    { field: 'last_name', headerName: 'Last Name', width: 150 },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      renderCell: (params) => (
        maskedEmails[params.row.id] ? params.value : maskEmail(params.value)
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <button onClick={() => dispatch(toggleEmailMask(params.row.id))}>
          {maskedEmails[params.row.id] ? 'Hide' : 'Show'} Email
        </button>
      ),
    },
  ];

  // list the user data into rows
  const rows = filteredUsers.map((user) => ({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  }));

  return (
    <div>
      <Header />
      <Container>
        <HeaderContainer>
          <SearchBar search={search} handleSearch={handleSearch} />
          <SignOut />
        </HeaderContainer>
        {error && <Alert severity="error">{error}</Alert>}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress />
          </div>
        ) : (
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 20, 50]}
              components={{ Toolbar: GridToolbar }}
              checkboxSelection
            />
          </div>
        )}
        <Pagination page={page} totalPages={totalPages} handlePageChange={handlePageChange} />
      </Container>
      <Footer />
    </div>
  );
}