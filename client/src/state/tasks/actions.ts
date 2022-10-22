import { taskT } from "./types";

export enum TASKS {
  GET = "TASKS/GET",
}

export type getTasksAT = {
  type: string;
  tasks: taskT[];
};

export const getTasksA = (tasks: taskT[]): getTasksAT => ({
  type: TASKS.GET,
  tasks,
});

export type TasksAction = getTasksAT;
