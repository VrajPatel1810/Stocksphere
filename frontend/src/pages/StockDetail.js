import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { buyStock } from '../features/stocks/stockSlice';
import Spinner from '../components/Spinner';
import axios from 'axios';
import './StockDetail.css';

function StockDetail() {
  const { symbol } = useParams();
  const [stock, setStock] = useState(null);
  const [buyAmount, setBuyAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { isLoading } = useSelector(state => state.stocks);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const res = await axios.get(`/api/stocks/${symbol}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setStock(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock details', error);
        setLoading(false);
      }
    };

    fetchStockDetails();
  }, [symbol, user.token]);

  if (isLoading || loading) return <Spinner />;
  if (!stock) return <div>Error loading stock details</div>;

  const { name, price, change, changePercent } = stock;

  const buyCurStock = () => {
    if (buyAmount) {
      dispatch(buyStock({ id: stock._id, amount: parseFloat(buyAmount) }));
      setBuyAmount('');
    }
  };

  return (
    <div className="stock-detail-container">
      <h2>{name}</h2>
      <div className="stock-price">Price: ${price.toFixed(2)}</div>
      <div className={`stock-change ${change > 0 ? 'positive' : 'negative'}`}>
        1D: {changePercent.toFixed(2)}%
      </div>
      <div className="buy-sell-container">
        <input
          type="number"
          value={buyAmount}
          onChange={(e) => setBuyAmount(e.target.value)}
          placeholder="Amount"
        />
        <button onClick={buyCurStock}>Buy</button>
      </div>
    </div>
  );
}

export default StockDetail;
