import { Card, CardContent, CardHeader, List } from '@mui/material';
import React from 'react';
import { ToDo as ToDoType } from '../typs';
import { ToDoDetail } from './ToDoDetail';

type Props = {
  toDo: ToDoType;
};
export const ToDo = ({ toDo }: Props) => {
  return (
    <Card>
      <CardHeader title={toDo.title} />
      <CardContent>
        <List>
          {[0, 1, 2, 3].map((value) => (
            <ToDoDetail id={value} key={value} />
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
