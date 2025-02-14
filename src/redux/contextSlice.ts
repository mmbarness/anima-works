import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
    aboutImageUrl: string | null,
    companyLogoUrl: string | null,
    currentOrientation: "portrait" | "landscape",
    matchAgainst: "landscape",
    showScrollText: boolean,
    windowDimensions: {
        width: number,
        height: number
    }
}

const initialState: InitialState = {
    aboutImageUrl: null,
    companyLogoUrl: null,
    currentOrientation: window.matchMedia("(orientation: portrait)").matches ? 'portrait' : 'landscape',
    matchAgainst: "landscape",
    showScrollText: true,
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
        setShowScrollText(state, action: PayloadAction<boolean>) {
            state.showScrollText = action.payload
        },
        setWindowDimensions(state, action: PayloadAction<{ width: number, height: number }>) {
            state.windowDimensions = action.payload
        },
        setAboutImageUrl(state, action: PayloadAction<string>) {
            state.aboutImageUrl = action.payload
        },
        setCompanyLogoUrl(state, action: PayloadAction<string>) {
            state.companyLogoUrl = action.payload
        }
    },
});


export default contextSlice
