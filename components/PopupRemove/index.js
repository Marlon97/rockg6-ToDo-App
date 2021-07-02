import styles from "./Popup.module.scss";

const PopupRemove = ({ close, item, tasks}) => {

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.closeBtn}>
          <button onClick={() => close(true)}>X</button>
        </div>
        <h3>Do you want to remove this task?</h3>
        <div className={styles.popup.btnSubmit}>
          {/* add task delete function here */}
          <button className={styles.accept} onClick={(item) => {console.log(item);tasks.splice(parseInt(item),1);close(true)}}>Accept</button>
          <button className={styles.cancel} onClick={() => close(true)}>Cancel</button>
        </div>



      </div>
    </div>
  );
};

export default PopupRemove;
