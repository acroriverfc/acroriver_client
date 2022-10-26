import {combineReducers} from "redux";
import {playerReducer} from "./player";
import {matchReducer} from "./match";

const rootReducer = combineReducers({playerReducer, matchReducer});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;