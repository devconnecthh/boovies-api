const { fetchFromApi } = require('./api')

const MOVIE_SORTINGS = {
  POPULARITY_DESC: 'popularity.desc',
  POPULARITY_ASC: 'popularity.asc',
  RELEASE_DATE_ASC: 'release_date.asc',
  RELEASE_DATE_DESC: 'release_date.desc',
  REVENUE_ASC: 'revenue.asc',
  REVENUE_DESC: 'revenue.desc',
  PRIMARY_RELEASE_DATE_ASC: 'primary_release_date.asc',
  PRIMARY_RELEASE_DATE_DESC: 'primary_release_date.desc',
  ORIGINAL_TITLE_ASC: 'original_title.asc',
  ORIGINAL_TITLE_DESC: 'original_title.desc',
  VOTE_AVERAGE_ASC: 'vote_average.asc',
  VOTE_AVERAGE_DESC: 'vote_average.desc',
  VOTE_COUNT_ASC: 'vote_count.asc',
  VOTE_COUNT_DESC: 'vote_count.desc',
}

const MOVIE_URL_BASE = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/'

const GENRES_PROMISE = fetchFromApi('/genre/movie/list').then(
  json => json.genres,
)

function convertMovie(movie) {
  return {
    ...movie,
    poster_path: `${MOVIE_URL_BASE}${movie.poster_path}`,
    backdrop_path: `${MOVIE_URL_BASE}${movie.backdrop_path}`,
    genre_names: async () => {
      return (await GENRES_PROMISE)
        .filter(({ id }) => movie.genre_ids.includes(id))
        .map(({ name }) => name)
    },
  }
}

const Query = {
  movies: async (_, { sort, filter = {} }) => {
    const sortBy = MOVIE_SORTINGS[sort || 'POPULARITY_DESC']
    const json = await fetchFromApi(`/discover/movie`, {
      sort_by: sortBy,
      primary_release_year: filter.year,
      with_genres: filter.genres ? filter.genres.join(',') : null,
    })
    return json.results.filter(Boolean).map(convertMovie)
  },
  movie: async (_, { id }) => {
    const json = await fetchFromApi(`/movie/${id}`)
    return convertMovie(json)
  },
  genres: async () => {
    return GENRES_PROMISE
  },
}

module.exports = {
  Query,
}
