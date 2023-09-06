'use client';

import NavBar from '@/app/components/Navbar';
import { getMovieById, getRecommendedMovies } from '@/lib/fetch';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Movie = {
  id: number;
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  runtime: number;
  release_date: string;
};

const Movie = ({ params }: { params: { id: number } }) => {
  const id = params.id;
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    (async () => {
      if (id) {
        try {
          const details = await getMovieById(id as unknown as number);
          const recommended = await getRecommendedMovies(id);
          setMovieDetails(details);
          setRecommendedMovies(recommended.results);
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

      <div className='absolute top-0 z-10 w-screen sm:w-auto h-60 sm:h-screen mb-60'>
        <Image
          key={movieDetails.id}
          src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
          width={1640}
          height={923}
          className='hidden sm:block sm:w-screen sm:h-full w-full pl-4 sm:pl-0 pr-4 sm:pr-0 bg-gradient-to-b'
          priority
          alt={movieDetails.original_title}
        />
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent opacity-70 to-opacity-90 to-black'></div>

        <Image
          src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
          className='sm:hidden w-screen h-screen'
          width={384}
          height={576}
          alt={movieDetails.original_title}
          key={movieDetails.id}
        />
        <h2 className='hidden title sm:inline absolute bottom-80 rounded-sm text-white text-xl sm:text-2xl lg:text-4xl decoration-wavy font-bold p-2'>
          {movieDetails.original_title}
        </h2>
        <p className='hidden w-1/2 sm:inline absolute bottom-72 rounded-sm text-white p-2'>
          {movieDetails.runtime} min.{' '}
          {movieDetails.release_date.substring(0, 4)}
        </p>
        <button className='hidden w-16 sm:block absolute bottom-52 rounded-full text-white p-2 text-4xl border-white border-2 hover:text-gray-400'>
          ▶
        </button>
        <p className='hidden w-1/2 sm:inline absolute bottom-16 rounded-sm text-white p-2'>
          {movieDetails.overview}
        </p>
      </div>
      <div className='pt-96 mt-96'></div>
      <h2 className='pl-4 2xl:mt-32 mb-2 text-xl 4xl:mt-96 sm:ml-12 sm:mr-12'>
        Recommended
      </h2>
      <div className='flex flex-row overflow-x-scroll sm:ml-12 sm:mr-12'>
        {recommendedMovies
          .filter((movie: Movie) => movie.poster_path)
          .map((movie: { poster_path: string; title: string; id: string }) => (
            <Link href={`/movies/${movie.id}`} key={movie.id}>
              <div className='w-80 h-full'>
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  className='pr-2'
                  width={300}
                  height={450}
                  alt={movie.title}
                />
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
export default Movie;
