import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Diets.css";

const diets = [
  {
    name: "Mediterranean",
    image:
      "https://i.pinimg.com/474x/36/b0/fc/36b0fcc20d1c90ce291be2d6a5217a8b.jpg",
    foods: `✅ Focuses on:
  - Whole grains, fruits, vegetables
  - Legumes, nuts, seeds
  - Olive oil as the main fat
  - Moderate fish and poultry
  - Minimal red meat and sugar
  - Wine in moderation (optional)
  
  🍽 Example Meals:
  - Breakfast: Greek yogurt with honey, walnuts, and berries
  - Lunch: Quinoa salad with cucumbers, tomatoes, feta, olives, and olive oil
  - Dinner: Grilled salmon, roasted vegetables, and a side of couscous
  - Snack: Hummus with carrots or a handful of almonds`,
  },
  {
    name: "Keto",
    image:
      "https://i.pinimg.com/474x/ec/e5/bf/ece5bf521e1cb557c0f63b01df2c71a9.jpg",
    foods: `✅ Focuses on:
  - High fat, moderate protein, very low carbs
  - Puts your body in a state of ketosis (burns fat for fuel)
  
  🍽 Example Meals:
  - Breakfast: Scrambled eggs with avocado and bacon
  - Lunch: Chicken Caesar salad (no croutons) with full-fat dressing
  - Dinner: Grilled steak with garlic butter and sautéed spinach
  - Snack: Cheese cubes or boiled eggs`,
  },
  {
    name: "Vegan",
    image:
      "https://i.pinimg.com/474x/3a/b1/0e/3ab10e08a645350f0ddb674294d41ed3.jpg",
    foods: `✅ Focuses on:
  - 100% plant-based; excludes all animal products (meat, dairy, eggs, honey)
  - Often for ethical, environmental, or health reasons
  
  🍽 Example Meals:
  - Breakfast: Oatmeal with almond milk, banana, and chia seeds
  - Lunch: Lentil soup with whole grain bread
  - Dinner: Tofu stir-fry with brown rice and vegetables
  - Snack: Fruit smoothie or trail mix`,
  },
  {
    name: "Vegetarian",
    image:
      "https://i.pinimg.com/474x/10/5f/73/105f7303c5f3b338e24aabb0472cd76c.jpg",
    foods: `✅ Focuses on:
  - No meat or fish, but includes dairy and/or eggs (depending on type)
  - More flexible than veganism
  
  🍽 Example Meals:
  - Breakfast: Omelet with spinach, mushrooms, and cheese
  - Lunch: Grilled vegetable sandwich with mozzarella
  - Dinner: Chickpea curry with rice
  - Snack: Yogurt with granola`,
  },
  {
    name: "Paleo",
    image:
      "https://i.pinimg.com/474x/78/23/7f/78237f708754ac4535acc56479470950.jpg",
    foods: `✅ Focuses on:
  - Foods that might have been eaten during the Paleolithic era
  - Includes meat, fish, fruits, vegetables, nuts, seeds
  - Excludes grains, legumes, dairy, processed foods
  
  🍽 Example Meals:
  - Breakfast: Eggs cooked in coconut oil with sweet potatoes
  - Lunch: Lettuce-wrapped turkey burger with avocado
  - Dinner: Grilled chicken with roasted brussels sprouts and a fruit salad
  - Snack: Mixed nuts or sliced apples with almond butter`,
  },
  {
    name: "Low-Carb",
    image:
      "https://i.pinimg.com/474x/fb/de/a4/fbdea4157b1ce4fd7fdf12d0af09e449.jpg",
    foods: `✅ Focuses on:
    
  - Reducing carbohydrate intake, not necessarily as extreme as keto
  - Often used for weight loss and managing blood sugar
  
  🍽 Example Meals:
  - Breakfast: Cottage cheese with cucumber and cherry tomatoes
  - Lunch: Tuna salad wrapped in lettuce leaves
  - Dinner: Baked chicken breast with green beans and mashed cauliflower
  - Snack: Hard-boiled eggs or celery with peanut butter`,
  },
];

function Diets() {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleDietClick = (dietName) => {
    // Navigate to the search page with the diet as a query parameter
    navigate(`/search?diet=${dietName}`);
  };

  return (
    <div className="diets">
      <h2 className="diets__text">Explore Different Diets</h2>
      <p className="diets__p">
        🔥 Your plate, your power. Discover more flavor paths.
      </p>

      <div className="card">
        {diets.map((diet, index) => (
          <p
            key={index}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleDietClick(diet.name)}
          >
            {/* Render the image */}
            <img src={diet.image} alt={diet.name} className="diet-image" />
            {hovered === index ? (
              <span className="description fade-up">{diet.foods}</span>
            ) : (
              <span className="diet-name">{diet.name}</span>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Diets;
