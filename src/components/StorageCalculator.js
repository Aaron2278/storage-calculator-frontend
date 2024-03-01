import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';

const StorageCalculator = () => {
  const [storageAmount, setStorageAmount] = useState('');
  const [decreaseRate, setDecreaseRate] = useState('');
  const [decreaseAmount, setDecreaseAmount] = useState('');
  const [timeInput, setTimeInput] = useState(''); 
  const [startDate, setStartDate] = useState('');
  const [result, setResult] = useState('');

  const calculateEndTime = () => {
    if (!timeInput || !startDate) {
      setResult('Please provide both start date and time.');
      return;
    }

    if (!/^\d{1,2}:\d{2} (AM|PM)$/i.test(timeInput)) {
      setResult('Please enter the time in the format HH:MM AM/PM with a space before AM or PM.');
      return;
    }

    const [time, period] = timeInput.split(' ');
    const [hoursInput, minutesInput] = time.split(':').map(Number);
    let hours = hoursInput % 12;
    if (period.toUpperCase() === 'PM') hours += 12;

    const [year, month, day] = startDate.split('-');
    const startDateTime = new Date(year, parseInt(month) - 1, day, hours, minutesInput, 0);

    const totalDecreases = Math.ceil(storageAmount / decreaseAmount);
    const totalHours = totalDecreases * decreaseRate;
    startDateTime.setHours(startDateTime.getHours() + totalHours);

    const options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const resultString = `Storage will be 0 GB at ${startDateTime.toLocaleString('en-US', options)}`;

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
        label="Start Time (HH:MM AM/PM)"
        variant="outlined"
        fullWidth
        margin="normal"
        value={timeInput}
        onChange={(e) => setTimeInput(e.target.value.toUpperCase())} 
        helperText="Enter time in HH:MM AM/PM format with a space before AM or PM."
      />
      <TextField
        label="Start Date (YYYY-MM-DD)"
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
