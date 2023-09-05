'use client';

import NavBar from '@/app/components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UserProfile({ params }: any) {
  const router = useRouter();
  const logout = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        router.push('/login');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <NavBar />
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile</h1>
        <p className='text-2xl'>{params.username}&apos;s Profile </p>
        <Link onClick={logout} href={'/login'}>
          Logout
        </Link>
      </div>
    </>
  );
}
