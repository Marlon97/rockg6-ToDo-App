const { ApolloServer, gql } = require('apollo-server');
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  
  type Subtask{
      id: String
      category: String
      title: String
      description: String
      status: String
      start_date: String
      end_date: String
      finished_date: String
      check_user_id: String
  }
  
  type Task {
      id: String
      category: String
      title: String
      description: String
      status: String
      start_date: String
      end_date: String
      finished_date: String
      check_user_id: String 
      sub_tasks: [ Subtask ] 
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
    user(id: String!): User
    tasks: [Task]
  }

  type Mutation {
    addBook(title: String, author: String): Book
    addUser(id: String, nombre: String, correo: String, secret: String): User
    addTask(category: String, title: String, description: String, status: String, start_date: String, end_date: String, finished_date: String, check_user_id: String): Task
    addSubtask(category: String, title: String, description: String, status: String, start_date: String, end_date: String, finished_date: String, check_user_id: String): Task
    updateUser(id: String, nombre: String, correo: String): User
  }
`;

const tasks = [
    {
        id: "t1",
        category: "cat1",
        title: "title1",
        description: "desc",
        status: "stat",
        start_date: "2021-06-28",
        end_date: "2021-06-30",
        finished_date: "2021-06-29",
        check_user_id: "GH1000001",
        sub_tasks: [
            {
                id: "t1_s1",
                category: "cat1_1",
                title: "title1_1",
                description: "desc_1",
                status: "stat_1",
                start_date: "2021-06-29",
                end_date: "2021-06-30",
                finished_date: "2021-06-29",
                check_user_id: "GH1000001_1"
            },
            {
                id: "t1_s2",
                category: "cat1_2",
                title: "title1_2",
                description: "desc_2",
                status: "stat_2",
                start_date: "2021-06-30",
                end_date: "2021-06-30",
                finished_date: "2021-06-30",
                check_user_id: "GH1000001_2"
            }
        ]
    },
    {
        id: "t2",
        category: "cat2",
        title: "title2",
        description: "desc2",
        status: "stat2",
        start_date: "2022-06-28",
        end_date: "2022-06-30",
        finished_date: "2022-06-29",
        check_user_id: "GH1000002",
        sub_tasks: []
    }
];

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
        user: (_,args) => users.find(el => el.secret === args.secret),
        tasks: () => tasks,
    },
    Mutation: {
        addBook: (_, args) => {
            console.log(args);
            books.push({...args});
            return 1;
        },
        addUser: (_, args) => {
            console.log(args);
            users.push({...args});
            return 1;
        },
        addTask: (_, args) => {
            console.log(args);
            tasks.push({...args});
        },
        updateUser: (_, args) => {
            const user = users.find(el => el.id === args.id);
            user.nombre = args.nombre;
            user.correo = args.correo;
            return user;
        }
    }
};
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

