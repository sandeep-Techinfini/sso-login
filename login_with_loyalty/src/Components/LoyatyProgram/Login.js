import React, { useState } from "react";
import "./LoyaltyProgram.css";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate()
  const handleFormData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  var data = JSON.stringify({
    from: "username-password",
    to: "bearer",
    email: formData.email,
    password: formData.password,
  });

  var config = {
    method: "post",
    url: "http://localhost:3030/exchange-credentials",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.token));
        var config = {
          method: "get",
          url: "http://localhost:3030/check-authentication",
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        };
        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            localStorage.setItem("profile",JSON.stringify(response.data))
            navigate("/")
 
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="loyalty-warapper">
      <h1> other Application </h1>
      <form>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleFormData}
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
            name="password"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={handleFormData}
          />
        </div>
        <div className="form-group form-check"></div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={loginHandler}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
