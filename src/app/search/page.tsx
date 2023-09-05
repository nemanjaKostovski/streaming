'use client';

import { searchMovieByTitle, getUpcomingMovies } from '@/lib/fetch';
import { useEffect, useState, ChangeEvent } from 'react';
import useDebounce from '../components/useDebounce';
import Image from 'next/image';
import NavBar from '../components/Navbar';
import Link from 'next/link';

type Movie = {
  original_title: string;
  id: number;
  poster_path: string;
};

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchMovies, setSearchMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const debouncedSearchQuery = useDebounce(searchInput, 400);

  useEffect(() => {
    (async () => {
      const movieQuery = await searchMovieByTitle(debouncedSearchQuery);
      setSearchMovies(movieQuery.results);
    })();
  }, [debouncedSearchQuery]);

  useEffect(() => {
    (async () => {
      const newMovies = await getUpcomingMovies();
      setUpcomingMovies(newMovies.results);
    })();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  return (
    <>
      <NavBar />
      <div className='p-4 sm:ml-12 sm:mr-12'>
        <input
          type='text'
          placeholder='What are you looking for?'
          className='w-full h-14 bg-gray-900 rounded p-2'
          value={searchInput}
          onInput={handleInputChange}
        />
      </div>
      <div className='flex flex-row overflow-x-scroll sm:ml-12 sm:mr-12'>
        {searchMovies
          .filter((movie: Movie) => movie.poster_path)
          .map((movie: Movie) => (
            <Link href={`/movies/${movie.id}`} key={movie.id}>
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                width={100}
                height={100}
                alt={movie.original_title}
              />
            </Link>
          ))}
      </div>
      <h2 className='pl-4 mb-2 mt-56 text-xl 4xl:mt-96 sm:ml-12 sm:mr-12'>
        Upcoming movies
      </h2>
      <div className='ml-4 flex flex-row overflow-x-auto sm:ml-12 sm:mr-12'>
        {upcomingMovies.map((movie: Movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`}>
            <div className='w-80 h-full pr-4'>
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                width={300}
                height={450}
                alt={movie.original_title}
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
export default Search;
