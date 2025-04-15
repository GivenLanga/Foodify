import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../../../redux/slices/favoritesSlice";
import SearchIcon from "@mui/icons-material/Search";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import HomeIcon from "@mui/icons-material/Home";
import "./searchmeal.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [error, setError] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams.get("query");
    const dietQuery = urlParams.get("diet");

    if (searchQuery || dietQuery) {
      fetchCombinedMeals(searchQuery, dietQuery);
    }
  }, [location.search]);

  const fetchCombinedMeals = async (query, diet) => {
    setMeals([]);
    setError(null);

    try {
      const forkifyAPI = query
        ? fetch(
            `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=f8a6a686-a18e-471a-9f7a-d6a7a2bb43eb`
          ).then((res) => res.json())
        : Promise.resolve({ data: { recipes: [] } });

      const mealDBAPI = query
        ? fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`
          ).then((res) => res.json())
        : Promise.resolve({ meals: [] });

      const spoonacularAPI = diet
        ? fetch(
            `https://api.spoonacular.com/recipes/complexSearch?diet=${diet}&apiKey=96f1badc1c3a4eb980fd9e4663ccfbf8`
          ).then((res) => res.json())
        : Promise.resolve({ results: [] });

      const [forkifyData, mealDBData, spoonacularData] = await Promise.all([
        forkifyAPI,
        mealDBAPI,
        spoonacularAPI,
      ]);

      const forkifyMeals = (forkifyData.data.recipes || []).map((item) => ({
        idMeal: item.id,
        strMeal: item.title,
        strMealThumb: item.image_url,
        fromForkify: true,
      }));

      const mealDBMeals = (mealDBData.meals || []).map((meal) => ({
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
        fromForkify: false,
      }));

      const spoonacularMeals = (spoonacularData.results || []).map((meal) => ({
        idMeal: meal.id,
        strMeal: meal.title,
        strMealThumb: meal.image,
        fromForkify: false,
      }));

      const combinedMeals = [
        ...forkifyMeals,
        ...mealDBMeals,
        ...spoonacularMeals,
      ];

      if (combinedMeals.length === 0) {
        setError("No recipes found.");
      }

      setMeals(combinedMeals);
    } catch (error) {
      console.error("Error fetching meals:", error);
      setError("Error fetching meals. Please try again.");
    }
  };

  const fetchMealRecipe = async (mealId, fromForkify = false) => {
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

      setSelectedMeal(data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setError("Failed to load recipes. Please try again later.");
    }
  };

  const handleAddToFavorites = (meal) => {
    dispatch(addFavorite(meal));
  };

  const handleRemoveFromFavorites = (meal) => {
    dispatch(removeFavorite(meal));
  };

  const isFavorite = (mealId) => {
    return favorites.some((meal) => meal.idMeal === mealId);
  };

  return (
    <div>
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
          <button
            id="search-btn"
            onClick={() => fetchCombinedMeals(query, null)}
          >
            <SearchIcon className="search__icon" />
          </button>

          <Link className="nav__link" to="/favorites">
            <FavoriteBorderIcon />
          </Link>
        </div>
      </nav>

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
                  onMouseEnter={() => setHoveredButton(meal.idMeal)}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={() => fetchMealRecipe(meal.idMeal, meal.fromForkify)}
                >
                  {hoveredButton === meal.idMeal ? (
                    <RestaurantMenuIcon />
                  ) : (
                    "Get Recipe"
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

export default Search;
