'use client';

import NavBar from '@/app/components/Navbar';
import { getMovieById } from '@/lib/fetch';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Movie = {
  id: number;
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  runtime: number;
};

const Movie = ({ params }: { params: { id: number } }) => {
  const id = params.id;
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);

  useEffect(() => {
    (async () => {
      if (id) {
        try {
          const details = await getMovieById(id as unknown as number);
          setMovieDetails(details);
        } catch (error) {
          console.error('Error fetching movie details: ', error);
        }
      }
    })();
  }, [id]);

  if (!movieDetails) {
    return <p>Loading movie details...</p>;
  }
  return (
    <div>
      <NavBar />
      <div>
        <h3>{movieDetails.original_title}</h3>
      </div>

      <Image
        key={movieDetails.id}
        src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
        width={1640}
        height={923}
        className='hidden sm:block sm:w-screen sm:h-5/6 w-full pl-4 sm:pl-0 pr-4 sm:pr-0 bg-gradient-to-b'
        priority
        alt={movieDetails.original_title}
      />
      <Image
        src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
        className='sm:hidden w-screen h-screen'
        width={384}
        height={576}
        alt={movieDetails.original_title}
        key={movieDetails.id}
      />
    </div>
  );
};
export default Movie;
