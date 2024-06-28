import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';
import { getAllStocks } from '../features/stocks/stockSlice';
import './Stocks.css';
import Spinner from '../components/Spinner';

function Stocks() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { stocks, isLoading, isError, message } = useSelector((state) => state.stocks);

  useEffect(() => {
    dispatch(getAllStocks());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      console.error(message);
    }
  }, [isError, message]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

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
          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <p>{message}</p>
          ) : (
            stocks.map((stock) => (
              <Link to={`/stocks/${stock.symbol}`} key={stock._id} className="stock-link">
                <div className="stock-item">
                  <div className="stock-left">
                    <div className="stock-name">{stock.name}</div>
                  </div>
                  <div className="stock-right">
                    <div className="stock-price">Price: ${stock.price.toFixed(2)}</div>
                    <div className={`stock-change ${stock.change > 0 ? 'positive' : 'negative'}`}>
                      1D: {stock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Stocks;
