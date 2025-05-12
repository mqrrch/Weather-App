import { createSlice } from "@reduxjs/toolkit";
import type { Root } from "./dataTypes";

interface InitialState{
    data: Root | null;
}

const initialState: InitialState = {
    data: null,
}

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
    }
})

export const { setData } = dataSlice.actions;
export const dataReducer = dataSlice.reducer;