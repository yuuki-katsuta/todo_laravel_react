import React from 'react';
import { Fab, Grid } from '@mui/material';
import { ToDo } from '../components/ToDo';
import { useCurrentToDoList, useGetToDoList } from '../hooks/ToDoList';
import { ToDo as ToDoType } from '../typs';
import { Add } from '@mui/icons-material';
import { useStoreToDoMutateTask } from '../hooks/ToDo';

const fabstyle = {
  position: 'fixed',
  bottom: 16,
  right: 16,
};

export const Home = () => {
  const { storeToDoMutation } = useStoreToDoMutateTask();
  const eventStoreToDo = () => {
    storeToDoMutation.mutate();
  };

  //apiを使いtodoリスト取得
  const { isLoading } = useGetToDoList();
  //useGetToDoList()で取得したら”toDoList”というキーでキャッシュに格納され、それを他から使い回せる
  const toDoList = useCurrentToDoList();

  if (isLoading) return <h3>Loading...</h3>;
  return (
    <div>
      <Grid container spacing={2}>
        {toDoList?.map((toDo: ToDoType) => (
          <Grid item xs={3} key={toDo.id}>
            <ToDo toDo={toDo} />
          </Grid>
        ))}
      </Grid>
      <Fab
        color='primary'
        aria-label='add'
        sx={fabstyle}
        onClick={eventStoreToDo}
      >
        <Add />
      </Fab>
    </div>
  );
};
