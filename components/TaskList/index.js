//import styles from "./TaskList.module.scss";
import Task from "../Task";

const TaskList = ({ tasks, open, close, point }) => {
  const taskArray = tasks.map((task, index) => (
    <Task
      key={index}
      title={task.title}
      element={parseInt(index)}
      open={open}
      close={close}
      point={point}
      description={task.description}
      startDate={task.start_date}
      endDate={task.end_date}
    />
  ));
  return <div>{taskArray}</div>;
};

export default TaskList;
