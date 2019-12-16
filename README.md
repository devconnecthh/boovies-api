# Boovies API
_This project provides a GraphQL API of The Movie Db (https://developers.themoviedb.org/3/getting-started)._

## Requirements

You'll need an API token to access The Movie Db.

1. Sign up at https://www.themoviedb.org/account/signup
2. Ask for an access token at https://www.themoviedb.org/settings/api <br />(see https://developers.themoviedb.org/3/getting-started/introduction)
3. Copy the access token (v4 auth) from https://www.themoviedb.org/settings/api
4. Paste the access token into a `.env` file <br />`TOKEN=$token`


## Setup

```
npm ci

# run and automatically refresh
npm run serve

# start
npm run start
```

_Project setup taken from https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express#express_
