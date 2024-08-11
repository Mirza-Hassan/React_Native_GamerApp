import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameItem } from '../screens/type';

const initialState: GameItem[] = [];

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<GameItem>) => {
      state.push(action.payload);
    },
    removeFavourite: (state, action: PayloadAction<GameItem>) => {
      return state.filter((game) => game.id !== action.payload.id);
    },
  },
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
