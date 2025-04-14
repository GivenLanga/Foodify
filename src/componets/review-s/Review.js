import React from "react";
import "./review.css";

const Review = () => {
  return (
    <section class="review-section">
      <h2>What Our Users Say</h2>
      <div class="review-container">
        <div class="review-card">
          <img
            src="./Assets/pexels-1831380664-29877967.jpg"
            alt=""
            class="user-img"
          />
          <div class="review-content">
            <h3>John Doe</h3>
            <div class="rating">★★★★★</div>
            <p>
              "Absolutely love this recipe finder! The meals are easy to cook
              and taste amazing."
            </p>
            <img
              src="./Assets/8b36edb7e514ed6d00608d8cfe113bbe.jpg"
              alt=""
              class="review-food"
            />
          </div>
        </div>

        <div class="review-card">
          <img
            src="./Assets/pexels-emad-hussien-830139385-27856326.jpg"
            alt=""
            class="user-img"
          />
          <div class="review-content">
            <h3>Jane Smith</h3>
            <div class="rating">★★★★☆</div>
            <p>
              "Great selection of recipes! Found the perfect dish for my dinner
              party."
            </p>
            <img
              src="./Assets/20 Cod Recipes That Will Make You Say _Holy Fish!_.jpeg"
              alt=""
              class="review-food"
            />
          </div>
        </div>

        <div class="review-card">
          <img
            src="./Assets/pexels-gonzalo-mendiola-95842233-18667111.jpg"
            alt=""
            class="user-img"
          />
          <div class="review-content">
            <h3>Emily Johnson</h3>
            <div class="rating">★★★★★</div>
            <p>
              "This site is a lifesaver! I find new recipes every week that my
              family enjoys."
            </p>
            <img
              src="./Assets/20 Brunch Recipes That Will Make You The Ultimate Weekend Host.jpeg"
              alt=""
              class="review-food"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
