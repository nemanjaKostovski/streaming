import Link from 'next/link';

const Movies = () => {
  return (
    <div>
      {' '}
      <Link
        href='/'
        className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] text-gray-400 hover:dark:text-white'
      >
        Home
      </Link>
      Movies
    </div>
  );
};
export default Movies;
