import { combineReducers, legacy_createStore as createStore } from "redux";
import { scheduleReducer } from "./tasks/reducer";
import { ScheduleGroupsStateT } from "./tasks/types";

export interface RootState {
  schedule: ScheduleGroupsStateT;
}

const rootReducer = combineReducers<RootState>({
  schedule: scheduleReducer,
});

const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;
export default store;
