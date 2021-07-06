import React, { useEffect, useRef, useState } from "react";
import styles from "./Task.module.scss";

const Task = ({
  element,
  title,
  id,
  completed,
  description,
  startDate,
  endDate,
  open,
  close,
  point,
}) => {
  return (
    <div className={styles.task}>
      {/*<div>{title}</div>*/}
      <div className={styles.cb}>
        <input id={id} type="checkbox" />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>Description: {description}</div>
      <div className={styles.startDate}>
        {" "}
        Start: {startDate.replace("T", " *Time: ")}{" "}
      </div>
      <div className={styles.endDate}>
        {" "}
        End: {endDate.replace("T", " *Time: ")}{" "}
      </div>

      <div className={styles.container}>
        {/*
        <button className={styles.editTask} onClick={() => open(false)}>
          {" "}
          &#9999;{" "}
        </button>
        */}
        <button
          className={styles.removeTask}
          onClick={() => {
            close(element);
            //point(task_id);
          }}
        >
          &#9746;
        </button>
      </div>
    </div>
  );
};

export default Task;
