const { gql } = require('apollo-server-express');



const typeDefs = gql`
  type Potato {
    isPotato: Boolean
  }
  type Query {
    potatoAuth: Potato
  }
`;

const resolvers = {
  Query: {
    potatoAuth: () => ({ 'isPotato': true }),
  },
};

module.exports = {
  resolvers,
  typeDefs,
};
