import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import './StockDetail.css';

function StockDetail() {
  const { symbol } = useParams();
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [historicalData, setHistoricalData] = useState([]);
  const [buySellAmount, setBuySellAmount] = useState('');

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const res = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=cpg5o4hr01qo2291i2b0cpg5o4hr01qo2291i2bg`);
        setStock({
          symbol,
          price: parseFloat(res.data.c).toFixed(2),
          change: parseFloat(res.data.d).toFixed(2),
          changePercent: parseFloat(res.data.dp).toFixed(2)
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock details', error);
        setLoading(false);
      }
    };

    const fetchHistoricalData = async () => {
      try {
        const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
        const oneYearAgo = now - 365 * 24 * 60 * 60; // Timestamp one year ago

        const res = await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${oneYearAgo}&to=${now}&token=cpg5o4hr01qo2291i2b0cpg5o4hr01qo2291i2bg`);
        
        if (res.data.s === 'ok') {
          setHistoricalData(res.data.c);
        } else {
          console.error('Error fetching historical data');
        }
      } catch (error) {
        console.error('Error fetching historical data', error);
      }
    };

    fetchStockDetails();
    fetchHistoricalData();
  }, [symbol]);

  const handleBuySell = (type) => {
    alert(`${type} ${buySellAmount} shares of ${stock.symbol}`);
    setBuySellAmount('');
  };

  if (loading) return <div>Loading...</div>;
  if (!stock) return <div>Error loading stock details</div>;

  const data = {
    labels: historicalData.map((_, index) => index),
    datasets: [
      {
        label: `${stock.symbol} Price`,
        data: historicalData,
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
      }
    ]
  };

  return (
    <div className="stock-detail-container">
      <h2>{stock.symbol}</h2>
      <div className="stock-price">Price: ${stock.price}</div>
      <div className={`stock-change ${stock.change > 0 ? 'positive' : 'negative'}`}>
        1D: {stock.changePercent}%
      </div>
      <div className="chart-container">
        <Line data={data} />
      </div>
      <div className="buy-sell-container">
        <input
          type="number"
          value={buySellAmount}
          onChange={(e) => setBuySellAmount(e.target.value)}
          placeholder="Amount"
        />
        <button onClick={() => handleBuySell('Buy')}>Buy</button>
        <button onClick={() => handleBuySell('Sell')}>Sell</button>
      </div>
    </div>
  );
}

export default StockDetail;
