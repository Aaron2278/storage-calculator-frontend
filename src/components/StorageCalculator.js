import React, { useState } from 'react';
import { TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

const StorageCalculator = () => {
  const [storageAmount, setStorageAmount] = useState('');
  const [decreaseRate, setDecreaseRate] = useState('');
  const [decreaseAmount, setDecreaseAmount] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [startDate, setStartDate] = useState('');
  const [results, setResults] = useState([]);

  const calculateEndTime = () => {
    if (!timeInput || !startDate || !decreaseRate) {
      alert('Please provide the start date, time, and decrease rate.');
      return;
    }

    if (!/^\d{1,2}:\d{2}:\d{2} (AM|PM)$/i.test(timeInput)) {
      alert('Please enter the start time in the format HH:MM:SS AM/PM with a space before AM or PM.');
      return;
    }

    if (!/^\d+:\d{2}:\d{2}$/i.test(decreaseRate)) {
      alert('Please enter the decrease rate in the format H:MM:SS.');
      return;
    }

    const [time, period] = timeInput.split(' ');
    const [hoursInput, minutesInput, secondsInput] = time.split(':').map(Number);
    let hours = hoursInput % 12;
    if (period.toUpperCase() === 'PM') hours += 12;

    const [decreaseHours, decreaseMinutes, decreaseSeconds] = decreaseRate.split(':').map(Number);

    const [year, month, day] = startDate.split('-');
    const startDateTime = new Date(year, parseInt(month) - 1, day, hours, minutesInput, secondsInput);

    const totalDecreasesNeeded = Math.ceil(storageAmount / decreaseAmount);
    // Convert the decrease rate to total seconds for easier calculation
    const decreaseRateInSeconds = decreaseHours * 3600 + decreaseMinutes * 60 + decreaseSeconds;
    // Calculate the total decrease time in seconds
    const totalDecreaseTimeInSeconds = totalDecreasesNeeded * decreaseRateInSeconds;
    // Convert the total decrease time to milliseconds for the Date object
    startDateTime.setSeconds(startDateTime.getSeconds() + totalDecreaseTimeInSeconds);

    const resultData = {
      id: results.length + 1,
      inputDate: new Date().toLocaleDateString('en-US'),
      storageAmountRequested: storageAmount,
      endDate: startDateTime.toLocaleString('en-US', {
        year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
      })
    };

    setResults([...results, resultData]);
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
        label="Decrease every X hours (H:MM:SS)"
        variant="outlined"
        fullWidth
        margin="normal"
        value={decreaseRate}
        onChange={(e) => setDecreaseRate(e.target.value)}
        helperText="Enter decrease rate in H:MM:SS format."
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
        label="Start Time (HH:MM:SS AM/PM)"
        variant="outlined"
        fullWidth
        margin="normal"
        value={timeInput}
        onChange={(e) => setTimeInput(e.target.value.toUpperCase())}
        helperText="Enter start time in HH:MM:SS AM/PM format with a space before AM or PM."
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

      <Paper style={{ marginTop: 16 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Input Date</TableCell>
              <TableCell>Storage Amount Requested (GB)</TableCell>
              <TableCell>End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell>{result.id}</TableCell>
                <TableCell>{result.inputDate}</TableCell>
                <TableCell>{result.storageAmountRequested}</TableCell>
                <TableCell>{result.endDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default StorageCalculator;
