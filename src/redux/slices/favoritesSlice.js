import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      // Add the meal to favorites if it's not already added
      const exists = state.find(
        (meal) => meal.idMeal === action.payload.idMeal
      );
      if (!exists) {
        state.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      // Remove the meal from favorites
      return state.filter((meal) => meal.idMeal !== action.payload.idMeal);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
