import { userT } from "../auth/types";

export type taskT = {
  title: string;
  body: string;
  creator: userT;
  performers?: userT[];
  date?: { from: string; to: string };
};
export type TasksStateT = taskT[] | undefined;
