import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../../../redux/slices/favoritesSlice";
import SearchIcon from "@mui/icons-material/Search";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu"; // Import Material-UI icon
import HomeIcon from "@mui/icons-material/Home"; // Import Home icon from Material-UI
import "./searchmeal.css";

const SearchMeals = () => {
  const [query, setQuery] = useState(""); // State for search query
  const [meals, setMeals] = useState([]); // State for meals list
  const [selectedMeal, setSelectedMeal] = useState(null); // State for selected meal details
  const [error, setError] = useState(null); // State for error messages
  const [hoveredButton, setHoveredButton] = useState(null); // State to track hovered button
  const dispatch = useDispatch(); // Redux dispatch
  const favorites = useSelector((state) => state.favorites); // Get favorites from Redux

  useEffect(() => {
    // Get query parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("query");
    if (searchQuery) {
      setQuery(searchQuery);
      fetchMealList(searchQuery); // Fetch meals based on query
    }
  }, []);

  const fetchMealList = async (query) => {
    if (!query) return;
    setMeals([]);
    setError(null);

    try {
      // Fetch meals from API
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
      // Fetch meal recipe details from API
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      const data = await response.json();
      setSelectedMeal(data.meals[0]);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("Failed to load recipes. Please try again later.");
    }
  };

  const handleAddToFavorites = (meal) => {
    dispatch(addFavorite(meal)); // Dispatch the addFavorite action
  };

  const handleRemoveFromFavorites = (meal) => {
    dispatch(removeFavorite(meal)); // Dispatch the removeFavorite action
  };

  const isFavorite = (mealId) => {
    return favorites.some((meal) => meal.idMeal === mealId); // Check if the meal is in favorites
  };

  return (
    <div>
      {/* Search box */}
      <nav>
        <div className="search-box">
          <Link className="nav__link" to={"/"}>
            <HomeIcon className="home__icon" />
          </Link>
          <input
            className="input__search"
            type="text"
            id="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for recipes..."
          />
          <button id="search-btn" onClick={() => fetchMealList(query)}>
            <SearchIcon className="search__icon" />
          </button>

          <Link className="nav__link" to="/favorites">
            <FavoriteBorderIcon />
          </Link>
        </div>
      </nav>

      {/* Meals list */}
      <div id="meal" className="meal-container">
        {meals.length === 0 && !error && (
          <p className="loading">Loading meals...</p>
        )}
        {error && <p className="error-message">{error}</p>}
        {meals.map((meal) => (
          <div
            key={meal.idMeal}
            className="meal-item meal-card"
            data-id={meal.idMeal}
          >
            <div className="meal-img">
              <img src={meal.strMealThumb} alt="food" />
            </div>
            <div className="meal-name">
              <h3>{meal.strMeal}</h3>
              <div className="meal__btns">
                <button
                  className="recipe-btn"
                  onMouseEnter={() => setHoveredButton(meal.idMeal)} // Set hovered button ID
                  onMouseLeave={() => setHoveredButton(null)} // Reset hovered button ID
                  onClick={() => fetchMealRecipe(meal.idMeal)}
                >
                  {hoveredButton === meal.idMeal ? (
                    <RestaurantMenuIcon /> // Show icon when hovered
                  ) : (
                    "Get Recipe" // Show text when not hovered
                  )}
                </button>
                {isFavorite(meal.idMeal) ? (
                  <button
                    className="favorites-btn remove-btn"
                    onClick={() => handleRemoveFromFavorites(meal)}
                  >
                    Remove from Favorites
                  </button>
                ) : (
                  <button
                    className="favorites-btn"
                    onClick={() => handleAddToFavorites(meal)}
                  >
                    Add to Favorites
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected meal details */}
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
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchMeals;
