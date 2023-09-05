import Link from 'next/link';
import Image from 'next/image';

//passing a user prop later for link switch from Login to profile
export default function NavBar() {
  return (
    <nav className='flex flex-row justify-between h-20 p-4 top-0 sticky z-20 bg-transparent sm:ml-12 sm:mr-12'>
      <Link href='/search'>
        <Image src='/searching.png' alt='🔍' width={40} height={40} />
      </Link>

      <Link href='/'>
        <h1 className='relative text-white hover:text-gray-200 sm:text-4xl font-extrabold px-4'>
          StreamingMAX
        </h1>
      </Link>

      {/* {user ? (
        <Link href={`/profile/${user.username}`}>
          <span className='text-white hover:text-gray-200 font-bold text-xl'>
            {user.username}
          </span>
        </Link>
      ) : ( */}
      <Link
        href='/login'
        className='text-white hover:text-gray-200 font-bold text-xl'
      >
        Login
      </Link>
      {/* )} */}
    </nav>
  );
}
