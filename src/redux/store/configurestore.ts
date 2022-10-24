import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./modules";
import logger from "redux-logger";

const store = configureStore({
    reducer : rootReducer,
    middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(logger)),
    devTools: process.env.MODE !== 'PRODUCTION',
});

export default store;
