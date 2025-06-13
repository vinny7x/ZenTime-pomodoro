import { useContext } from "react";
import styles from "./styles.module.css";
import { TaskContext } from "../../contexts/TaskContext";

export function Countdown() {
  const taskContext = useContext(TaskContext)
  console.log(taskContext);
  
  return <div className={`${styles.container} ${styles.cyan}`}>00:00 </div>;
}
