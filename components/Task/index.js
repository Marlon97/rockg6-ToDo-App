import styles from "./Task.module.scss";


const Task = ({element, title, open, close,point}) => {
  return <div className={styles.task}>
    <div>{title}</div>
      <div className={styles.container}>
        <button className={styles.editTask} onClick={() => open(false)}> &#9999; </button>
        <button className={styles.removeTask} onClick={() => 
          {debugger
            
            close(element);
           point(element);
          }}>&#9746;</button>
      </div>
  </div>;
};

export default Task;