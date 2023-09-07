'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getTrendingMovies, getTrendingMoviesWeek } from '@/lib/fetch';
import { useEffect, useState } from 'react';
import { Carousel } from '@material-tailwind/react';
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
    <main className='overflow-hidden'>
      <NavBar />
      <div className='absolute top-0 z-10 w-screen sm:w-auto h-60 sm:h-screen mb-60'>
        <Carousel
          transition={{ duration: 1 }}
          autoplay={true}
          className='flex overflow-hidden w-screen sm:w-auto relative h-screen 4xl:h-10/12'
        >
          {trendingMoviesWeek.map(
            (movie: {
              backdrop_path: string;
              poster_path: string;
              title: string;
              id: string;
            }) => (
              <div className='relative' key={movie.id}>
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  width={1640}
                  height={923}
                  className='hidden sm:block sm:w-screen sm:h-screen w-full pl-4 sm:pl-0 pr-4 sm:pr-0'
                  priority
                />
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  className='sm:hidden w-screen h-screen'
                  width={384}
                  height={576}
                  alt={movie.title}
                  key={movie.id}
                />
                <Link href={`/movies/${movie.id}`}>
                  <h3 className='hidden title sm:inline absolute left-4 bottom-20 bg-black rounded-sm text-white text-xl sm:text-2xl lg:text-4xl decoration-wavy font-bold p-2'>
                    {movie.title}
                  </h3>
                </Link>
              </div>
            )
          )}
        </Carousel>
      </div>
      <div className='pt-96 mt-96'>
        <div className='hidden 4xl:block 4xl:h-96 xl:block xl:h-48'></div>
        <div className='hidden 4xl:block 4xl:h-96'></div>
        <h2 className='pl-4 mt-32 mb-2 text-xl 4xl:mt-96 sm:ml-12 sm:mr-12'>
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
