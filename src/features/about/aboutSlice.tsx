import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { Set } from 'typescript';
import { fetchSanityVideos } from '../../utils/sanityRequests';


const initialState: IAppState = {
    students: [],
}
interface updateTagsProps {
    id: string
    data: {
        tags: Set<string>
        id?: number
    }
}
export interface IAppState {
    students: Student[] 
}

export const fetchVideos = createAsyncThunk<Student[], never, { rejectValue: string }>(
    'students/fetchStudents',
    async () => {
      const response = await fetchSanityVideos();
      return response
    }
);

export const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchVideos.fulfilled.type, (state, {payload}:any) => {
          state.students = (payload.map((student:Student) => {
                student.tags = new Set<string>()
                return student
            }));
        })
    },
});


export default studentSlice.reducer