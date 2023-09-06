import Link from 'next/link';
import Image from 'next/image';

type MoviePosterCard = {
  id: number;
  title: string;
  poster: string;
};

const MoviePosterCard = ({ id, title, poster }: MoviePosterCard) => {
  return (
    <Link href={`/movies/${id}`}>
      <div className='w-max h-full p-1 pr-1'>
        <Image
          src={`https://image.tmdb.org/t/p/original${poster}`}
          className='border-2 border-transparent rounded hover:border-indigo-600 opacity-90 hover:opacity-100'
          width={300}
          height={450}
          alt={title}
        />
      </div>
    </Link>
  );
};
export default MoviePosterCard;
