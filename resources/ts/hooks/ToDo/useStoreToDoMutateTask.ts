import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

export const useStoreToDoMutateTask = () => {
  const queryClient = useQueryClient();
  const storeToDoMutation = useMutation(
    () =>
      axios.post('http://localhost/api/toDos', {
        title: null,
      }),
    {
      onSettled: () => {
        queryClient.invalidateQueries('ToDoList');
      },
    }
  );
  return { storeToDoMutation };
};
