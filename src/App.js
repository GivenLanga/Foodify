import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./componets/navbar/Navbar";
import Banner from "./componets/banner/Banner";
import Slogan from "./componets/slogan/Slogan";
import Review from "./componets/reviewss/Review";
import Footer from "./componets/footer/Footer";
import SearchMeals from "./componets/pages/search/Search"; // Adjust the path if necessary

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Banner />
        <Slogan />
        <Review />
        <Footer />
        <Routes>
          <Route path="/search" element={<SearchMeals />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
