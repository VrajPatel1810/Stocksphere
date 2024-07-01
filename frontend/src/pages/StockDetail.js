import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getStocksBySymbol, buyStock } from '../features/stocks/stockSlice';
import Spinner from '../components/Spinner';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import './StockDetail.css';

function StockDetail() {
  const { symbol } = useParams();
  const dispatch = useDispatch();

  const { stocks, isLoading, isError, message } = useSelector((state) => state.stocks);
  const { user } = useSelector(state => state.auth);

  const [quantity, setQuantity] = useState(0);
  const [timePeriod, setTimePeriod] = useState('1W'); // Default time period

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

  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
    // Implement logic to fetch data for the selected time period
  };

  // Mock data for different time periods
  const mockData1W = [10, 12, 9, 11, 10, 12, 13, 11, 10, 12, 11, 12];
  const mockData1M = [12, 14, 15, 13, 12, 14, 15, 16, 14, 13, 14, 15];
  const mockData3M = [15, 17, 16, 18, 19, 17, 18, 19, 20, 18, 19, 20];
  const mockData6M = [20, 22, 24, 23, 25, 24, 23, 22, 24, 25, 23, 24];
  const mockData1Y = [25, 28, 30, 27, 29, 31, 32, 30, 28, 29, 30, 31];
  const mockData5Y = [30, 32, 35, 34, 36, 38, 37, 39, 38, 37, 36, 38];

  // Selecting data based on time period
  let selectedData = [];
  switch (timePeriod) {
    case '1W':
      selectedData = mockData1W;
      break;
    case '1M':
      selectedData = mockData1M;
      break;
    case '3M':
      selectedData = mockData3M;
      break;
    case '6M':
      selectedData = mockData6M;
      break;
    case '1Y':
      selectedData = mockData1Y;
      break;
    case '5Y':
      selectedData = mockData5Y;
      break;
    default:
      selectedData = mockData1W;
  }

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
      <Stack direction="row" spacing={2} sx={{ marginBottom: '20px' }}>
        <Box sx={{ flexGrow: 1 }}>
          <SparkLineChart
            data={selectedData}
            height={200}
            color="#21bf73"
            showHighlight={true}
            showTooltip={true}
            markers={[{ value: selectedData[selectedData.length - 1], label: 'Current', position: 'top' }]}
          />
        </Box>
      </Stack>
      
      <div className="time-period-buttons">
        <button className={`time-period-button ${timePeriod === '1W' ? 'active' : ''}`} onClick={() => handleTimePeriodChange('1W')}>1 Week</button>
        <button className={`time-period-button ${timePeriod === '1M' ? 'active' : ''}`} onClick={() => handleTimePeriodChange('1M')}>1 Month</button>
        <button className={`time-period-button ${timePeriod === '3M' ? 'active' : ''}`} onClick={() => handleTimePeriodChange('3M')}>3 Months</button>
        <button className={`time-period-button ${timePeriod === '6M' ? 'active' : ''}`} onClick={() => handleTimePeriodChange('6M')}>6 Months</button>
        <button className={`time-period-button ${timePeriod === '1Y' ? 'active' : ''}`} onClick={() => handleTimePeriodChange('1Y')}>1 Year</button>
        <button className={`time-period-button ${timePeriod === '5Y' ? 'active' : ''}`} onClick={() => handleTimePeriodChange('5Y')}>5 Years</button>
      </div>
      
      <div className="statistics-container">
        <div className="statistic-box">
          <div className="statistic-label">52W High</div>
          <div className="statistic-value">${stock.high52}</div>
        </div>
        <div className="statistic-box">
          <div className="statistic-label">52W Low</div>
          <div className="statistic-value">${stock.low52}</div>
        </div>
        <div className="statistic-box">
          <div className="statistic-label">1Y</div>
          <div className={`statistic-value ${stock.changePercent1Year > 0 ? 'positive' : 'negative'}`}>
            {stock.changePercent1Year}%
          </div>
        </div>
        <div className="statistic-box">
          <div className="statistic-label">5Y</div>
          <div className={`statistic-value ${stock.changePercent5Years > 0 ? 'positive' : 'negative'}`}>
            {stock.changePercent5Years}%
          </div>
        </div>
        <div className="statistic-box">
          <div className="statistic-label">Market Cap</div>
          <div className="statistic-value">${stock.marketCap}</div>
        </div>
        <div className="statistic-box">
          <div className="statistic-label">Volume</div>
          <div className="statistic-value">{stock.volume}</div>
        </div>
        <div className="statistic-box">
          <div className="statistic-label">Avg. Volume</div>
          <div className="statistic-value">{stock.avgVolume}</div>
        </div>
        <div className="statistic-box">
          <div className="statistic-label">Dividend Yield</div>
          <div className="statistic-value">{stock.dividendYield}%</div>
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
    </div>
  );
}

export default StockDetail;
