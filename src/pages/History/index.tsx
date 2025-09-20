import { ArrowDownUp, TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import styles from "./styles.module.css";
import type { TaskModel } from "../../models/TaskModel";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks, type SortTasksOptions } from "../../utils/sortTasks";
import { useEffect, useState } from "react";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export function History() {
  const { state, dispatch } = useTaskContext();
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const hasTasks = state.tasks.length > 0;
  const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: "startDate",
        direction: "desc",
      };
    }
  );
  useEffect(() => {
    setSortTasksOptions((prevState) => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);
  useEffect(() => {
    if (!confirmClearHistory) return;

    dispatch({ type: TaskActionTypes.RESET_STATE });
    setConfirmClearHistory(false);
  }, [confirmClearHistory, dispatch]);
  function handleSortTasks({ field }: Pick<SortTasksOptions, "field">) {
    const newDirection = sortTasksOptions.direction === "desc" ? "asc" : "desc";
    setSortTasksOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }
  function handleResetHistory() {
    showMessage.dismiss();
    showMessage.confirm(
      "Tem certeza que deseja apagar o histórico?",
      (confirmation) => {
        setConfirmClearHistory(confirmation);
      }
    );
  }
  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                icon={<TrashIcon />}
                color="red"
                aria-label="Apagar histórico"
                title="Apagar histórico"
                onClick={handleResetHistory}
              />
            </span>
          )}
        </Heading>
      </Container>
      <Container>
        {hasTasks && (
          <div className={`${styles.responsiveTable}`}>
            <table>
              <thead>
                <tr>
                  <th
                    onClick={() => {
                      handleSortTasks({ field: "name" });
                    }}
                    className={styles.thSort}
                  >
                    Tarefa <ArrowDownUp size="16" />
                  </th>
                  <th
                    onClick={() => {
                      handleSortTasks({ field: "duration" });
                    }}
                    className={styles.thSort}
                  >
                    Duração <ArrowDownUp size="16" />
                  </th>
                  <th
                    onClick={() => {
                      handleSortTasks({ field: "startDate" });
                    }}
                    className={styles.thSort}
                  >
                    Data <ArrowDownUp size="16" />
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortTasksOptions.tasks.map((task: TaskModel) => {
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
        )}
        {!hasTasks && (
          <p className={styles.p}>Ainda não existem tarefas criadas!</p>
        )}
      </Container>
    </MainTemplate>
  );
}
