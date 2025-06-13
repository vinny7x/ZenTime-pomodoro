import styles from "./styles.module.css";
type DefaultButtonPropos = {
  icon: React.ReactNode;
  color?: "green" | "red";
} & React.ComponentProps<"button">;

export function DefaultButton({
  icon,
  color = "green",
  ...props
}: DefaultButtonPropos) {
  return (
    <>
      <button className={`${styles.button} ${styles[color]}`} {...props}>
        {icon}
      </button>
    </>
  );
}
