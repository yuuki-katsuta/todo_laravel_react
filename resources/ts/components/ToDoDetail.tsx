import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';
import { ToDoDetail as detailType } from '../typs';
import { TextField } from '@mui/material';
import { useUpdateToDoDetailMutateTask } from '../hooks/ToDoDetail';

type Props = {
  detail: detailType;
};
export const ToDoDetail = ({ detail }: Props) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  let toDoDetail = {
    id: detail.id,
    to_do_id: detail.to_do_id,
    name: detail.name,
    completed_flag: detail.completed_flag,
  };
  const { updateToDoDetailMutation } = useUpdateToDoDetailMutateTask();
  const eventUpdateToDoDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
    timer && clearTimeout(timer);
    const newTimer = setTimeout(() => {
      let data = {
        ...toDoDetail,
        name: e.target.value,
      };
      updateToDoDetailMutation.mutate(data);
    }, 500);
    setTimer(newTimer);
  };
  const eventCheckToDoDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
    let data = {
      ...toDoDetail,
      completed_flag: e.target.checked,
    };
    updateToDoDetailMutation.mutate(data);
  };

  return (
    <ListItem
      key={detail.id}
      secondaryAction={
        <IconButton edge='end' aria-label='comments'>
          <Delete />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton>
        <ListItemIcon>
          <Checkbox
            edge='start'
            checked={detail.completed_flag}
            onChange={eventCheckToDoDetail}
          />
        </ListItemIcon>
        <TextField
          variant='standard'
          margin='dense'
          defaultValue={detail.name}
          fullWidth
          onChange={eventUpdateToDoDetail}
        />
      </ListItemButton>
    </ListItem>
  );
};
