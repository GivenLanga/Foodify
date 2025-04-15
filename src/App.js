import React, { Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Lazy load components
const Navbar = React.lazy(() => import("./componets/navbar/Navbar"));
const Favorites = React.lazy(() =>
  import("./componets/pages/favorites/Favorites")
);
const Banner = React.lazy(() => import("./componets/banner/Banner"));
const Slogan = React.lazy(() => import("./componets/slogan/Slogan"));
const Review = React.lazy(() => import("./componets/review-s/Review"));
const Footer = React.lazy(() => import("./componets/footer/Footer"));
const Trending = React.lazy(() => import("./componets/Trending/Trending"));
const SearchMeals = React.lazy(() => import("./componets/pages/search/Search"));
const Diets = React.lazy(() => import("./componets/Diets/Diets"));

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Main content components */}
            <Route
              path="/search"
              element={
                <ErrorBoundary>
                  <SearchMeals />
                </ErrorBoundary>
              }
            ></Route>
            <Route
              path="/"
              element={
                <ErrorBoundary>
                  <>
                    <Navbar />
                    <Banner />
                    <Slogan />
                    <Trending />
                    <Diets />
                    <Review />
                    <Footer />
                  </>
                </ErrorBoundary>
              }
            />
            <Route
              path="/Favorites"
              element={
                <ErrorBoundary>
                  <Favorites />
                </ErrorBoundary>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
