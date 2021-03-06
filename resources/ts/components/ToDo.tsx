import React, { useState } from 'react';
import { AddCircle, Delete } from '@mui/icons-material';
import {
  Card,
  CardContent,
  CardActions,
  List,
  TextField,
  IconButton,
} from '@mui/material';
import {
  useDeleteToDoMutateTask,
  useUpdateToDoMutateTask,
} from '../hooks/ToDo';
import { ToDo as ToDoType } from '../typs';
import { ToDoDetail } from './ToDoDetail';
import { useStoreToDoDetailMutateTask } from '../hooks/ToDoDetail';

type Props = {
  toDo: ToDoType;
};
export const ToDo = ({ toDo }: Props) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const { updateToDoMutation } = useUpdateToDoMutateTask();
  const { deleteToDoMutation } = useDeleteToDoMutateTask();
  const { storeToDoDetailMutation } = useStoreToDoDetailMutateTask();

  let toDoData = {
    id: toDo.id,
    title: toDo.title,
  };

  const eventUpdateToDo = (e: React.ChangeEvent<HTMLInputElement>) => {
    //入力する毎にタイマー初期化(0.5秒の間に発火すると初期化される)
    timer && clearTimeout(timer);
    //0.5秒待って実行
    const newTimer = setTimeout(() => {
      let data: ToDoType = {
        ...toDoData,
        title: e.target.value,
      };
      updateToDoMutation.mutate(data);
    }, 500);
    //タイマー登録
    setTimer(newTimer);
  };

  const eventDeleteToDo = () => {
    deleteToDoMutation.mutate(toDo);
  };

  const eventStoreToDoDetail = () => {
    storeToDoDetailMutation.mutate(toDo);
  };

  return (
    <Card>
      <TextField
        variant='standard'
        margin='dense'
        defaultValue={toDo.title}
        fullWidth
        onChange={eventUpdateToDo}
      />
      <CardContent>
        <List>
          {toDo.to_do_details?.map((detail) => (
            <ToDoDetail detail={detail} key={detail.id} />
          ))}
        </List>
      </CardContent>
      <CardActions>
        <IconButton
          edge='start'
          aria-label='add'
          color='primary'
          onClick={eventStoreToDoDetail}
        >
          <AddCircle />
        </IconButton>
        <IconButton edge='end' aria-label='delete' onClick={eventDeleteToDo}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};
