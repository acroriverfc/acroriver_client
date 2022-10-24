import {createSlice} from "@reduxjs/toolkit";


export const playerSlice = createSlice({
    name: "player",
    initialState: {
        playerInfo:
            {
                "playerId": 0,
                "playerName": "",
                "birthDate": "",
                "height": 0,
                "weight": 0,
                "appearances": 0,
                "goals": 0,
                "assists": 0,
                "position": "",
                "backNum": 0,
                "imageUrl": "",
                "description": ""
            }
    },
    reducers : {
        setPlayer : (state, action) => {
            state.playerInfo = action.payload
        }
    }
})

export const playerReducer = playerSlice.reducer;
export const playerAction = playerSlice.actions;