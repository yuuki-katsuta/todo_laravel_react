import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ToDo } from '../../typs';

export const useDeleteToDoMutateTask = () => {
  const queryClient = useQueryClient();
  const deleteToDoMutation = useMutation(
    (toDo: ToDo) =>
      axios.delete('http://localhost/api/toDos/' + toDo.id.toString()),
    {
      //TODO削除は連続した処理を考慮しないので、onMutateは必要ない
      onSettled: () => {
        queryClient.invalidateQueries('ToDoList');
      },
    }
  );
  return { deleteToDoMutation };
};
