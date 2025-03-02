'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUsers } from '../../store/UserSlice';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const useFetchUsers = (page) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        // fetch the users data from external api
        const response = await axios.get(`${process.env.NEXT_PUBLIC_EXTERNAL_API}?page=${page}`);

        // filter user data based on the first and last name's first character
        const filteredUsers = response.data.data.filter(
          (user) => user.first_name.startsWith('G') || user.last_name.startsWith('W')
        );
        dispatch(setUsers(filteredUsers));
        setTotalPages(response.data.total_pages);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page, dispatch]);

  return { loading, error, totalPages };
};

export const useInactiveTimeout = () => {
  const { data: session } = useSession();
  const inactiveTimeoutRef = useRef(null);
  const sessionRef = useRef(session);
  const router = useRouter();

  useEffect(()=>{
      sessionRef.current = session;
  },[session]);

  useEffect(() => {
    if (!session) {
      router.push('/');
    } else {
      resetInactiveTimeout();

      const handleActivity = () => resetInactiveTimeout();

      window.addEventListener('mousemove', handleActivity);
      window.addEventListener('keydown', handleActivity);

      return () => {
        window.removeEventListener('mousemove', handleActivity);
        window.removeEventListener('keydown', handleActivity);
        clearTimeout(inactiveTimeoutRef.current);
      };
    }
  }, [session, router]);

  // signout when user is inactive
  const resetInactiveTimeout = () => {
    clearTimeout(inactiveTimeoutRef.current);
    inactiveTimeoutRef.current = setTimeout(() => {
      if(sessionRef.current){
        signOut();
      }
    }, 30000);
  };

  return {};
};