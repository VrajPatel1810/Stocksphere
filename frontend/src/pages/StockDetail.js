import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Typography, TextField, Button } from '@mui/material';
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
          const data = res.data.c.map((price, index) => ({ x: index, y: price }));
          setHistoricalData(data);
        } else {
          console.error('Error fetching historical data:', res.data);
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
    datasets: [
      {
        data: historicalData,
        label: `${symbol} Price`,
        borderColor: '#3e98c7',
      },
    ],
  };

  return (
    <div className="stock-detail-container">
      <Typography variant="h2">{stock.symbol}</Typography>
      <Typography variant="subtitle1">Price: ${stock.price}</Typography>
      <Typography className={`stock-change ${stock.change > 0 ? 'positive' : 'negative'}`}>
        1D: {stock.changePercent}%
      </Typography>
      <div className="chart-container">
        <Line
          data={data}
          options={{
            scales: {
              x: {
                type: 'linear',
              },
              y: {
                type: 'linear',
              },
            },
          }}
        />
      </div>
      <div className="buy-sell-container">
        <TextField
          type="number"
          value={buySellAmount}
          onChange={(e) => setBuySellAmount(e.target.value)}
          placeholder="Amount"
          variant="outlined"
          size="small"
        />
        <Button variant="contained" color="primary" onClick={() => handleBuySell('Buy')}>
          Buy
        </Button>
        <Button variant="contained" color="secondary" onClick={() => handleBuySell('Sell')}>
          Sell
        </Button>
      </div>
    </div>
  );
}

export default StockDetail;
