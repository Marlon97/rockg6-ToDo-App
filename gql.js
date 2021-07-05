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
    updateTask(id: String, category: String, title: String, description: String, start_date: String, end_date: String): Task
    updateSubtask(task_id: String, id: String, category: String, title: String, description: String, start_date: String, end_date: String): Subtask
    updateTaskStatus(id: String, status: String): Task
    updateSubtaskStatus(task_id: String, id: String, status: String): Subtask
    deleteTask(id: String): Task
    deleteSubtask(task_id: String, id: String): Subtask
  }
`;

const fs = require("fs");

const users = require('./gql_documents/users');

let tasks = [];
let tasks_path = "";

function writeData(){
    const data = JSON.stringify(tasks, '', 2);
    fs.writeFile(tasks_path, data, () => {
        console.log("Database updated :) ");
    });
}

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
            writeData();
            return task;
        },
        updateUser: (_, args) => {
            const user = users.find(el => el.id === args.id);
            user.nombre = args.nombre;
            user.correo = args.correo;
            const data = JSON.stringify(users, '', 2);
            fs.writeFile('./gql_documents/users.json', data, () => {
                console.log("users database updated :) ")
            });
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
            writeData();
            return subtask;
        },
        updateTask: (_, args) => {
            const task = tasks.find(el => el.id === args.id);
            task.category = args.category;
            task.title = args.title;
            task.description = args.description;
            task.start_date = args.start_date;
            task.end_date = args.end_date;
            writeData();
            return task;
        },
        updateSubtask: (_, args) => {
            const subtask = (tasks.find(el => el.id === args.task_id).sub_tasks).find(el => el.id === args.id);
            subtask.category = args.category;
            subtask.title = args.title;
            subtask.description = args.description;
            subtask.start_date = args.start_date;
            subtask.end_date = args.end_date;
            writeData();
            return subtask;
        },
        updateTaskStatus: (_, args) => {
            const task = tasks.find(el => el.id === args.id);
            task.status = args.status;
            writeData();
            return task;
        },
        updateSubtaskStatus: (_, args) => {
            const subtask = (tasks.find(el => el.id === args.task_id).sub_tasks).find(el => el.id === args.id);
            subtask.status = args.status;
            writeData();
            return subtask;
        },
        deleteTask: (_, args) => {
            const task = tasks.find(el => el.id === args.id);
            tasks.splice(tasks.indexOf(task),1);
            writeData();
            return task;
        },
        deleteSubtask: (_, args) => {
            const subtasks = tasks.find(el => el.id === args.task_id).sub_tasks;
            const subtask = subtasks.find(el => el.id === args.id);
            subtasks.splice(subtasks.indexOf(subtask),1);
            writeData();
            return subtask;
        }
    }
};
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

