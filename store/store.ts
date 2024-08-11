import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './gamesSlice';
import favouritesReducer from './favouritesSlice';

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    favourites: favouritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
