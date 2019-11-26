const { fetchFromApi } = require("./api");

const MOVIE_SORTINGS = {
  POPULARITY_DESC: "popularity.desc",
  POPULARITY_ASC: "popularity.asc"
};

const Query = {
  hello: () => "World!",
  discoverMovies: async (_, { sort }) => {
    const sortBy = MOVIE_SORTINGS[sort || "POPULARITY_DESC"];
    const json = await fetchFromApi(`/discover/movie?sort_by=${sortBy}`);
    return json.results.filter(Boolean);
  }
};

module.exports = {
  Query
};
