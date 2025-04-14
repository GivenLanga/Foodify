import React from "react";
import "./banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <div className="page-content">
        <h1 className="page-font" data-content="FOODIFY">
          FOODIFY
        </h1>

        <div className="center-img"></div>
      </div>
      <div className="card-container">
        <a href="noreferrer" alt="Mythrill" target="_blank">
          <div className="card">
            <div className="wrapper">
              <img
                alt=""
                src="./Assets/Sushi Sensations_ Tempting Japanese Delicacies.jpeg"
                className="cover-image"
              />
            </div>

            <img
              alt=""
              src="./Assets/no-bg/Creative_Sushi_Creations__Japanese_Culinary_Art-removebg-preview.png"
              className="character"
            />
          </div>
        </a>
        <a href="noreferrer" alt="Mythrill" target="_blank">
          <div className="card">
            <div className="wrapper">
              <img
                alt=""
                src="./Assets/Delicious & Nutritious Shrimp Recipes.jpeg"
                className="cover-image"
              />
            </div>

            <img
              alt=""
              src="./Assets/no-bg/Shrimp_on_skewers_against_the_background_of_fire-removebg-preview.png"
              className="character"
            />
          </div>
        </a>
        <a href="noreferrer" alt="Mythrill" target="_blank">
          <div className="card">
            <div className="wrapper">
              <img
                alt=""
                src="./Assets/Margherita Pizza.jpeg"
                className="cover-image"
              />
            </div>

            <img
              alt=""
              src="./Assets/no-bg/tto-removebg-preview.png"
              className="character"
            />
          </div>
        </a>
        <a href="noreferrer" alt="Mythrill" target="_blank">
          <div className="card">
            <div className="wrapper">
              <img
                alt=""
                src="./Assets/Juicy & Aesthetic Burger Photography That Will Make You Crave a Bite!.jpeg"
                className="cover-image"
              />
            </div>

            <img
              alt=""
              src="./Assets/no-bg/Fresh_Burger-removebg-preview.png"
              className="character"
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Banner;
