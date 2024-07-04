import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStocks } from '../features/stocks/stockSlice';
import './Stocks.css';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';

function Stocks() {
  const dispatch = useDispatch();
  const { stocks, isLoading, isError, message } = useSelector((state) => state.stocks);
  const [randomStocks, setRandomStocks] = useState([]);

  useEffect(() => {
    dispatch(getAllStocks());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      console.error(message);
    }
  }, [isError, message]);

  useEffect(() => {
    if (stocks.length > 0) {
      setRandomStocks(getRandomStocks(stocks, 15));
    }
  }, [stocks]);

  const getRandomStocks = (stocks, num) => {
    const shuffled = [...stocks].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

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
            randomStocks.map((stock) => (
              <Link to={`/stocks/${stock.symbol}`} key={stock._id} className="stock-link">
                <div className="stock-item">
                  <div className="stock-left">
                    <div className="stock-name">{stock.name}</div>
                  </div>
                  <div className="stock-right">
                    <div className="stock-price">Price: ${stock.price}</div>
                    <div className={`stock-change ${stock.odchange > 0 ? 'positive' : 'negative'}`}>
                      1D: {stock.odchange}%
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
