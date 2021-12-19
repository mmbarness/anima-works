import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWork } from '../../utils/sanityRequests';
import {  WorkItem } from '../../interfaces/sanityTypes';

const initialState: any = {
    'LOADED': false,
}

export const fetchWorkAction = createAsyncThunk<WorkItem[], never, { rejectValue: string }>(
    'work/fetchWork',
    async () => {
        try{
            const response = await fetchWork();
            return response
        } catch(error){
            console.log(error)
            return error
        }
    }
);

export const workSlice = createSlice({
    name: 'work',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWorkAction.fulfilled.type, (state, {payload}:any) => {
            state.work = payload; 
            state['LOADED'] = true; 
            return state; 
        })
    },
});


export default workSlice.reducer