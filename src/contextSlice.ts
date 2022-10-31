import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
    currentOrientation: "portrait" | "landscape",
    matchAgainst: "landscape",
    windowDimensions: {
        width: number,
        height: number
    }
}

const initialState: InitialState = {
    currentOrientation: window.matchMedia("(orientation: portrait)").matches ? 'portrait' : 'landscape',
    matchAgainst: "landscape",
    windowDimensions: {
        width: window.innerWidth,
        height: window.innerHeight
    },
}

export const contextSlice = createSlice({
    name: 'context',
    initialState,
    reducers: {
        setOrientation(state, action: PayloadAction<"landscape" | "portrait">) {
            state.currentOrientation = action.payload
        },
        setWindowDimensions(state, action: PayloadAction<{ width: number, height: number }>) {
            state.windowDimensions = action.payload
        }
    },
});


export default contextSlice