import React, { useEffect, useRef, useState } from "react";
import styles from "./Task.module.scss";


const Task = (props) => {
  return (
    <div className={styles.task}>
      <div className={styles.cb}>
        <input id={props.id} type="checkbox" defaultChecked={props.completed}/>
      </div>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.description}>{props.description}</div>
      <div className={styles.startDate}>{props.startDate}</div>
      <div className={styles.endDate}>{props.endDate}</div> 
    </div>
  );
};

export default Task;