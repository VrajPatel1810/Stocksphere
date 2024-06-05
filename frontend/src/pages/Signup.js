import React, { useState } from 'react';
import './Signup.css';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up for StockSphere</h2>
        <form>
          <div className="name-inputs">
            <div className="input-group">
              <input type="text" placeholder="First Name" />
            </div>
            <div className="input-group">
              <input type="text" placeholder="Middle Name (Optional)" />
            </div>
            <div className="input-group">
              <input type="text" placeholder="Last Name" />
            </div>
          </div>
          <div className="input-group-row">
            <div className="input-group">
              <input type="email" placeholder="Email ID" />
            </div>
            <div className="input-group">
              <input type="text" placeholder="Phone Number (+91)" />
            </div>
          </div>
          <div className="cards-inputs">
            <div className="input-group">
              <input type="text" placeholder="Pan Card Number" />
            </div>
            <div className="input-group">
              <input type="text" placeholder="Aadhar Card Number" />
            </div>
          </div>
          <div className="password-inputs">
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="toggle-password-btn"
              >
                <i className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
              </button>
            </div>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="toggle-password-btn"
              >
                <i className={showConfirmPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
              </button>
            </div>
          </div>
          <button className="btn signup-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
