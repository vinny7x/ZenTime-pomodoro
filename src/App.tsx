import "./styles/theme.css";
import "./styles/global.css";

import { Home } from "./pages/Home";
//import { useState } from "react";
//import type { TaskStateModel } from "./models/TaskStateModel";
import { TaskContext } from "./contexts/TaskContext";

// const initialState: TaskStateModel = {
//   tasks: [],
//   secondsRemaining: 0,
//   formattedSecondsRemaining: "00:00",
//   activeTask: null,
//   currentCycle: 0,
//   config: {
//     workTime: 25,
//     shortBreakeTime: 5,
//     longBreakeTime: 15,
//   },
// };

export function App() {
  //const [state, setState] = useState(initialState);
  return (
    <TaskContext.Provider value={{chave:"df"}}>
      <Home />
    </TaskContext.Provider>
  );
}
