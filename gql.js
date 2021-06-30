const { ApolloServer, gql } = require('apollo-server');
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  
  type User {
      id: String
      nombre: String
      correo: String
      secret: String
  }

  type Query {
    books: [Book]
    users: [User]
  }

  type Mutation {
    addBook(title: String, author: String): Book
    addUser(id: String, nombre: String, correo: String, secret: String): User
  }
`;

const users = [
    {
        id: "GH1000001",
        nombre: "Marlon ToDo",
        correo: "marlon@ToDo.com",
        secret: "mar#lon#secret"
    },
    {
        id: "GH1000002",
        nombre: "Víctor ToDo",
        correo: "victor@ToDo.com",
        secret: "vic#tor#secret"
    },
    {
        id: "GH1000003",
        nombre: "Jazmín ToDo",
        correo: "jazmin@ToDo.com",
        secret: "jaz#min#secret"
    },
    {
        id: "GH1000004",
        nombre: "Daniel ToDo",
        correo: "daniel@ToDo.com",
        secret: "dan#iel#secret"
    }
];

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];
const resolvers = {
    Query: {
        books: () => books,
        users: () => users,
    },
    Mutation: {
        addBook: (_, args) => {
            console.log(args);
            books.push({...args});
            return 1;
        },
        addUser: (_, args) => {
            console.log(args);
        }
    }
};
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});