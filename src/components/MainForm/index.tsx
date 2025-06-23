import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles/indes";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useState } from "react";

export function MainForm() {
  const [taskName, setTaskName] = useState('')
  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault()
    console.log('foi');
    

  }
  return (
    <form onSubmit={handleCreateNewTask} className="form" action="">
      <div className="formRow">
        <DefaultInput
          labelText="task"
          id="meuInput"
          type="text"
          placeholder="Digite algo"
          value={taskName}
          onChange={(e)=>setTaskName(e.target.value)}
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
