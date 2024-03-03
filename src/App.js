import React from 'react';
import StorageCalculator from './components/StorageCalculator';
import { CssBaseline, Container } from '@mui/material';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <h1>Storage Decrease Calculator 1.5</h1>
        <StorageCalculator />
      </Container>
    </React.Fragment>
  );
}

export default App;
