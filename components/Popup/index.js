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
            {/*<textarea
              rows="5"
              cols="60"
              className="description"
              placeholder="Your task description (optional)"
            ></textarea>*/}
          </div>
          <input type="submit" className={styles["btn-submit"]} value="Add" />
        </form>
      </div>
    </div>
  );
};

export default Popup;
