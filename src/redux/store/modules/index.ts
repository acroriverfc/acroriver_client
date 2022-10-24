import {combineReducers} from "redux";
import {playerReducer} from "./player";

const rootReducer = combineReducers({playerReducer});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;