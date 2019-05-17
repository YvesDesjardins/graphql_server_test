const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const { feed } = require('./resolvers/Query')

const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed,
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      });
    },
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    };
  },
});

server.start(()=> console.log(`Server is running on http://localhost:4000`));
