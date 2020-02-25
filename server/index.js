require('dotenv').config()
const path = require('path')
const fs = require('fs')
const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const resolvers = require('./resolvers')
const gql = require('graphql-tag')

const typeDefs = fs.readFileSync(path.resolve(__dirname, 'typeDefs.gql'))

const app = express()

const apollo = new ApolloServer({
  typeDefs: gql`
    ${typeDefs}
  `,
  resolvers,
})

apollo.applyMiddleware({ app })
app.listen({ port: 4000 })
console.log('running on http://localhost:4000/graphql')
