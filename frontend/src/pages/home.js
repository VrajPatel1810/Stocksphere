import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';

function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="App">
      <header className="App-header">
        {user ? (
          <Navbar />
        ) : (
          <div className="navbar">
            <div className="logo">StockSphere</div>
            <div className='login-button'>
              <Link to="/login">
                <button className="btn login-signup">Log In / Sign Up</button>
              </Link>
            </div>
          </div>
        )}
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
              <h3>Stock Tracking</h3>
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
          <p>Contact us at <a href="mailto:contactstocksphere@gmail.com" className="email">contactstocksphere@gmail.com</a></p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
