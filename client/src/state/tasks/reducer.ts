import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { tasksApi } from "../../api/tasks";
import { getTasksA, TASKS, TasksAction } from "./actions";
import { TasksStateT } from "./types";

export const initialState: TasksStateT = undefined;

export const tasksReducer = (
  state: TasksStateT = initialState,
  action: TasksAction
) => {
  switch (action.type) {
    case TASKS.GET:
      return [action.tasks];

    default:
      return state;
  }
};

export const getTasks = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve) => {
      tasksApi.getTasks().then((res) => {
        dispatch(getTasksA(res));
        resolve();
      });
    });
  };
};
