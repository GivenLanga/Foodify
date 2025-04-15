import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./componets/navbar/Navbar";
import Favorites from "./componets/pages/favorites/Favorites";
import Banner from "./componets/banner/Banner";
import Slogan from "./componets/slogan/Slogan";
import Review from "./componets/review-s/Review";
import Footer from "./componets/footer/Footer";
import Trending from "./componets/Trending/Trending";
import SearchMeals from "./componets/pages/search/Search";
import Diets from "./componets/Diets/Diets";

/*

";


 */
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main content components */}
          <Route path="/search" element={<SearchMeals />}></Route>
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
          <Route path="/Favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
