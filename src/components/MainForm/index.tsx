import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { Tips } from "../Tips";

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  // ciclos
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCyleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (taskNameInput === null) return;
    const taskName = taskNameInput.current?.value.trim();
    if (!taskName) {
      alert("Digite o nome da ratefa!");
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCyleType],
      type: nextCyleType,
    };
    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
  
  const worker = new Worker(
    new URL("../../Workers/timerWorker.js",import.meta.url),
    
  );
  worker.postMessage('FAVOR')
  worker.postMessage('FALA_OI')
  worker.postMessage('BLABLABLA')
  worker.postMessage('FECHAR')
  worker.onmessage = function(event){
    console.log(event.data);
    
  }
}
  function handleInterruptTask() {
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  }

  return (
    <form onSubmit={handleCreateNewTask} className="form" action="">
      <div className="formRow">
        <DefaultInput
          labelText="task"
          id="meuInput"
          type="text"
          placeholder="Digite algo"
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>
      <div className="formRow">
        <Tips />
      </div>
      {state.currentCycle > 0 && (
        <div className="formRow">
          <Cycles />
        </div>
      )}

      <div className="formRow">
        {!state.activeTask ? (
          <DefaultButton
            key={"start"} //para nao dar conflito com o outro botao
            type="submit"
            icon={<PlayCircleIcon />}
            color="green"
            aria-label="Iniciar nova tarefa"
            title="Iniciar nova tarefa"
          />
        ) : (
          <DefaultButton
            key={"interrupt"}
            type="button"
            icon={<StopCircleIcon />}
            color="red"
            aria-label="Interromper tarefa atual"
            title="Interromper tarefa atual"
            onClick={handleInterruptTask}
          />
        )}
      </div>
    </form>
  );
}
