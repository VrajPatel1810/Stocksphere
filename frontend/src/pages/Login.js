// Login.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to StockSphere</h2>
        <form onSubmit={onSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email ID"
              id="email"
              value={email}
              name="email"
              onChange={onChange}
            />
          </div>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              value={password}
              name="password"
              onChange={onChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-password-btn"
            >
              <i className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
            </button>
          </div>
          <div className="form-options">
            <button className="btn login-btn">Login</button>
            <div className="forgot-password">Forgot Password?</div>
          </div>
        </form>
        <div className="signup-link">
          Don't have an account?
          <Link to="/signup" className='signup-link'>Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
