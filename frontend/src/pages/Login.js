// Login.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } 

    if (isSuccess || user) {
      navigate('/stocks');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password
    };

    dispatch(login(userData));
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
            <button type = 'submit' className="btn login-btn">Login</button>
            <Link to="/forgotpassword"><div className="forgot-password">Forgot Password?</div></Link>
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
