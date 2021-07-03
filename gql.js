const { ApolloServer, gql } = require('apollo-server');
const typeDefs = gql`
  
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
    users: [User]
    user(secret: String!): User
    tasks: [Task]
    subtasks(id: String!): [Subtask]
  }

  type Mutation {
    addUser(nombre: String, correo: String, secret: String): User
    addTask(category: String, title: String, description: String, status: String, start_date: String, end_date: String): Task
    addSubtask(task_id: String, category: String, title: String, description: String, status: String, start_date: String, end_date: String): Subtask
    updateUser(id: String, nombre: String, correo: String): User
  }
`;

const fs = require("fs");

const users = require('./gql_documents/users');

let tasks = [];
let tasks_path = "";

const resolvers = {
    Query: {
        users: () => users,
        user: (_,args) => {
            const current_user = users.find(el => el.secret === args.secret);
            return current_user?current_user:{};
        },
        tasks: () => tasks,
        subtasks: (_,args) => tasks.find(el => el.id === args.id).sub_tasks,
    },
    Mutation: {
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
                fs.writeFile('./gql_documents/users.json', data, () => {
                    console.log("users database updated :) ")
                });
                tasks_path = './gql_documents/'+user.id+".json";

                fs.writeFile(tasks_path, JSON.stringify([], '', 2), () => {
                    console.log("user tasks file created :) ")
                });


            }else {
                tasks_path = './gql_documents/'+user.id+".json";
            }
            try {
                tasks = require(tasks_path);
            } catch (error) {
                tasks = [];
                console.log("json vacío");
            }
            return user;
        },
        addTask: (_, args) => {
            let task = {
                id: "t" + Date.now() + "-" + (Math.floor(Math.random() * (1000000 - 100000)) + 100000),
                category: args.category,
                title: args.title,
                description: args.description,
                status: "pending",
                start_date: args.start_date,
                end_date: args.end_date,
                finished_date: "",
                check_user_id: "",
                sub_tasks: []
            }
            tasks.push({...task});
            const data = JSON.stringify(tasks, '', 2);
            fs.writeFile(tasks_path, data, () => {
                console.log("tasks database updated :) ")
            });
            return task;
        },
        updateUser: (_, args) => {
            const user = users.find(el => el.id === args.id);
            user.nombre = args.nombre;
            user.correo = args.correo;
            return user;
        },
        addSubtask: (_, args) => {
            let subtask = {
                id: "st" + Date.now() + "-" + (Math.floor(Math.random() * (1000000 - 100000)) + 100000),
                category: args.category,
                title: args.title,
                description: args.description,
                status: "pending",
                start_date: args.start_date,
                end_date: args.end_date,
                finished_date: "",
                check_user_id: ""
            };
            const subtasks = tasks.find(el => el.id === args.task_id).sub_tasks;
            subtasks.push({...subtask});
            const data = JSON.stringify(tasks, '', 2);
            fs.writeFile(tasks_path, data, () => {
                console.log("subtasks database updated :) ")
            });
            return subtask;
        }
    }
};
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

