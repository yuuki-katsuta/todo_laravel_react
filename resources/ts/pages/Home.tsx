import React from 'react';
import { Grid } from '@mui/material';
import { ToDo } from '../components/ToDo';
import { useCurrentToDoList, useGetToDoList } from '../hooks/ToDoList';
import { ToDo as ToDoType } from '../typs';

export const Home = () => {
  //apiを使いtodoリスト取得
  const { isLoading } = useGetToDoList();
  //useGetToDoList()で取得したら”toDoList”というキーでキャッシュに格納され、それを他から使い回せる
  const toDoList = useCurrentToDoList();
  if (isLoading) return <h3>Loading...</h3>;
  //console.log(toDoList);
  return (
    <Grid container spacing={2}>
      {toDoList?.map((toDo: ToDoType) => (
        <Grid item xs={3} key={toDo.id}>
          <ToDo toDo={toDo} />
        </Grid>
      ))}
    </Grid>
  );
};
