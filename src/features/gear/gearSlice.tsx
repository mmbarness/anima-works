import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { fetchAboutInfo, fetchGear} from '../../utils/sanityRequests';
import { AboutInfo, GearItem } from '../../interfaces/sanityTypes';

const initialState: any = {
    'LOADING': true,
}

export interface IAppState {
    info: GearItem
}

export const fetchGearAction = createAsyncThunk<GearItem[], never, { rejectValue: string }>(
    'gear/fetchGear',
    async () => {
        try{
            const response = await fetchGear();
            return response
        } catch(error){
            console.log(error)
            return error
        }
    }
);

export const gearSlice = createSlice({
    name: 'gear',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGearAction.fulfilled.type, (state, {payload}:any) => {
            state.gear = payload; 
            state['LOADING'] = false; 
            return state; 
        })
    },
});


export default gearSlice.reducer