'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Signup success', data);
        router.push('/login');
      } else {
        const errorData = await response.json();
        console.log('Signup failed', errorData.error);
      }
    } catch (error: any) {
      console.error('Signup failed', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div className='flex flex-col items-center justify-center w-96 h-96 border-2 border-indigo-200 dark:border-indigo-600 rounded-lg'>
        <h1 className='text-2xl mb-2'>{loading ? 'Processing' : 'Signup'}</h1>
        <label htmlFor='username' className='text-xl text-left'>
          Username:{' '}
        </label>
        <input
          type='text'
          id='username'
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder='username'
          className='p-2 border border-gray-300 rounded-lg mb-4 focus: outline-none focus:border-gray-600 text-black'
        />

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
          onClick={onSignup}
          className='p-2 px-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-indigo-200 hover:bg-indigo-300 dark:bg-indigo-500 dark:hover:bg-indigo-700'
          disabled={buttonDisabled}
        >
          Signup
        </button>
        <Link
          className='hover:text-indigo-200 focus:text-indigo-500'
          href='/login'
        >
          Go to login for existing users
        </Link>
      </div>
    </div>
  );
}
