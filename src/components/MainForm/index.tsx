import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles/indes";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

export function MainForm() {
  const { setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

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
      duration: 1,
      type: "workTime",
    };
    const secondsRemaining = newTask.duration*60
    setState((prevState) => {
      return { ...prevState, 
        activeTask: newTask,
        config: prevState.config,
        currentCycle:1, //conferir dps
        secondsRemaining, //conferir dps
        formattedSecondsRemaining: "00:00",
        tasks: [
          ...prevState.tasks,
          newTask,
        ]

       };
    });
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
        />
      </div>
      <div className="formRow">
        <p>Proximo intervalo é de 25min.</p>
      </div>
      <div className="formRow">
        <Cycles />
      </div>
      <div className="formRow">
        <DefaultButton icon={<PlayCircleIcon />} color="green" />
      </div>
    </form>
  );
}
