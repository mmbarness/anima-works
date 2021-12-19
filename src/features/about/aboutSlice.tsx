import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { fetchAboutInfo} from '../../utils/sanityRequests';
import { AboutInfo } from '../../interfaces/sanityTypes';

const initialState: any = {
    'LOADING': true,
}

export interface IAppState {
    info: AboutInfo
}

export const fetchInfo = createAsyncThunk<AboutInfo[], never, { rejectValue: string }>(
    'about/fetchInfo',
    async () => {
      const response = await fetchAboutInfo();
      return response
    }
);

export const aboutSlice = createSlice({
    name: 'about',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInfo.fulfilled.type, (state, {payload}:any) => {
          for (const item of payload) {
            state.info = item
          }
          state['LOADING'] = false; 
          return state; 
        })
    },
});


export default aboutSlice.reducer