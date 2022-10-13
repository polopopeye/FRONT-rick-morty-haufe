import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { characterSlice } from './slices/charactersSlice';
import { userSlice } from './slices/userSlice';

export const store = configureStore({
  reducer: {
    character: characterSlice.reducer,
    user: userSlice.reducer,
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
