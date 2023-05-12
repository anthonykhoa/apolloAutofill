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

const isPotato = { isPotato: true }

const resolvers = {
  Query: {
    potatoQuery: () => isPotato,
  },
  Mutation: {
    potatoAuth: () => {
      console.log('huh')
      return isPotato
    },
    potatoPubCred: () => isPotato,
  },
};

module.exports = {
  resolvers,
  typeDefs,
};
