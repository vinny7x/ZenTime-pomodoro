import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";


import styles from "./styles.module.css";
import type { TaskModel } from "../../models/TaskModel";
export function History() {
  const { state } = useTaskContext();
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
                <th>
                  Tarefa
                </th>
                <th>Duração</th>
                <th>Data</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {state.tasks.map((task:TaskModel)=>{
                return (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.duration}</td>
                    <td>{task.completeDate?task.completeDate:'nao completada'}</td>
                    <td>{task.type}</td>
                  </tr>
                )
                
                
              })}
              
            </tbody>
          </table>
        </div>
      </Container>
    </MainTemplate>
  );
}
