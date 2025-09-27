import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { DefaultInput } from "../../components/DefaultInput";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";
import styles from "./styles.module.css"
import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
export function Settings() {
  const { state, dispatch } = useTaskContext()
  const workTimeInput = useRef<HTMLInputElement>(null)
  const shortBreakTimeInput = useRef<HTMLInputElement>(null)
  const longBreakTimeInput = useRef<HTMLInputElement>(null)

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    showMessage.dismiss()
    const formErrors = [];

    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formErrors.push("Insita apenas números para os campos!");
    }
    if (workTime < 1 || workTime > 99) {
      formErrors.push('O tempo de foco deve estar entre 1 e 99 minutos!')
    }
    if (shortBreakTime < 1 || shortBreakTime > 30) {
      formErrors.push('O tempo de descanso curto deve estar entre 1 e 30 minutos!')
    }
    if (longBreakTime < 1 || longBreakTime > 60) {
      formErrors.push('O tempo de descanso longo deve estar entre 1 e 60 minutos!')
    }
    if (formErrors.length > 0) {
      formErrors.forEach((error) => {
        showMessage.error(error)
      })
      return;
    }
    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS, payload: {
        workTime, shortBreakTime, longBreakTime
      }
    });
    showMessage.success("Configurações salvas!")

  }
  return (
    <MainTemplate>
      <Container>
        <Heading>
          Configurações
        </Heading>
      </Container>
      <Container>
        <p style={{ textAlign: "center" }}>Modifique as configurações para tempo de foco, descanso curto e descanso longo</p>
      </Container>
      <Container>
        <form action="" onSubmit={handleSaveSettings} className={styles.form}>
          <div className={styles.formRow}>
            <DefaultInput id="workTime"
              labelText="Foco"
              defaultValue={state.config.workTime}
              type="number"
              ref={workTimeInput} />
          </div>

          <div className={styles.formRow}>
            <DefaultInput id="shortBreakTime"
              labelText="Descanso curto"
              defaultValue={state.config.shortBreakTime}
              type="number"
              ref={shortBreakTimeInput} />
          </div>

          <div className={styles.formRow}>
            <DefaultInput id="longBreakTime"
              labelText="Descanso longo"
              defaultValue={state.config.longBreakTime}
              type="number"
              ref={longBreakTimeInput} />
          </div>

          <div className={styles.formRow}>
            <DefaultButton icon={<SaveIcon />}
              aria-label="Salvar configurações"
              title="Salvar configurações" />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
