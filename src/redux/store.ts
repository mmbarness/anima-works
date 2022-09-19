import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import aboutSlice from '../features/about/aboutSlice';
import gearSlice from '../features/gear/gearSlice';
import { sanityApi } from './sanityApi';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['students/addTag', 'students/removeTag', 'students/fetchStudents'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['students', 'studentsSlice.students'],
      },
    }).concat(
        sanityApi.middleware
    ),
  reducer: {
    aboutSlice,
    gearSlice,
    [sanityApi.reducerPath]: sanityApi.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
