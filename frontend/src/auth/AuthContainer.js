import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./authContainer.css";

const AuthContainer = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className={`auth-container ${isSignUp ? "sign-up-mode" : ""}`}>
      <div className="forms-wrap">
        {isSignUp ? <Register /> : <Login />}
        <button onClick={toggleAuthMode} className="toggle-btn">
          {isSignUp
            ? "Already have an account? Sign in"
            : "Don't have an account? Sign up"}
        </button>
      </div>

      {/* Carousel with updated image paths */}
      <div className="carousel">
        <div className="carousel">
          <img
            src="/assets/auth-1.png"
            alt="Auth graphic 1"
            className="carousel-image"
          />
          <img
            src="/assets/auth-2.png"
            alt="Auth graphic 2"
            className="carousel-image"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
