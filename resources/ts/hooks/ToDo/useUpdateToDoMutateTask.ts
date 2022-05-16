import axios from 'axios';
import { useMutation } from 'react-query';
import { ToDo } from '../../typs';

export const useUpdateToDoMutateTask = () => {
  // toDoは更新対象
  const updateToDoMutation = useMutation((toDo: ToDo<number>) =>
    axios.put('http://localhost/api/toDos/' + toDo.id.toString(), {
      title: toDo.title,
    })
  );
  return { updateToDoMutation };
};
