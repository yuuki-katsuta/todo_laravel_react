import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ToDo } from '../../typs';

export const useStoreToDoDetailMutateTask = () => {
  const queryClient = useQueryClient();
  const storeToDoDetailMutation = useMutation(
    (toDo: ToDo) =>
      axios.post('http://localhost/api/toDoDetails', {
        to_do_id: toDo.id,
        name: null,
      }),
    {
      //処理が終わったら、キャッシュを再構成(queryClient=>キャッシュを操作するために使用できるインスタンス)
      onSettled: () => {
        queryClient.invalidateQueries('ToDoList');
      },
    }
  );
  return { storeToDoDetailMutation };
};
