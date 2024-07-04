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
    const getDateFromPeriod = (period) => {
        const currentDate = new Date();
        switch (period) {
            case '1W':
                return new Date(currentDate.setDate(currentDate.getDate() - 7));
            case '1M':
                return new Date(currentDate.setMonth(currentDate.getMonth() - 1));
            case '3M':
                return new Date(currentDate.setMonth(currentDate.getMonth() - 3));
            case '6M':
                return new Date(currentDate.setMonth(currentDate.getMonth() - 6));
            case '1Y':
                return new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));
            case '5Y':
                return new Date(currentDate.setFullYear(currentDate.getFullYear() - 5));
            default:
                return currentDate;
        }
    };

    // Filter and map data based on time period
    const filterDataByTimePeriod = (data, period) => {
        const startDate = getDateFromPeriod(period);

        return data
            .filter(d => new Date(d.date) >= startDate)
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
                            height={200}
                            color="#21bf73"
                            showHighlight={true}
                            showTooltip={true}
                            markers={[{ value: selectedData[selectedData.length - 1], label: 'Current', position: 'top' }]}
                        />
                    </Box>
                </Stack>
            )}

            <div className="time-period-buttons">
                <button className={`time-period-button ${timePeriod === '1W' ? 'active' : ''}`} onClick={() => handleTimePeriodChange('1W')}>1 Week</button>
                <button className={`time-period-button ${timePeriod === '1M' ? 'active' : ''}`} onClick={() => handleTimePeriodChange('1M')}>1 Month</button>
                <button className={`time-period-button ${timePeriod === '3M' ? 'active' : ''}`} onClick={() => handleTimePeriodChange('3M')}>3 Months</button>
                <button className={`time-period-button ${timePeriod === '6M' ? 'active' : ''}`} onClick={() => handleTimePeriodChange('6M')}>6 Months</button>
                <button className={`time-period-button ${timePeriod === '1Y' ? 'active' : ''}`} onClick={() => handleTimePeriodChange('1Y')}>1 Year</button>
                <button className={`time-period-button ${timePeriod === '5Y' ? 'active' : ''}`} onClick={() => handleTimePeriodChange('5Y')}>5 Years</button>
            </div>
        </div>
    );
}

export default Graph;