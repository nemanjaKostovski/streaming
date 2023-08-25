import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className='flex flex-row justify-between h-20 p-4 top-0 sticky z-20 bg-transparent'>
      <Link
        className='relative text-black hover:text-white pr-4 font-bold'
        href='/movies'
      >
        Movies
      </Link>
      <Link href='/'>
        <h1 className='relative text-black hover:text-white sm:text-4xl font-extrabold'>
          StreamingMAX
        </h1>
      </Link>
      <p className='text-black hover:text-white'>Login</p>
    </nav>
  );
}
