'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SignOutButton } from './UsersPage.styles';

export default function SignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    // Redirect to login after sign out
    await signOut({ callbackUrl: '/login' }); 

    // double check redirect
    router.push('/login');
  };

  return <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>;
}