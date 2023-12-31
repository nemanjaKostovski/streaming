'use client';

import { searchMovieByTitle, getUpcomingMovies } from '@/lib/fetch';
import { useEffect, useState, ChangeEvent } from 'react';
import useDebounce from '../components/useDebounce';
import Image from 'next/image';
import NavBar from '../components/Navbar';
import Link from 'next/link';
import MoviePosterCard from '../components/MoviePosterCard';

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
    <div className='overflow-hidden'>
      <NavBar />
      <div className='p-4 sm:ml-12 sm:mr-12'>
        <input
          type='text'
          placeholder='What are you looking for?'
          className='w-full h-14 bg-gray-900 rounded p-2 text-white'
          value={searchInput}
          onInput={handleInputChange}
        />
      </div>
      <div className='flex flex-row overflow-x-scroll sm:ml-12 sm:mr-12'>
        {searchMovies
          .filter((movie: Movie) => movie.poster_path)
          .map((movie: Movie) => (
            <MoviePosterCard
              key={movie.id}
              id={movie.id}
              title={movie.original_title}
              poster={movie.poster_path}
            />
          ))}
      </div>
      <h2 className='pl-4 mb-2 mt-56 text-xl 4xl:mt-96 sm:ml-12 sm:mr-12 text-white'>
        In demand
      </h2>
      <div className='ml-4 flex flex-row overflow-x-auto sm:ml-12 sm:mr-12'>
        {upcomingMovies.map((movie: Movie) => (
          <MoviePosterCard
            key={movie.id}
            id={movie.id}
            title={movie.original_title}
            poster={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
};
export default Search;
