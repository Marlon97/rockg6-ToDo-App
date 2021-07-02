//import styles from "./TaskList.module.scss";
import Task from "../Task";

const TaskList = ({ tasks, open, close, point}) => {
  const taskArray = tasks.map(
    (task, index) => (
      <Task key={index} element={parseInt(index)} title={task.title} open={open} close={close} point={point}/>
    ));
  return <div>{taskArray}</div>;
};

export default TaskList;
