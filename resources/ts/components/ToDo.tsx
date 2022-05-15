import { Card, CardContent, CardHeader, List } from '@mui/material';
import React from 'react';
import { ToDoDetail } from './ToDoDetail';

export const ToDo = () => {
  return (
    <Card>
      <CardHeader title='test todo' />
      <CardContent>
        <List>
          {[0, 1, 2, 3].map((value) => (
            <ToDoDetail id={value} />
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
