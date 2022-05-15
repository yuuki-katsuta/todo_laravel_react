import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';

type Props = {
  id: number;
};
export const ToDoDetail = ({ id }: Props) => {
  return (
    <ListItem
      key={id}
      secondaryAction={
        <IconButton edge='end' aria-label='comments'>
          <Delete />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton>
        <ListItemIcon>
          <Checkbox edge='start' />
        </ListItemIcon>
        <ListItemText primary={'ToDoDetail' + id.toString()} />
      </ListItemButton>
    </ListItem>
  );
};
