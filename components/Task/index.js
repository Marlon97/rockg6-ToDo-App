import styles from "./Task.module.scss";

const Task = (props) => {
  return <div className={styles.task}>{props.title}</div>;
};

export default Task;