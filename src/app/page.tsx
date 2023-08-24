'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getTrendingMovies } from '@/lib/fetch';
import { useEffect, useState } from 'react';

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    async function fetchTrendingMovies() {
      const data = await getTrendingMovies();
      setTrendingMovies(data.results);
    }

    fetchTrendingMovies();
  }, []);

  const handleClickPrev = () => {};

  const handleClickNext = () => {};

  if (!trendingMovies) return <p>Loading...</p>;

  return (
    <main>
      <h2 className='pl-4 text-xl'>Trending Movies today</h2>
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
                priority
              />
            );
          }
        )}
      </div>
    </main>
  );
}
