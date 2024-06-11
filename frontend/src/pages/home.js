import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';

function Home() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="navbar">
          <div className="logo">StockSphere</div>
          
          {user ? (
            <div className="auth-button">
              <button className="btn login-signup" onClick={onLogout}>Log Out</button>
            </div>) : (
          <Link to="/login">
            <div className="auth-button">
              <button className="btn login-signup">Log In / Sign Up</button>
            </div>
          </Link>)}
        </div>
        <div className="hero-section">
          <h1>Effortless Trading to Optimize Your Investments</h1>
          <p>Manage and track your stocks seamlessly with StockSphere. Follow our expert guidance to enhance your trading strategies.</p>
        </div>
      </header>
      <main>
        <section className="benefits-section">
          <h2>Exceptional Services Tailored to Your Needs</h2>
          <div className="benefits">
            <div className="benefit benefit1">
              <h3>User-Friendly Interface</h3>
              <p>Navigate our platform with ease, designed with you in mind.</p>
            </div>
            <div className="benefit benefit2">
              <h3> Stock Tracking</h3>
              <p>Monitor your investments with accurate data and analytics.</p>
            </div>
            <div className="benefit benefit3">
              <h3>Seamless Transactions</h3>
              <p>Buy and sell stocks effortlessly with our intuitive interface.</p>
            </div>
            <div className="benefit benefit4">
              <h3>Personalized Portfolio Management</h3>
              <p>View customized portfolio based on your investments.</p>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-content">
          <p>Contact us at <a href="mailto:reachstocksphere@gmail.com" className="email">reachstocksphere@gmail.com</a></p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
