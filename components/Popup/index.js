import { useForm } from "react-hook-form";
import styles from "./Popup.module.scss";

const Popup = ({ onceSubmited, close }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    onceSubmited(data);
    close(true);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.closeBtn}>
          <button onClick={() => close(true)}>X</button>
        </div>
        <h3>Add new task...</h3>
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <div className={styles["task-inputs"]}>
            <input {...register("title")} type="text" placeholder="Title" />
            <textarea
              {...register("description")}
              rows="5"
              cols="60"
              className="description"
              placeholder="Your task description (optional)"
            ></textarea>
              <label for="meeting-time">_____Choose date and time to start your task:</label>
              <input type="datetime-local" id="meeting-time" name="meeting-time" value="2018-06-12T19:30" min="2018-06-07T00:00" max="2018-06-14T00:00"></input>
              <label for="meeting-time">_____Choose date and time to end your task:</label>
              <input type="datetime-local" id="meeting-time" name="meeting-time" value="2018-06-12T19:30" min="2018-06-07T00:00" max="2018-06-14T00:00"></input>
          </div>
          <input type="submit" className={styles["btn-submit"]} value="Add" />
        </form>
      </div>
    </div>
  );
};

export default Popup;
