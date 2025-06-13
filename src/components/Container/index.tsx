import styles from "./styles.module.css"
type ContainerPropos = {
  children: React.ReactNode;
}
export function Container({children}: ContainerPropos){
  return (
   <div className={styles.container}>
          <div className={styles.content}>
            {children}
          </div>
      </div>
)
}