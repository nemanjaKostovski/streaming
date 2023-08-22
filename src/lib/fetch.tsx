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

export { getTrendingMovies };
