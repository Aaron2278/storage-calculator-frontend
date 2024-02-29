import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';

const StorageCalculator = () => {
  const [storageAmount, setStorageAmount] = useState('');
  const [decreaseRate, setDecreaseRate] = useState('');
  const [decreaseAmount, setDecreaseAmount] = useState('');
  const [startTime, setStartTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [result, setResult] = useState('');

  const calculateEndTime = () => {
    // Convert start date and time to a Date object
    const dateTime = new Date(`${startDate} ${startTime}`);
    
    // Calculate the total number of decreases needed until storage hits 0
    const totalDecreases = Math.ceil(storageAmount / decreaseAmount);
    
    // Calculate total hours to deplete storage
    const totalHours = totalDecreases * decreaseRate;
    
    // Add total hours to start datetime
    dateTime.setHours(dateTime.getHours() + totalHours);

    // Format result
    const options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const resultString = `Storage will be 0 GB at ${dateTime.toLocaleString('en-US', options)}`;

    setResult(resultString);
  };

  return (
    <Container maxWidth="sm">
      <TextField
        label="Storage Amount (GB)"
        variant="outlined"
        fullWidth
        margin="normal"
        value={storageAmount}
        onChange={(e) => setStorageAmount(e.target.value)}
      />
      <TextField
        label="Decrease every X hours"
        variant="outlined"
        fullWidth
        margin="normal"
        value={decreaseRate}
        onChange={(e) => setDecreaseRate(e.target.value)}
      />
      <TextField
        label="Amount to be decreased (GB)"
        variant="outlined"
        fullWidth
        margin="normal"
        value={decreaseAmount}
        onChange={(e) => setDecreaseAmount(e.target.value)}
      />
      <TextField
        label="Start Time (e.g., 5:00 PM)"
        variant="outlined"
        fullWidth
        margin="normal"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <TextField
        label="Start Date (MM/DD/YYYY)"
        variant="outlined"
        fullWidth
        margin="normal"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={calculateEndTime} fullWidth>
        Calculate
      </Button>
      {result && <p>{result}</p>}
    </Container>
  );
};

export default StorageCalculator;
