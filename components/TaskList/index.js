//import styles from "./TaskList.module.scss";
import Task from "../Task";

const TaskList = ({ tasks }) => {
  const taskArray = tasks.map((task, index) => (
    <Task key={index} title={task.title} />
  ));

  return <div>{taskArray}</div>;
};

export default TaskList;
