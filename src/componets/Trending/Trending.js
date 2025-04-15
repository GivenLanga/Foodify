import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/slices/favoritesSlice";
import "./Trending.css";

function Trending() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const [recipes, setRecipes] = useState([]); // State to store recipes
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0); // State to track the current recipe group
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to store the selected recipe details

  // Fetch recipes from the Foodify API
  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
      );
      const data = await response.json();
      setRecipes(data.meals || []); // Set recipes or an empty array if no data
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes(); // Fetch recipes when the component mounts
  }, []);

  useEffect(() => {
    // Change the recipe group every 5 seconds
    const interval = setInterval(() => {
      setCurrentRecipeIndex((prevIndex) =>
        recipes.length > 0 ? (prevIndex + 4) % recipes.length : 0
      );
    }, 5000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [recipes]);

  const handleGetRecipe = (recipe) => {
    setSelectedRecipe(recipe); // Set the selected recipe to display its details
  };

  const handleCloseRecipe = () => {
    setSelectedRecipe(null); // Close the recipe details
  };

  // Check if a recipe is already in favorites
  const isFavorite = (idMeal) => {
    return favorites.some((meal) => meal.idMeal === idMeal);
  };

  // Add recipe to favorites
  const handleAddFavorite = (recipe) => {
    dispatch(addFavorite(recipe));
  };

  // Remove recipe from favorites
  const handleRemoveFavorite = (idMeal) => {
    dispatch(removeFavorite({ idMeal }));
  };

  // Get the current group of 4 recipes
  const currentRecipes = recipes.slice(
    currentRecipeIndex,
    currentRecipeIndex + 4
  );

  return (
    <div className="trending">
      <div className="trending__deco">
        <h1 className="trending__text">Trending Recipes</h1>
        <span className="chef">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            id="chef"
          >
            <path d="M36 48H12a1 1 0 0 1-.997-.923L9.07 21.946C5.095 21.484 2 18.097 2 14c0-4.419 3.678-8.151 8.032-8.151.91 0 1.803.177 2.636.52C14.072 2.509 18.439 0 24 0c5.224 0 8.878 2.112 11.14 6.45a6.928 6.928 0 0 1 2.828-.602C42.322 5.849 46 9.581 46 14c0 4.097-3.095 7.484-7.07 7.946l-1.933 25.131A1 1 0 0 1 36 48zm-23.074-2h22.147l1.929-25.077c.041-.521.476-.923.998-.923 3.309 0 6 2.691 6 6 0 3.625-3.179 6.151-6.032 6.151-.982 0-1.899-.274-2.724-.817a.999.999 0 0 1-1.464-.432C31.898 3.981 28.791 2 24 2c-5.157 0-9.059 2.415-9.71 6.009a.998.998 0 0 1-1.533.657 4.876 4.876 0 0 0-2.724-.817C7.179 7.849 4 10.375 4 14c0 3.309 2.691 6 6 6a1 1 0 0 1 .997.923L12.926 46z"></path>
            <path d="M36.625 40h-25.25a1 1 0 1 1 0-2h25.25a1 1 0 1 1 0 2z"></path>
            <path d="M19 40a1 1 0 0 1-1-1v-8a1 1 0 1 1 2 0v8a1 1 0 0 1-1 1zM24 40a1 1 0 0 1-1-1V29a1 1 0 1 1 2 0v10a1 1 0 0 1-1 1zM29 40a1 1 0 0 1-1-1v-8a1 1 0 1 1 2 0v8a1 1 0 0 1-1 1z"></path>
          </svg>
        </span>
      </div>
      <p className="trending__p">
        Your curiosity writes the trends. Here's what's stealing the spotlight!
      </p>
      {recipes.length > 0 ? (
        <div className="recipe-cards-container">
          {currentRecipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <h2>{recipe.strMeal}</h2>
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="recipe-image"
              />
              <p>{recipe.strCategory}</p>
              <button
                className="get-recipe-btn"
                onClick={() => handleGetRecipe(recipe)}
              >
                Get Recipe
              </button>
              {isFavorite(recipe.idMeal) ? (
                <button
                  className="remove-favorite-btn"
                  onClick={() => handleRemoveFavorite(recipe.idMeal)}
                >
                  Remove from Favorites
                </button>
              ) : (
                <button
                  className="add-favorite-btn"
                  onClick={() => handleAddFavorite(recipe)}
                >
                  Add to Favorites
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading recipes...</p>
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
            <div className="modal-favorite-actions">
              {isFavorite(selectedRecipe.idMeal) ? (
                <button
                  className="remove-favorite-btn"
                  onClick={() => handleRemoveFavorite(selectedRecipe.idMeal)}
                >
                  Remove from Favorites
                </button>
              ) : (
                <button
                  className="add-favorite-btn"
                  onClick={() => handleAddFavorite(selectedRecipe)}
                >
                  Add to Favorites
                </button>
              )}
            </div>
            <button onClick={handleCloseRecipe} className="close-btn">
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Trending;
