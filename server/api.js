const fetch = require("node-fetch");
const THE_MOVIE_DB_API_URL = "https://api.themoviedb.org/4";

async function fetchFromApi(request) {
  const res = await fetch(`${THE_MOVIE_DB_API_URL}${request}`, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`
    }
  });
  if (res.status !== 200) {
    throw new Error(`Status is ${res.status}`);
  }
  return res.json();
}

module.exports = {
  fetchFromApi
}
