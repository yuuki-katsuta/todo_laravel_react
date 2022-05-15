import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/system';
import { Navigation } from './Navigation';
import { Home } from '../pages/Home';

function Main() {
  return (
    <Box>
      <Navigation />
      <Router>
        <main className={'m-5'}>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </main>
      </Router>
    </Box>
  );
}

export default Main;
// for <div id="main-employee"></div>
ReactDOM.render(<Main />, document.getElementById('app'));
