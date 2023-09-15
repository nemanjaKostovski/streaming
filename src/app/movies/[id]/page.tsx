'use client';

import MoviePosterCard from '@/app/components/MoviePosterCard';
import NavBar from '@/app/components/Navbar';
import {
  getMovieById,
  getRecommendedMovies,
  getMovieTrailers,
} from '@/lib/fetch';
import { Carousel } from '@material-tailwind/react';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

type Movie = {
  id: number;
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  runtime: number;
  release_date: string;
};

type Trailer = {
  id: string;
  key: string;
};

const Movie = ({ params }: { params: { id: number } }) => {
  const id = params.id;
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [displayTrailers, setDisplayTrailers] = useState(false);

  const overlayClass = displayTrailers
    ? 'fixed inset-0 z-20 bg-opacity-50'
    : '';

  useEffect(() => {
    (async () => {
      if (id) {
        try {
          const details = await getMovieById(id as unknown as number);
          const recommended = await getRecommendedMovies(id);
          setMovieDetails(details);
          setRecommendedMovies(recommended.results);
          const trailersList = await getMovieTrailers(id as unknown as number);
          setTrailers(trailersList.results);
        } catch (error) {
          console.error('Error fetching movie details: ', error);
        }
      }
    })();
  }, [id]);

  const showTrailers = () => {
    setDisplayTrailers((current) => !current);
  };

  if (!movieDetails) {
    return <p>Loading movie details...</p>;
  }
  return (
    <div>
      <div className={overlayClass}></div>
      <NavBar />

      <div className='absolute top-0 z-10 w-auto h-screen mb-60'>
        <Image
          key={movieDetails.id}
          src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
          width={1640}
          height={923}
          className='hidden sm:block sm:w-screen sm:h-full w-full pl-4 sm:pl-0 pr-4 sm:pr-0 bg-gradient-to-b'
          priority
          alt={movieDetails.original_title}
        />
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent opacity-60 to-black'></div>

        <Image
          src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
          className='sm:hidden w-screen h-screen'
          width={384}
          height={576}
          alt={movieDetails.original_title}
          key={movieDetails.id + movieDetails.original_title}
        />
        <div className='absolute bottom-0 flex flex-col w-full'>
          <h2 className='hidden title sm:inline rounded-sm text-white text-xl sm:text-2xl lg:text-4xl decoration-wavy font-bold p-2'>
            {movieDetails.original_title}
          </h2>
          <p className='w-full wsm:w-1/2 sm:inline rounded-sm text-white p-2 4xl:text-2xl mb-2'>
            {movieDetails.runtime} min.{' '}
            {movieDetails.release_date.substring(0, 4)}
          </p>
          <button
            className='w-16 sm:block rounded-full text-white p-2 text-4xl border-white border-2 hover:text-gray-400 hover:border-indigo-600 ml-2 pr-1'
            onClick={showTrailers}
          >
            ▶
          </button>
          <p className='w-full sm:w-1/2 sm:inline rounded-sm text-white text-justify p-2 4xl:text-2xl'>
            {movieDetails.overview}
          </p>
        </div>
      </div>
      <div className='pt-96 mt-96'></div>
      <div className='hidden 4xl:block 4xl:h-96 xl:block xl:h-60'></div>
      <h2 className='pl-4 2xl:mt-32 mb-2 text-xl 4xl:mt-96 sm:ml-12 sm:mr-12 text-white'>
        Recommended
      </h2>
      <div className='flex flex-row overflow-x-scroll sm:ml-12 sm:mr-12'>
        {recommendedMovies
          .filter((movie: Movie) => movie.poster_path)
          .map((movie: { poster_path: string; title: string; id: number }) => (
            <MoviePosterCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster={movie.poster_path}
            />
          ))}
      </div>
      {displayTrailers && (
        <div
          className={
            'sm:w-5/6 sm:h-4/6 w-full h-1/2 bg-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 appearance-none '
          }
        >
          <button
            className='absolute z-30 top-0 right-0 text-2xl hover:opacity-80'
            onClick={showTrailers}
          >
            ✖️
          </button>
          <Carousel>
            {trailers.map((trailer: Trailer) => (
              <iframe
                className='w-full h-full opacity-100'
                key={trailer.id}
                id='video'
                src={`https://www.youtube.com/embed/${trailer.key}`}
                allowFullScreen
                // mute={displayTrailers ? 0 : 1}
              ></iframe>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};
export default Movie;
