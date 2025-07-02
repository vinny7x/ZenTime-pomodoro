import { useEffect, useReducer, useState } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";

type taskContextProviderProps = {
  children: React.ReactNode;
};
export function TaskContextProvider({ children }: taskContextProviderProps) {
  const [state, setState] = useState(initialTaskState);
  const [numero, dispatch] = useReducer((state, action) => {
    switch (action) {
      case "INCREMENT":
        return state + 1;
      case "DECREMENT":
        return state-1
    }
    return state;
  }, 0);
  // useEffect(() => {

  //   return () => {
  //     console.log(state);
  //   };
  // }, [state]);
  return (
    <TaskContext.Provider value={{ state, setState }}>
      <h1>o número é: {numero}</h1>
      <button
        onClick={() => {
          dispatch("INCREMENT");
        }}
      >
        Incrementar
      </button>
      <button
        onClick={() => {
          dispatch("DECREMENT");
        }}
      >
        Decrementar
      </button>
    </TaskContext.Provider>
  );
}
