# Foodify

## 🔗 Project Link

[Foodify Live Demo](https://foodifymeals.netlify.app/)

---

Foodify is a web application that allows users to explore and search for recipes. The application features a navigation bar, a banner, a slogan section, user reviews, and a footer. Users can search for recipes using the search bar or explore all recipes using the "Explore Recipes" button.

## 🌟 Features

- **Navigation Bar**: Provides links to different sections of the application.
- **Banner**: Displays a banner image or message.
- **Slogan**: Showcases the application's slogan.
- **User Reviews**: Displays user reviews and ratings.
- **Footer**: Contains social media links, a newsletter subscription form, and a back-to-top button.
- **Search Functionality**: Allows users to search for recipes by entering a query in the search bar or by clicking the "Explore Recipes" button.
- **Favorites Management**: Add and remove favorite recipes using Redux.
- **Diet-Based Search**: Search for recipes by diet using the Spoonacular API.
- **Responsive Design**: Fully responsive design for seamless use across devices.

---

## 📚 About the API(s)

Foodify integrates three powerful APIs to provide a comprehensive recipe search experience. Each API contributes unique features and capabilities, ensuring users have access to a wide variety of recipes and search options.

### 1. TheMealDB API

- **Overview**: A free API offering a collection of recipes with detailed information, including ingredients, instructions, and images.
- **Strengths**:
  - Provides instructions for recipes.
  - Includes a wide variety of recipes from different cuisines.
  - Enhances user experience with recipe images.
- **Limitations**:
  - Limited search options (primarily ingredient-based).
  - Some ingredients are listed in foreign languages.
- **Usage in Foodify**:
  - Used for ingredient-based searches in the search component.
  - Recipes fetched are displayed alongside results from other APIs.

### 2. Forkify API

- **Overview**: An API providing a large collection of recipes sourced from various websites.
- **Strengths**:
  - Supports a wide range of search queries.
  - Provides high-quality images for recipes.
- **Limitations**:
  - Does not include instructions for recipes.
- **Usage in Foodify**:
  - Used for general recipe searches in the search component.
  - Recipes fetched include titles, images, and links to the source.

### 3. Spoonacular API

- **Overview**: A robust API offering advanced search capabilities, including dietary preferences, cuisines, and meal types.
- **Strengths**:
  - Supports multiple search categories (e.g., Keto, Vegan, Paleo).
  - Provides detailed nutritional information and recipe instructions.
- **Limitations**:
  - Requires an API key with limited free-tier usage.
- **Usage in Foodify**:
  - Primarily used in the diet component for diet-based recipe searches.
  - Integrated into the search component for additional search options.

---

## 🛠️ How the APIs Work Together

- **Search Component**:
  - Combines results from all three APIs to display a unified list of recipes.
  - Users can search by ingredients, diets, or general queries.
- **Diet Component**:
  - Uses Spoonacular to fetch recipes based on dietary preferences.
- **Get Recipe Button**:

  - Fetches detailed recipe information from TheMealDB or Forkify, depending on the source.

- **Trending Component**:
  - Uses the Forkify to to pull recipes and change then after every 5 seconds

### Benefits of Using Multiple APIs

- **Diversity**: Access to a wide variety of recipes from different sources.
- **Flexibility**: Supports multiple search options, including ingredient-based and diet-based searches.
- **Enhanced User Experience**: Combines the strengths of each API for a seamless recipe search experience.

---

## 📂 Project Structure

```
foodify/
├── public/
├── src/
│   ├── components/
│   │   ├── banner/
│   │   │   └── Banner.js
│   │   ├── footer/
│   │   │   ├── Footer.js
│   │   │   └── footer.css
│   │   ├── navbar/
│   │   │   ├── Navbar.js
│   │   │   └── navbar.css
│   │   ├── pages/
│   │   │   ├── search/
│   │   │   │   ├── Search.js
│   │   │   │   └── searchmeal.css
│   │   ├── review-s/
│   │   │   ├── Review.js
│   │   │   └── review.css
│   │   ├── slogan/
│   │   │   └── Slogan.js
│   ├── App.js
│   ├── index.js
├── package.json
└── README.md
```

---

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GivenLanga/foodify.git
   ```
2. Navigate to the project directory:
   ```bash
   cd foodify
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 📧 Contact

For any inquiries, please contact [langamind@gmail.com].

---

## 🐞 Known Issues

- **API Rate Limits**: Spoonacular API has a limited free-tier quota, which may cause errors if the limit is exceeded.
- **Foreign Language Ingredients**: Some ingredients from TheMealDB API are listed in foreign languages, which may confuse users.
- **Recipe Instructions Missing**: Forkify API does not provide recipe instructions, requiring users to visit the source website for details.
- **Search Inconsistencies**: Combining results from multiple APIs may occasionally lead to duplicate or irrelevant recipes.
- **Mobile Responsiveness**: While the design is responsive, some components may require further optimization for smaller screens.
