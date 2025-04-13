import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./componets/navbar/Navbar";
import Favorites from "./componets/pages/favorites/Favorites";
import Banner from "./componets/banner/Banner";
/*
import Slogan from "./components/slogan/Slogan";
import Review from "./components/review-s/Review";
import Footer from "./components/footer/Footer";
import SearchMeals from "./components/pages/search/Search";
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main content components */}
          {/*  
        <Slogan />
        <Review />
        <Footer /> */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Banner />
              </>
            }
          />
          <Route path="/Favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
