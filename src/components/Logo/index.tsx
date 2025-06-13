import { CalendarClock } from "lucide-react";
import styles from "./styles.module.css";

export function Logo() {
  return (
    <div className={`${styles.logo}`}>
      <a className={styles.logoLink} href="#">
        <CalendarClock />
        <span>
          <span>Zen</span><span className={styles.time}>Time</span>
        </span>
      </a>
    </div>
  );
}
