import styles from "./Popup.module.scss";

const PopupRemove = ({ close, item, tasks, deleteTask }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.closeBtn}>
          <button onClick={() => close(null)}>X</button>
        </div>
        <h3>Do you want to remove this task?</h3>
        <div className={styles.popup.btnSubmit}>
          {/* add task delete function here */}
          <button
            className={styles.accept}
            onClick={() => {
              console.log(tasks[item].id);
              deleteTask({
                variables: {
                  id: tasks[item].id,
                },
              });
              //tasks.splice(parseInt(item), 1);
              close(null);
            }}
          >
            Accept
          </button>
          <button className={styles.cancel} onClick={() => close(null)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupRemove;
