import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Task from "../components/Task";
import Popup from "../components/Popup";
import { useState } from "react";

export default function Home() {
  const [hidden, setHidden] = useState(true);

  return (
    <body>
      <div className={styles.container}>
        <Head>
          <title>ToDo App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
         <h1 className={styles.title}>Your ToDo's</h1>

          <p className={styles.description}>Let's start by adding a task</p>
        </main>

        <div className={styles.forms}>
          <button
           onClick={() => setHidden(!hidden)}
            id="btn-abrir-popup"
            className={styles["btn-abrir-popup"]}
          >
            +
          </button>
          <form>
           <input type="text"></input>
            <input type="submit"></input>
          </form>
       </div>

       <Task number={1} />
        <Task number={2} />
        <Task number={3} />
       <Task number={4} />
       <Popup hidden={hidden} />
      </div>
    </body>
  );
}
