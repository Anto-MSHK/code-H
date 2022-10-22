import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import { authReducer } from "./auth/reducer";
import { AuthStateT } from "./auth/types";
import { tasksReducer } from "./tasks/reducer";
import { TasksStateT } from "./tasks/types";
import thunk from "redux-thunk";
export interface RootState {
  tasks: TasksStateT;
  auth: AuthStateT;
}

const rootReducer = combineReducers<RootState>({
  tasks: tasksReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;
export default store;
