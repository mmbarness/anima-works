import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
    currentOrientation: "portrait" | "landscape",
    matchAgainst: "landscape",
}

const initialState: InitialState = {
    currentOrientation: window.matchMedia("(orientation: portrait)").matches ? 'portrait' : 'landscape',
    matchAgainst: "landscape",
}

export const contextSlice = createSlice({
    name: 'context',
    initialState,
    reducers: {
        setOrientation(state, action: PayloadAction<"landscape" | "portrait">) {
            state.currentOrientation = action.payload
        } 
    },
});


export default contextSlice