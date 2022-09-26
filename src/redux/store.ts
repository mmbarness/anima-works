import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import contextSlice from '../contextSlice';
import aboutSlice from '../features/about/aboutSlice';
import { sanityApi } from './sanityApi';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['meta.baseQueryMeta'],
      },
    }).concat(
        sanityApi.middleware
    ),
  reducer: {
    aboutSlice,
    [sanityApi.reducerPath]: sanityApi.reducer,
    contextSlice: contextSlice.reducer,
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
