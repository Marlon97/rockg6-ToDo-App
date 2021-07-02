//import styles from "./TaskList.module.scss";
import Task from "../Task";

const TaskList = ({ tasks }) => {
  const taskArray = tasks.map((task, index) => (
    <Task key={index} title={task.title} description={task.description} startDate={task.startDate} endDate={task.endDate} />
    //<Task key={index} description={task.description} />
  ));
  return <div>{taskArray}</div>;
};

export default TaskList;