import {createSlice} from "@reduxjs/toolkit";

export const matchSlice = createSlice({
        name: "match",
        initialState: {
            matchInfo: {}
        },
        reducers: {
            setMatch: (state, action) => {
                state.matchInfo = action.payload;
            }

        }
    }
);

export const matchReducer = matchSlice.reducer;
export const matchAction = matchSlice.actions;