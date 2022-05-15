import { Grid } from '@mui/material';
import React from 'react';
import { ToDo } from '../components/ToDo';

export const Home = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <ToDo />
      </Grid>
    </Grid>
  );
};
