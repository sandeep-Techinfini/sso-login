import React from "react";
import { Link } from "react-router-dom";
import "./LoyaltyProgram.css"
const LoyaltyProgram = () => {
  return (
    <div className="loyalty-warapper">
      <h1> Loyalty Program </h1>
      <Link to="/loyalty-login">
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </Link>
      <Link to="/loyalty-register">
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </Link>
    </div>
  );
};

export default LoyaltyProgram;
