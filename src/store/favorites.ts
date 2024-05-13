import {createSlice} from '@reduxjs/toolkit';
import {GifItem} from '../types/types';

interface FavoritesState {
  favoriteItems: GifItem[];
}

const initialState: FavoritesState = {
  favoriteItems: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favoriteItems.push(action.payload);
    },
    removeFavorite: (state, action) => {
      const filteredFavoriteItems = state.favoriteItems.filter(
        item => item.id !== action.payload.id,
      );
      state.favoriteItems = filteredFavoriteItems;
    },
    resetFavorites: state => {
      state.favoriteItems = [];
    },
  },
});
export const {addFavorite, removeFavorite, resetFavorites} =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
