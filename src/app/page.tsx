'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getTrendingMovies } from '@/lib/fetch';
import { useEffect, useState } from 'react';
import { Carousel } from '@material-tailwind/react';

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    async function fetchTrendingMovies() {
      const data = await getTrendingMovies();
      setTrendingMovies(data.results);
    }

    fetchTrendingMovies();
  }, []);

  if (!trendingMovies) return <p>Loading...</p>;

  return (
    <main className='overflow-hidden'>
      <div className='absolute top-0 z-10 w-full sm:w-auto h-60 sm:h-screen pr-10 mb-60'>
        <Carousel
          transition={{ duration: 1 }}
          className='flex overflow-hidden w-screen sm:w-auto relative'
        >
          {trendingMovies.map(
            (movie: { backdrop_path: string; title: string; id: string }) => (
              <div className='relative' key={movie.id}>
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  width={1640}
                  height={923}
                  className='sm:w-auto sm:h-auto w-full pl-4 sm:pl-0 pr-4 sm:pr-0'
                  priority
                />
                <h3 className='title absolute left-4 bottom-40 mix-blend-exclusion text-white text-xl sm:text-2xl lg:text-4xl decoration-wavy font-bold p-2'>
                  {movie.title}
                </h3>
              </div>
            )
          )}
        </Carousel>
      </div>
      <div className='pt-96 mt-96'>
        <h2 className='pl-4 mt-32 mb-2 text-xl'>Trending Movies today</h2>
        <div className='flex flex-row overflow-x-scroll'>
          {trendingMovies.map(
            (movie: { poster_path: string; title: string; id: string }) => {
              return (
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  className='pr-4'
                  width={300}
                  height={450}
                  alt={movie.title}
                  key={movie.id}
                />
              );
            }
          )}
        </div>
      </div>
    </main>
  );
}
