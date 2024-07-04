import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHistoricalData } from '../features/hist/histSlice';
import './Graph.css';

function Graph(props) {
    const [timePeriod, setTimePeriod] = useState('1W'); // Default time period
    const { symbol } = props;
    const dispatch = useDispatch();

    const { hist, isLoading, isError, message } = useSelector((state) => state.hist);

    useEffect(() => {
        dispatch(getHistoricalData(symbol));
    }, [dispatch, symbol]);

    const handleTimePeriodChange = (period) => {
        setTimePeriod(period);
    };

    // Helper function to get the date from a specified period
    const getDateFromPeriod = (period, endDate) => {
        const startDate = new Date(endDate);
        switch (period) {
            case '1W':
                startDate.setDate(startDate.getDate() - 8); // Last 7 days including endDate
                break;
            case '1M':
                startDate.setMonth(startDate.getMonth() - 1);
                break;
            case '3M':
                startDate.setMonth(startDate.getMonth() - 3);
                break;
            case '6M':
                startDate.setMonth(startDate.getMonth() - 6);
                break;
            case '1Y':
                startDate.setFullYear(startDate.getFullYear() - 1);
                break;
            case '5Y':
                startDate.setFullYear(startDate.getFullYear() - 5);
                break;
            default:
                break;
        }
        return startDate;
    };

    // Filter and map data based on time period
    const filterDataByTimePeriod = (data, period) => {
        const endDate = new Date(data[data.length - 1]?.date); // Use the last date in the data
        const startDate = getDateFromPeriod(period, endDate);

        return data
            .filter(d => new Date(d.date) >= startDate && new Date(d.date) <= endDate)
            .map(d => d.close);
    };

    const selectedData = filterDataByTimePeriod(hist, timePeriod);

    return (
        <div className="graph-container">
            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error loading data: {message}</p>
            ) : (
                <Stack direction="row" spacing={2} sx={{ marginBottom: '20px' }}>
                    <Box className="graph-box" sx={{ flexGrow: 1 }}>
                        <SparkLineChart
                            data={selectedData}
                            height={400}
                            color="#21bf73"
                            showHighlight={true}
                            showTooltip={true}
                            markers={[{ value: selectedData[selectedData.length - 1], label: 'Current', position: 'top' }]}
                        />
                    </Box>
                </Stack>
            )}

            <div className="time-period-buttons">
                <button className={`time-period-button ${timePeriod === '1W' ? 'active' : ''}`} onClick={() => handleTimePeriodChange('1W')}>1W</button>
                <button className={`time-period-button ${timePeriod === '1M' ? 'active' : ''}`} onClick={() => handleTimePeriodChange('1M')}>1M</button>
                <button className={`time-period-button ${timePeriod === '3M' ? 'active' : ''}`} onClick={() => handleTimePeriodChange('3M')}>3M</button>
                <button className={`time-period-button ${timePeriod === '6M' ? 'active' : ''}`} onClick={() => handleTimePeriodChange('6M')}>6M</button>
                <button className={`time-period-button ${timePeriod === '1Y' ? 'active' : ''}`} onClick={() => handleTimePeriodChange('1Y')}>1Y</button>
                <button className={`time-period-button ${timePeriod === '5Y' ? 'active' : ''}`} onClick={() => handleTimePeriodChange('5Y')}>5Y</button>
            </div>
        </div>
    );
}

export default Graph;
