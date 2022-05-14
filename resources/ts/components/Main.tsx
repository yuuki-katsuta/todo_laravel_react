import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Box } from '@mui/system';
import Navigation from './Navigation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Example from '../pages/Example';

function Main() {
  return (
    <Box>
      <Navigation />
      <Router>
        <Routes>
          <Route path='/' element={<Example />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default Main;
// for <div id="main-employee"></div>
ReactDOM.render(<Main />, document.getElementById('app'));
