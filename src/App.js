import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./componets/navbar/Navbar";
import Favorites from "./componets/pages/favorites/Favorites";
import Banner from "./componets/banner/Banner";
import Slogan from "./componets/slogan/Slogan";
import Review from "./componets/review-s/Review";
import Footer from "./componets/footer/Footer";
import Tranding from "./componets/Tranding/Tranding";
import SearchMeals from "./componets/pages/search/Search";
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
              <>
                <Navbar />
                <Banner />
                <Slogan />
                <Tranding />
                <Review />
                <Footer />
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
