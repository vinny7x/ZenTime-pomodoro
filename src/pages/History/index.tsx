import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

import styles from "./styles.module.css";
import type { TaskModel } from "../../models/TaskModel";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
export function History() {
  const { state } = useTaskContext();
  const sortedTaks = [...state.tasks].sort((a, b) => {
  return b.startDate - a.startDate
  });
  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          <span className={styles.buttonContainer}>
            <DefaultButton
              icon={<TrashIcon />}
              color="red"
              aria-label="Apagar histórico"
              title="Apagar histórico"
            />
          </span>
        </Heading>
      </Container>
      <Container>
        <div className={`${styles.responsiveTable}`}>
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Data</th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {sortedTaks.map((task: TaskModel) => {
                const taskTypeDictionary = {
                  workTime: "Foco",
                  shortBreakeTime: "Descanso curto",
                  longBreakeTime: "Descanso longo",
                };
                return (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.duration}</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>{getTaskStatus(task, state.activeTask)}</td>
                    <td>{taskTypeDictionary[task.type]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </MainTemplate>
  );
}
