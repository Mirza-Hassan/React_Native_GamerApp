import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { GameItem, GamesState } from '../screens/type';

const API_URL = 'https://mock-game-api-9a408f047f23.herokuapp.com/api/games';

const initialState: GamesState = {
  games: [],
  status: 'idle',
  error: null,
};

export const fetchGames = createAsyncThunk<GameItem[]>('games/fetchGames', async () => {
  const response = await axios.get(API_URL, {
    headers: { 'X-API-Key': "01964fa8-f0e5-40fc-a13b-9f5c3a5415f3" },
  });
  return response.data;
});

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGames.fulfilled, (state, action: PayloadAction<GameItem[]>) => {
        state.status = 'succeeded';
        state.games = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch games';
      });
  },
});

export default gamesSlice.reducer;
