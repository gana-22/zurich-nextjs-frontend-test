/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Users from './page';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { SessionProvider } from 'next-auth/react';
import { mockSession, useSession } from '../../__mocks__/next-auth';
import { setUsers } from '../../store/UserSlice';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('./UsersPage.hooks', () => ({
  useFetchUsers: jest.fn(() => ({
    loading: false,
    error: null,
    totalPages: 5,
  })),
  useInactiveTimeout: jest.fn(),
}));

describe('Users Component', () => {
  beforeEach(() => {
    useSession.mockReturnValue({ data: mockSession, status: 'authenticated' });
  });

  it('renders the users list', async () => {
    store.dispatch(setUsers([{ id: 1, first_name: 'George', last_name: 'Washington', email: 'george@example.com' }]));
    render(
      <Provider store={store}>
        <SessionProvider session={mockSession}>
          <Users />
        </SessionProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Zurich Customer Portal/i })).toBeInTheDocument();
      expect(screen.getByText('George')).toBeInTheDocument();
    });
  });

  it('filters users based on search input', async () => {
    store.dispatch(setUsers([
      { id: 1, first_name: 'George', last_name: 'Washington', email: 'george@example.com' },
      { id: 2, first_name: 'John', last_name: 'Wick', email: 'john@example.com' },
    ]));

    render(
      <Provider store={store}>
        <SessionProvider session={mockSession}>
          <Users />
        </SessionProvider>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText(/Search by first or last name/i);
    fireEvent.change(searchInput, { target: { value: 'George' } });

    await waitFor(() => {
      expect(screen.getByText('George')).toBeInTheDocument();
      expect(screen.queryByText('John')).not.toBeInTheDocument();
    });
  });

  it('toggles email masking', async () => {
    store.dispatch(setUsers([{ id: 1, first_name: 'George', last_name: 'Washington', email: 'george@example.com' }]));

    render(
      <Provider store={store}>
        <SessionProvider session={mockSession}>
          <Users />
        </SessionProvider>
      </Provider>
    );

    await waitFor(() => {
      const showEmailButton = screen.getAllByRole('button', { name: /Show Email/i })[0];
      fireEvent.click(showEmailButton);
      expect(screen.getByText('george@example.com')).toBeInTheDocument();
    });
  });

  it('navigates to the login page if not authenticated', async () => {
    const push = jest.fn();
    useRouter.mockReturnValue({ push });
    useSession.mockReturnValue({ data: null, status: 'unauthenticated' });

    render(
      <Provider store={store}>
        <SessionProvider session={null}>
          <Users />
        </SessionProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/login');
    });
  });
});