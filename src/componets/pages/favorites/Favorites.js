import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../../../redux/slices/favoritesSlice";
import "./Favorites.css";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites); // Get favorites from Redux
  const dispatch = useDispatch();

  const handleRemoveFavorite = (mealId) => {
    dispatch(removeFavorite({ idMeal: mealId })); // Dispatch the removeFavorite action
  };

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">Your Favorite Recipes</h2>
      {favorites.length === 0 ? (
        <p className="no-favorites">No favorite recipes yet.</p>
      ) : (
        <div className="recipe-cards-container">
          {favorites.map((meal) => (
            <div key={meal.idMeal} className="recipe-card">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="recipe-image"
              />
              <h3>{meal.strMeal}</h3>
              <button
                className="get-recipe-btn"
                onClick={() => handleRemoveFavorite(meal.idMeal)}
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
