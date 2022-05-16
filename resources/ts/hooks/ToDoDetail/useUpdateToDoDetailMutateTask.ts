import axios from 'axios';
import { useMutation } from 'react-query';
import { ToDoDetail } from '../../typs';

export const useUpdateToDoDetailMutateTask = () => {
  const updateToDoDetailMutation = useMutation(
    (toDoDetail: ToDoDetail<boolean>) =>
      axios.put(
        'http://localhost/api/toDoDetails/' + toDoDetail.id.toString(),
        {
          name: toDoDetail.name,
          completed_flag: toDoDetail.completed_flag,
        }
      )
  );
  return { updateToDoDetailMutation };
};
