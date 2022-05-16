import { Card, CardContent, CardHeader, List, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useUpdateToDoMutateTask } from '../hooks/ToDo';
import { ToDo as ToDoType } from '../typs';
import { ToDoDetail } from './ToDoDetail';

type Props = {
  toDo: ToDoType;
};
export const ToDo = ({ toDo }: Props) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  let toDoData = {
    id: toDo.id,
    title: toDo.title,
  };
  const { updateToDoMutation } = useUpdateToDoMutateTask();
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
    </Card>
  );
};
