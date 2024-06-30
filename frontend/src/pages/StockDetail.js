import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getStocksBySymbol } from '../features/stocks/stockSlice';
import Spinner from '../components/Spinner';
import './StockDetail.css';

function StockDetail() {
  const { symbol } = useParams();
  const dispatch = useDispatch();

  // const { user } = useSelector(state => state.auth);
  const { stocks, isLoading, isError, message } = useSelector((state) => state.stocks);

  useEffect(() => {
    dispatch(getStocksBySymbol(symbol));
  }, [dispatch, symbol]);

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
    </div>
  );
}

export default StockDetail;
