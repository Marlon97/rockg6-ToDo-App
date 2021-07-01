import styles from "./Popup.module.scss";

const Popup = (props) => {
  return (
    <div
      className={
        props.hidden
          ? [styles["popup"], styles["hidden"]].join(" ")
          : styles.popup
      }
    >
      Popup window
    </div>
  );
};

export default Popup;
