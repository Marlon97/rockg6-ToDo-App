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
    user(secret: String!): User
    tasks: [Task]
    subtasks(id: String!): [Subtask]
  }

  type Mutation {
    addBook(title: String, author: String): Book
    addUser(nombre: String, correo: String, secret: String): User
    addTask(category: String, title: String, description: String, status: String, start_date: String, end_date: String, finished_date: String, check_user_id: String): Task
    addSubtask(task_id: String, id: String, category: String, title: String, description: String, status: String, start_date: String, end_date: String, finished_date: String, check_user_id: String): Subtask
    updateUser(id: String, nombre: String, correo: String): User
  }
`;

const fs = require("fs");

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

const users = require('./users.json');

/**
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
 **/

let taskss = [];

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
        user: (_,args) => {
            const current_user = users.find(el => el.secret === args.secret);
            return current_user?current_user:{};
            },
        tasks: () => tasks,
        subtasks: (_,args) => tasks.find(el => el.id === args.id).sub_tasks,
    },
    Mutation: {
        addBook: (_, args) => {
            console.log(args);
            books.push({...args});
            return 1;
        },
        addUser: (_, args) => {
            let user = users.find(el => el.secret === args.secret);
            if(!user){
                user = {
                    id: Date.now()+"-"+(Math.floor(Math.random() * (1000000 - 100000)) + 100000),
                    nombre: args.nombre,
                    correo: args.correo,
                    secret:args.secret
                };
                users.push({...user});
                const data = JSON.stringify(users, '', 2);
                fs.writeFile('./users.json', data, () => {
                    console.log("users database updated :) ")
                });

            }
            return user;
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
        },
        addSubtask: (_, args) => {
            const subtasks = tasks.find(el => el.id === args.task_id).sub_tasks;
            subtasks.push({id: args.id, category: args.category, title: args.title, description: args.description, status: args.status, start_date: args.start_date, end_date: args.end_date, finished_date: args.finished_date, check_user_id: args.check_user_id});
            return subtasks[subtasks.length - 1];
        }
    }
};
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

