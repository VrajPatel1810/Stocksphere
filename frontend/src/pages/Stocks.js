import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Stocks.css';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';

function Stocks() {
  const [stocks, setStocks] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=cpg5o4hr01qo2291i2b0cpg5o4hr01qo2291i2bg');
        const stockSymbols = response.data.slice(0, 20).map(stock => stock.symbol); // Fetch 20 stocks

        const stockDetails = await Promise.all(
          stockSymbols.map(async symbol => {
            const res = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=cpg5o4hr01qo2291i2b0cpg5o4hr01qo2291i2bg`);
            return {
              symbol,
              description: response.data.find(stock => stock.symbol === symbol).description,
              price: parseFloat(res.data.c).toFixed(2),
              change: parseFloat(res.data.d).toFixed(2),
              changePercent: parseFloat(res.data.dp).toFixed(2)
            };
          })
        );

        // Filter out stocks with price zero
        const validStocks = stockDetails.filter(stock => stock.price > 0);

        setStocks(validStocks);
      } catch (error) {
        console.error('Error fetching stocks data', error);
      }
    };

    fetchStocks();
  }, []);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  return (
    <div className="stocks-container">
      <div className="navbar">
        <div className="logo">StockSphere</div>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/portfolio" className={`nav-link ${location.pathname === '/portfolio' ? 'active' : ''}`}>My Portfolio</Link>
          <Link to="/stocks" className={`nav-link ${location.pathname === '/stocks' ? 'active' : ''}`}>Stocks</Link>
        </div>
        <div className="logout-button">
          <button className="btn" onClick={onLogout}>Log Out</button>
        </div>
      </div>
      <div className="stocks-content">
        <h2>Available Stocks</h2>
        <div className="stocks-list">
          {stocks.map(stock => (
            <Link to={`/stocks/${stock.symbol}`} key={stock.symbol} className="stock-link">
              <div key={stock.symbol} className="stock-item">
                <div className="stock-left">
                  <div className="stock-name">{stock.description}</div>
                </div>
                <div className="stock-right">
                  <div className="stock-price">Price: ${stock.price}</div>
                  <div className={`stock-change ${stock.change > 0 ? 'positive' : 'negative'}`}>
                    1D: {stock.changePercent}%
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stocks;
