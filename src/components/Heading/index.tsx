import styles from "./styles.module.css";

type headingProps = {
  children: React.ReactNode;
}

export function Heading({children}: headingProps) {
  return (
    <h1 className={`${styles.heading}`}>{children}</h1>
  );
}
