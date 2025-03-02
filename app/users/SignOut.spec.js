import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import SignOut from './SignOut';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));

describe('SignOut Component', () => {
  let push;

  beforeEach(() => {
    push = jest.fn();
    useRouter.mockReturnValue({ push });
    signOut.mockResolvedValue(); // Mock signOut to resolve immediately
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Sign Out button', () => {
    render(<SignOut />);
    expect(screen.getByRole('button', { name: /Sign Out/i })).toBeInTheDocument();
  });

  it('calls signOut and redirects to /login when the button is clicked', async () => {
    render(<SignOut />);
    const signOutButton = screen.getByRole('button', { name: /Sign Out/i });

    fireEvent.click(signOutButton);

    await waitFor(() => {
      expect(signOut).toHaveBeenCalledWith({ callbackUrl: '/login' });
      expect(push).toHaveBeenCalledWith('/login');
    });
  });

  it('correctly uses useRouter and signOut hooks', ()=>{
    render(<SignOut />);
    expect(useRouter).toHaveBeenCalled();
    expect(signOut).not.toHaveBeenCalled();
  });
});