import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStocks } from '../features/stocks/stockSlice';
import './Stocks.css';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';

function Stocks() {
  const dispatch = useDispatch();

  const { stocks, isLoading, isError, message } = useSelector((state) => state.stocks);

  useEffect(() => {
    dispatch(getAllStocks());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      console.error(message);
    }
  }, [isError, message]);

  return (
    <div className="stocks-container">
      <Navbar />
      <div className="stocks-content">
        <h2>Available Stocks</h2>
        <div className="stocks-list">
          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <p>{message}</p>
          ) : (
            Array.isArray(stocks) && stocks.map((stock) => (
              <Link to={`/stocks/${stock.name}`} key={stock._id} className="stock-link">
                <div className="stock-item">
                  <div className="stock-left">
                    <div className="stock-name">{stock.name}</div>
                  </div>
                  <div className="stock-right">
                    <div className="stock-price">Price: ${stock.price}</div>
                    <div className={`stock-change ${stock.change > 0 ? 'positive' : 'negative'}`}>
                      1D: {stock.changePercent}%
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
