const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Potato {
    isPotato: Boolean
  }
  type Query {
	potatoQuery: Potato
  }
  type Mutation {
    potatoAuth: Potato
    potatoPubCred: Potato
  }
`;

const resolvers = {
  Query: {
    potatoQuery: () => ({ isPotato: true }),
  },
  Mutation: {
    potatoAuth: () => ({ isPotato: true }),
    potatoPubCred: () => ({ isPotato: true }),
  },
};

module.exports = {
  resolvers,
  typeDefs,
};
