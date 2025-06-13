import styles from "./styles.module.css"
type DefaultInputPropos = {
  id: string;
  labelText: string;
} & React.ComponentProps<"input">;

export function DefaultInput({ id, type, labelText, ...rest }: DefaultInputPropos) {
  return (
    <>
       <label htmlFor={id}>{labelText}</label>

      <input className={styles.input} id={id} type={type} {...rest} />
    </>
  );
}
