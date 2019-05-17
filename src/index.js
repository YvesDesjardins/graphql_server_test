const { GraphQLServer } = require('graphql-yoga');

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}];

const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${ links.length }`,
        description: args.description,
        url: args.url,
      };
      links.push(link);

      return link;
    },
    updateLink: (parent, args) => {
      const id = links.findIndex(x => x.id === args.id);
      links[id] = {
        id: `link-${ id }`,
        description: args.description ? args.description : links[id].description,
        url: args.url ? args.url : links[id].url,
      }

      return links[id];
    },
    deleteLink: (parent, args) => {
      const link = links[links.findIndex(x => x.id === args.id)];
      links = links.filter(x => x.id !== args.id);

      return link;
    },
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

server.start(()=> console.log(`Server is running on http://localhost:4000`));
