import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function Tips() {
    const {state} = useTaskContext()
    // ciclos
    const nextCycle = getNextCycle(state.currentCycle);
    const nextCyleType = getNextCycleType(nextCycle);
    //tips
     const tipsForWhenActiviteTask = {
       workTime: <span>Foque por <b>{state.config.workTime}min</b></span>,
       shortBreakeTime: <span>Descanse por: {state.config.shortBreakeTime}min</span>,
       longBreakeTime: <span>Descanso longo</span>,
     };
     const tipsForNoActiviteTask = {
       workTime: <span>Próximo ciclo é de: <b>{state.config.workTime}min</b></span>,
       shortBreakeTime: (
         <span>Próximo descanso é de: <b>{state.config.shortBreakeTime}min</b></span>
       ),
       longBreakeTime: <span>Próximo descanso será longo</span>,
     };
  return (
    <>
      {!!state.activeTask && tipsForWhenActiviteTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiviteTask[nextCyleType]}
    </>
  );
}
