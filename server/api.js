const fetch = require("node-fetch");
const url = require("url");

async function fetchFromApi(path, query = {}) {
  const requestUrl = url.format({
    protocol: "https",
    hostname: "api.themoviedb.org",
    pathname: `/3${path}`,
    query: {
      api_key: process.env.TOKEN,
      ...query
    }
  });
  console.info(`load ${requestUrl}`);
  const res = await fetch(requestUrl);
  if (res.status !== 200) {
    throw new Error(`Status is ${res.status}`);
  }
  return res.json();
}

module.exports = {
  fetchFromApi
};
