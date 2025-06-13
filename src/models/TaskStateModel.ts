import type { TaskModel } from "./TaskModel";

export type TaskStateModel = {
  tasks: TaskModel[]; //histórico, MainForm
  secondsRemaining: number, //Home, CountDown, Histórico, MainForm, Button
  formattedSecondsRemaining: string, //Título, CountDown
  activeTask: TaskModel | null, //CountDown, Histórico, MainForm, Button
  currentCycle: number, //Home
  config: { //MainForm
    workTime: number,
    shortBreakeTime: number,
    longBreakeTime: number
  }
};
