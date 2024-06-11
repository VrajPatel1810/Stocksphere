import React, { useState, useEffect } from 'react';
import './Signup.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    panCardNumber: '',
    aadharCardNumber: '',
    password: '',
    confirmPassword: ''
  });

  const { firstName, middleName, lastName, email, phoneNumber, panCardNumber, aadharCardNumber, password, confirmPassword } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } 

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
        panCardNumber,
        aadharCardNumber,
        password,
        confirmPassword
      };

      dispatch(register(userData));
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up for StockSphere</h2>
        <form onSubmit={onSubmit}>
          <div className="name-inputs">
            <div className="input-group">
              <input
                type="text"
                placeholder="First Name"
                id="firstName"
                value={firstName}
                name="firstName"
                onChange={onChange}
                autoComplete="given-name"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Middle Name (Optional)"
                id="middleName"
                value={middleName}
                name="middleName"
                onChange={onChange}
                autoComplete="additional-name"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Last Name"
                id="lastName"
                value={lastName}
                name="lastName"
                onChange={onChange}
                autoComplete="family-name"
              />
            </div>
          </div>
          <div className="input-group-row">
            <div className="input-group">
              <input
                type="email"
                placeholder="Email ID"
                id="email"
                value={email}
                name="email"
                onChange={onChange}
                autoComplete="email"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Phone Number (+91)"
                id="phoneNumber"
                value={phoneNumber}
                name="phoneNumber"
                onChange={onChange}
                autoComplete="tel-national"
              />
            </div>
          </div>
          <div className="cards-inputs">
            <div className="input-group">
              <input
                type="text"
                placeholder="Pan Card Number"
                id="panCardNumber"
                value={panCardNumber}
                name="panCardNumber"
                onChange={onChange}
                autoComplete="off"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Aadhar Card Number"
                id="aadharCardNumber"
                value={aadharCardNumber}
                name="aadharCardNumber"
                onChange={onChange}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="password-inputs">
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                value={password}
                name="password"
                onChange={onChange}
                autoComplete="new-password"
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
                id="confirmPassword"
                value={confirmPassword}
                name="confirmPassword"
                onChange={onChange}
                autoComplete="new-password"
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
          <button type='submit' className="btn signup-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
