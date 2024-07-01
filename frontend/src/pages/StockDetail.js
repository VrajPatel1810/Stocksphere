import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getStocksBySymbol, buyStock } from '../features/stocks/stockSlice';
import Spinner from '../components/Spinner';
import './StockDetail.css';

function StockDetail() {
  const { symbol } = useParams();
  const dispatch = useDispatch();

  const { stocks, isLoading, isError, message } = useSelector((state) => state.stocks);
  const { user } = useSelector(state => state.auth);

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    dispatch(getStocksBySymbol(symbol));
  }, [dispatch, symbol]);

  const handleBuyStock = (e) => {
    e.preventDefault();
    if (quantity > 0) {
      const stock = stocks.find(stock => stock.name === symbol);
      if (stock) {
        dispatch(buyStock({ name: stock.name, price: stock.price, quantity }));
      }
    }
  };

  if (isLoading) return <Spinner />;
  
  if (isError) return <div>{message}</div>;

  const stock = stocks.length > 0 ? stocks[0] : null;

  if (!stock) return <div>No stock found</div>;

  return (
    <div className="stock-detail-container">
      <h2>{stock.name}</h2>
      <div className="stock-price">Price: ${stock.price}</div>
      <div className={`stock-change ${stock.change > 0 ? 'positive' : 'negative'}`}>
        1D: {stock.changePercent}%
      </div>
      {user && (
        <form onSubmit={handleBuyStock} className="buy-stock-form">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
            min="0"
          />
          <button type="submit" className="btn">Buy Stock</button>
        </form>
      )}
    </div>
  );
}

export default StockDetail;
