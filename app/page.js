'use client';

import React from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (!session) {
      // when there's no session alive display sso google button
      signIn('google');
    } else {
      // when session is alive redirect to /users page
      router.push('/users');
    }
  }, [session, status, router]);

  return <div>Loading...</div>;
}