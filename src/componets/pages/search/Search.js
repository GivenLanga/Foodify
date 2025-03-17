import { useState, useEffect } from "react";
import "./searchmeal.css";

const SearchMeals = () => {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("query");
    if (searchQuery) {
      setQuery(searchQuery);
      fetchMealList(searchQuery);
    }
  }, []);

  const fetchMealList = async (query) => {
    if (!query) return;
    setMeals([]);
    setError(null);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`
      );
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (error) {
      setError("Error fetching meals. Please try again.");
    }
  };

  const fetchMealRecipe = async (mealId) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      const data = await response.json();
      setSelectedMeal(data.meals[0]);
    } catch (error) {
      setError("Error fetching recipe details.");
    }
  };

  return (
    <div>
      <div className="search-box">
        <input
          type="text"
          id="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes..."
        />
        <button id="search-btn" onClick={() => fetchMealList(query)}>
          Search
        </button>
      </div>
      <div id="meal">
        {meals.length === 0 && !error && (
          <p className="loading">Loading meals...</p>
        )}
        {error && <p className="error-message">{error}</p>}
        {meals.map((meal) => (
          <div key={meal.idMeal} className="meal-item" data-id={meal.idMeal}>
            <div className="meal-img">
              <img src={meal.strMealThumb} alt="food" />
            </div>
            <div className="meal-name">
              <h3>{meal.strMeal}</h3>
              <button
                className="recipe-btn"
                onClick={() => fetchMealRecipe(meal.idMeal)}
              >
                Get Recipe
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedMeal && (
        <div className="meal-details showRecipe">
          <div className="meal-details-content">
            <h2 className="recipe-title">{selectedMeal.strMeal}</h2>
            <p className="recipe-category">{selectedMeal.strCategory}</p>
            <div className="recipe-instruct">
              <h3>Instructions:</h3>
              <p>{selectedMeal.strInstructions}</p>
            </div>
            <div className="recipe-meal-img">
              <img src={selectedMeal.strMealThumb} alt="" />
            </div>
            <div className="recipe-link">
              <a
                href={selectedMeal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Video
              </a>
            </div>
            <button id="recipe-close-btn" onClick={() => setSelectedMeal(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchMeals;
