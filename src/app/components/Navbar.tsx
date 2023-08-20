import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className='flex flex-row justify-between h-20 p-4'>
      <div>
        {' '}
        <Link
          className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] text-gray-400 hover:dark:text-white pr-4'
          href='/movies'
        >
          Movies
        </Link>
        <Link
          className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] text-gray-400 hover:dark:text-white'
          href='/series'
        >
          Series
        </Link>
      </div>

      <h1 className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] text-gray-400 text-4xl'>
        StreamingMAX
      </h1>
      <p>Login</p>
    </nav>
  );
}
