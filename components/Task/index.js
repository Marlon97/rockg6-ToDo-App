import styles from "./Task.module.scss";

const Task = (props) => {
  return <div className={styles.task}>Task {props.number}</div>;
};

export default Task;