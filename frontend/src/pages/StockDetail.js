import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getStocksBySymbol, buyStock } from '../features/stocks/stockSlice';
import Spinner from '../components/Spinner';
import Graph from '../components/Graph';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      const stock = stocks.find(stock => stock.symbol === symbol);
      if (stock) {
        const totalPrice = stock.price * quantity;
        dispatch(buyStock({ name: stock.name, symbol: stock.symbol, price: stock.price, quantity }))
          .then(() => {
            setQuantity(0); // Reset quantity after buying stock
            toast.success(`Your purchase of ${quantity} units of ${stock.name} worth ₹${totalPrice} is confirmed`);
          })
          .catch(error => {
            toast.error(`Error: ${error.message}`);
          });
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
      <div className="stock-price">Price: ₹{stock.price}</div>
      <div className={`stock-change ${stock.odchange > 0 ? 'positive' : 'negative'}`}>
        1D: {stock.odchange}%
      </div>

      <Graph symbol={stock.symbol} />

      <div className="statistics-container">
        <div className="statistic-box">
          <div className="statistic-label">52W High</div>
          <div className="statistic-value">₹{stock.ftwhigh}</div>
        </div>
        <div className="statistic-box">
          <div className="statistic-label">52W Low</div>
          <div className="statistic-value">₹{stock.ftwlow}</div>
        </div>
        <div className="statistic-box">
          <div className="statistic-label">1Y</div>
          <div className={`statistic-value ${stock.oychange > 0 ? 'positive' : 'negative'}`}>
            {stock.oychange}%
          </div>
        </div>
        <div className="statistic-box">
          <div className="statistic-label">5Y</div>
          <div className={`statistic-value ${stock.fychange > 0 ? 'positive' : 'negative'}`}>
            {stock.fychange}%
          </div>
        </div>
        <div className="statistic-box">
          <div className="statistic-label">Market Cap (In Billion)</div>
          <div className="statistic-value">₹{stock.marcap}</div>
        </div>
        <div className="statistic-box">
          <div className="statistic-label">Volume</div>
          <div className="statistic-value">{stock.volume}</div>
        </div>
        <div className="statistic-box">
          <div className="statistic-label">Avg. Volume</div>
          <div className="statistic-value">{stock.avgvolume}</div>
        </div>
        <div className="statistic-box">
          <div className="statistic-label">Dividend Yield</div>
          <div className="statistic-value">{stock.divyield}%</div>
        </div>
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

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

    </div>
  );
}

export default StockDetail;
