const { ApolloServer, gql } = require("apollo-server");
const typeDefs = gql`
  type Subtask {
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
    sub_tasks: [Subtask]
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
    addTask(
      category: String
      title: String
      description: String
      status: String
      start_date: String
      end_date: String
      finished_date: String
      check_user_id: String
    ): Task
    deleteTask(id: String): Task
    addSubtask(
      task_id: String
      id: String
      category: String
      title: String
      description: String
      status: String
      start_date: String
      end_date: String
      finished_date: String
      check_user_id: String
    ): Subtask
    updateUser(id: String, nombre: String, correo: String): User
  }
`;

const fs = require("fs");

const users = require("./users.json");

let tasks = [];
let tasks_path = "";

function writeData() {
  const data = JSON.stringify(tasks, "", 2);
  fs.writeFile(tasks_path, data, () => {
    console.log("Database updated :) ");
  });
}

const resolvers = {
  Query: {
    users: () => users,
    user: (_, args) => {
      const current_user = users.find((el) => el.secret === args.secret);
      return current_user ? current_user : {};
    },
    tasks: () => tasks,
    subtasks: (_, args) => tasks.find((el) => el.id === args.id).sub_tasks,
  },
  Mutation: {
    addUser: (_, args) => {
      //console.log("users: ",users);
      //console.log("to_users: ",typeof(users)===typeof([]));
      //console.log("f_tasks: ",tasks);
      //console.log("to_f_tasks: ",typeof(tasks)===typeof([]));
      let user = users.find((el) => el.secret === args.secret);
      if (!user) {
        user = {
          id:
            Date.now() +
            "-" +
            (Math.floor(Math.random() * (1000000 - 100000)) + 100000),
          nombre: args.nombre,
          correo: args.correo,
          secret: args.secret,
        };
        users.push({ ...user });
        const data = JSON.stringify(users, "", 2);
        fs.writeFile("./users.json", data, () => {
          console.log("users database updated :) ");
        });
        tasks_path = "./" + user.id + ".json";

        fs.writeFile(tasks_path, JSON.stringify([], "", 2), () => {
          console.log("user tasks file created :) ");
        });
      } else {
        tasks_path = "./" + user.id + ".json";
      }
      try {
        tasks = require(tasks_path);
      } catch (error) {
        tasks = [];
        console.log("json vacío");
      }
      //console.log("tasks_path: ",tasks_path)
      //console.log("tasks: ",tasks);
      //console.log("to_tasks: ",typeof(tasks)===typeof({}));
      return user;
    },
    addTask: (_, args) => {
      let task = {
        id:
          "t" +
          Date.now() +
          "-" +
          (Math.floor(Math.random() * (1000000 - 100000)) + 100000),
        category: args.category,
        title: args.title,
        description: args.description,
        status: args.status,
        start_date: args.start_date,
        end_date: args.end_date,
        finished_date: "",
        check_user_id: "",
        sub_tasks: [],
      };
      tasks.push({ ...task });
      const data = JSON.stringify(tasks, "", 2);
      fs.writeFile(tasks_path, data, () => {
        console.log("tasks database updated :) ");
      });
      return task;
    },
    deleteTask: (_, args) => {
      const task = tasks.find((el) => el.id === args.id);
      tasks.splice(tasks.indexOf(task), 1);
      writeData();
      return task;
    },
    updateUser: (_, args) => {
      const user = users.find((el) => el.id === args.id);
      user.nombre = args.nombre;
      user.correo = args.correo;
      return user;
    },
    addSubtask: (_, args) => {
      const subtasks = tasks.find((el) => el.id === args.task_id).sub_tasks;
      subtasks.push({
        id: args.id,
        category: args.category,
        title: args.title,
        description: args.description,
        status: args.status,
        start_date: args.start_date,
        end_date: args.end_date,
        finished_date: args.finished_date,
        check_user_id: args.check_user_id,
      });
      return subtasks[subtasks.length - 1];
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
