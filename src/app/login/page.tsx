'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Login success', data);
        router.push('/');
      } else {
        const errorData = await response.json();
        console.log('Login failed', errorData.error);
      }
    } catch (error: any) {
      console.log('Login failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div className='flex flex-col items-center justify-center w-96 h-96 border-2 border-indigo-200 dark:border-indigo-600 rounded-lg'>
        <h1 className='text-2xl mb-2'>{loading ? 'Processing' : 'Login'}</h1>

        <label htmlFor='email' className='text-xl'>
          Email:{' '}
        </label>
        <input
          type='email'
          id='email'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder='email'
          className='p-2 border border-gray-300 rounded-lg mb-4 focus: outline-none focus:border-gray-600 text-black'
        />

        <label htmlFor='password' className='text-xl'>
          Password:{' '}
        </label>
        <input
          type='password'
          id='password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder='password'
          className='p-2 border border-gray-300 rounded-lg mb-4 focus: outline-none focus:border-gray-600 text-black'
        />

        <button
          onClick={onLogin}
          className='p-2 px-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-indigo-200 hover:bg-indigo-300 dark:bg-indigo-500 dark:hover:bg-indigo-700 text-black'
          disabled={buttonDisabled}
        >
          Login
        </button>
        <Link
          className='hover:text-indigo-200 focus:text-indigo-500'
          href='/signup'
        >
          Go to signup for new users
        </Link>
      </div>
    </div>
  );
}
