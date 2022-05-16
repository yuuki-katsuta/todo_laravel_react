import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Box } from '@mui/system';
import { Navigation } from './Navigation';
import { Home } from '../pages/Home';
import { ReactQueryDevtools } from 'react-query/devtools';

const client = new QueryClient();
function Main() {
  return (
    <Box>
      <QueryClientProvider client={client}>
        <Navigation />
        <Router>
          <main className={'m-5'}>
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
          </main>
        </Router>
        <ReactQueryDevtools></ReactQueryDevtools>
      </QueryClientProvider>
    </Box>
  );
}

export default Main;
ReactDOM.render(<Main />, document.getElementById('app'));
