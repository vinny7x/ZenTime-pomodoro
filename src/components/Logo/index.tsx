import { CalendarClock } from "lucide-react";
import styles from "./styles.module.css";
import { RouterLink } from "../RouterLink";

export function Logo() {
  return (
    <div className={`${styles.logo}`}>
      <RouterLink className={styles.logoLink} href="/">
        <CalendarClock />
        <span>
          <span>Zen</span><span className={styles.time}>Time</span>
        </span>
      </RouterLink>
    </div>
  );
}
