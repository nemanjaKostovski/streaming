const URL = 'https://api.themoviedb.org';
const VERSION = '/3';

async function getTrendingMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
    },
  };

  const response = await fetch(
    `${URL}${VERSION}/trending/movie/day?language=en-US`,
    options
  );
  if (response.status !== 200) {
    throw new Error(`Fetch failed ${response.status}`);
  }

  const data = await response.json();
  return data;
}

async function getTrendingMoviesWeek() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
    },
  };

  const response = await fetch(
    `${URL}${VERSION}/trending/movie/week?language=en-US`,
    options
  );
  if (response.status !== 200) {
    throw new Error(`Fetch failed ${response.status}`);
  }

  const data = await response.json();
  return data;
}

async function searchMovieByTitle(query: string) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
    },
  };

  const response = await fetch(
    `${URL}${VERSION}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  if (response.status !== 200) {
    throw new Error(`Fetch failed ${response.status}`);
  }

  const data = await response.json();
  return data;
}

async function getUpcomingMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
    },
  };

  const response = await fetch(
    'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
    options
  );
  if (response.status !== 200) {
    throw new Error(`Fetch failed ${response.status}`);
  }

  const data = await response.json();
  return data;
}

async function getMovieById(id: number) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
    },
  };

  const response = await fetch(
    `${URL}${VERSION}/movie/${id}?language=en-US`,
    options
  );
  if (response.status !== 200) {
    throw new Error(`Fetch failed ${response.status}`);
  }

  const data = await response.json();
  return data;
}

async function getRecommendedMovies(id: number) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
    },
  };

  const response = await fetch(
    `${URL}${VERSION}/movie/${id}/recommendations?language=en-US&page=1`,
    options
  );
  if (response.status !== 200) {
    throw new Error(`Fetch failed ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export {
  getTrendingMovies,
  getTrendingMoviesWeek,
  searchMovieByTitle,
  getUpcomingMovies,
  getMovieById,
  getRecommendedMovies,
};
