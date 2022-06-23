import React from "react";
import "./LoyaltyRegister.css";
import { Link } from "react-router-dom";
const LoyaltyRegister = () => {
  return (
    <div className="loyalty-warapper">
      <h1> other Application </h1>
      <form>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div className="form-group form-check"></div>
        <div className="btn-wrapper">
          <div className="btn-login">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
          <div>
            <Link to="/loyalty">
              <button type="submit" className="btn btn-primary">
                Login with Loyalty
              </button>
            </Link>
          </div>
        </div>
        <Link to="/">Already registered please login</Link>
      </form>
    </div>
  );
};

export default LoyaltyRegister;
