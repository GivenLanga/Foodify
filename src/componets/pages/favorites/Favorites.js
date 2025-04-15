import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../../../redux/slices/favoritesSlice";
import "./Favorites.css";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites); // Get favorites from Redux
  const dispatch = useDispatch();
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to store the selected recipe details

  const handleRemoveFavorite = (mealId) => {
    dispatch(removeFavorite({ idMeal: mealId })); // Dispatch the removeFavorite action
  };

  const handleGetRecipe = async (mealId, fromForkify = false) => {
    try {
      let data;

      if (fromForkify) {
        const response = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${mealId}?key=f8a6a686-a18e-471a-9f7a-d6a7a2bb43eb`
        );
        const json = await response.json();
        const recipe = json.data.recipe;

        data = {
          strMeal: recipe.title,
          strCategory: recipe.publisher,
          strInstructions: recipe.instructions || "Instructions not provided.",
          strMealThumb: recipe.image_url,
          strYoutube: recipe.source_url,
        };
      } else {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        const json = await response.json();
        data = json.meals[0];
      }

      setSelectedRecipe(data); // Set the selected recipe details
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  const handleCloseRecipe = () => {
    setSelectedRecipe(null); // Close the recipe details
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
                onClick={() => handleGetRecipe(meal.idMeal, meal.fromForkify)}
              >
                Get Recipe
              </button>
              <button
                id="remove"
                className="remove-favorite-btn"
                onClick={() => handleRemoveFavorite(meal.idMeal)}
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedRecipe && (
        <>
          <div className="overlay" onClick={handleCloseRecipe}></div>
          <div className="recipe-details">
            <h2>{selectedRecipe.strMeal}</h2>
            <p>
              <strong>Category:</strong> {selectedRecipe.strCategory}
            </p>
            <p>
              <strong>Instructions:</strong> {selectedRecipe.strInstructions}
            </p>
            <img
              src={selectedRecipe.strMealThumb}
              alt={selectedRecipe.strMeal}
              className="recipe-image"
            />
            <a
              href={selectedRecipe.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="recipe-video-link"
            >
              Watch Video
            </a>
            <button onClick={handleCloseRecipe} className="close-btn">
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
