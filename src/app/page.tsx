'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getTrendingMovies, getTrendingMoviesWeek } from '@/lib/fetch';
import { useEffect, useState } from 'react';
import Carousel from '@/app/components/Carousel';
import NavBar from '@/app/components/Navbar';
import MoviePosterCard from './components/MoviePosterCard';

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingMoviesWeek, setTrendingMoviesWeek] = useState([]);

  useEffect(() => {
    async function fetchTrendingMovies() {
      const data = await getTrendingMovies();
      const weeklyData = await getTrendingMoviesWeek();

      setTrendingMovies(data.results);
      setTrendingMoviesWeek(weeklyData.results);
    }

    fetchTrendingMovies();
  }, []);

  if (!trendingMovies) return <p>Loading...</p>;

  return (
    <main className=''>
      <NavBar />
      <div className='absolute top-0 z-10 w-screen sm:w-auto h-60 sm:h-screen mb-60'>
        <Carousel>
          {trendingMoviesWeek.map(
            (movie: {
              backdrop_path: string;
              poster_path: string;
              title: string;
              id: string;
            }) => (
              <div className='relative animate' key={movie.id}>
                <div className='absolute top-80 left-0 w-full h-full bg-gradient-to-b from-transparent opacity-100 to-black'></div>
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  width={1640}
                  height={923}
                  className='hidden sm:block sm:w-screen sm:h-screen w-full pl-4 sm:pl-0 pr-4 sm:pr-0 bg-gradient-to-b from-transparent to-black'
                  priority
                />

                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  className='sm:hidden w-screen h-screen bg-gradient-to-b'
                  width={384}
                  height={576}
                  alt={movie.title}
                  key={movie.id}
                />
                <Link href={`/movies/${movie.id}`}>
                  <h3 className='title inline absolute left-4 mr-4 bottom-20 rounded-sm text-white sm:text-2xl lg:text-4xl decoration-wavy font-bold p-2'>
                    {movie.title}
                  </h3>
                </Link>
              </div>
            )
          )}
        </Carousel>
      </div>
      <div className='pt-96 mt-96 xl:mt-[500px] 4xl:mt-[1100px]'>
        <h2 className='pl-4 mt-32 mb-2 text-xl 4xl:mt-96 sm:ml-12 sm:mr-12 text-white'>
          Trending Movies today
        </h2>
        <div className='flex flex-row overflow-x-scroll sm:ml-12 sm:mr-12'>
          {trendingMovies.map(
            (movie: { poster_path: string; title: string; id: number }) => {
              return (
                <MoviePosterCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  poster={movie.poster_path}
                />
              );
            }
          )}
        </div>
      </div>
    </main>
  );
}
