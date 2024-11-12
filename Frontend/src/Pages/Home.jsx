import React from "react";
import "./CSS/Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <h1>

        One-stop solution for all notes for SVVV students, organized by subject
        and semesters
      </h1>
      <div className="home-animation">
        <dotlottie-player
          src="https://lottie.host/048466fd-9bef-416c-b642-b1be786cbf1d/sMCQUNBO9V.json"
          background="transparent"
          speed="1"
          style={{ width: "400px", height: "500px" }}
          loop
          autoplay
        ></dotlottie-player>

        <dotlottie-player
          src="https://lottie.host/c9ffde9a-7972-4f26-b88a-3e11933e55c9/DRMzrfE3oF.json"
          background="transparent"
          speed="1"
          style={{ width: "300px", height: "300px" }}
          loop
          autoplay
        ></dotlottie-player>

        <dotlottie-player
          src="https://lottie.host/9da9580e-4009-4c28-9f5c-a3220b026e2d/9cRQsxSthL.json"
          background="transparent"
          speed="1"
          style={{ width: "300px", height: "600px" }}
          loop
          autoplay
        ></dotlottie-player>
      </div>
    </div>
  );
};

export default Home;
