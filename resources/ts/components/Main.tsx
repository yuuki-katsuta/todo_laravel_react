import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Box } from '@mui/system';
import { Navigation } from './Navigation';
import { Home } from '../pages/Home';

const client = new QueryClient();
function Main() {
  return (
    <QueryClientProvider client={client}>
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
    </QueryClientProvider>
  );
}

export default Main;
// for <div id="main-employee"></div>
ReactDOM.render(<Main />, document.getElementById('app'));
