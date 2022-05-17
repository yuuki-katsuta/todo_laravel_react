import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ToDo, ToDoDetail } from '../../typs';

export const useDeleteToDoDetailMutateTask = () => {
  const queryClient = useQueryClient();
  const deleteToDoDetailMutateTask = useMutation(
    (toDoDetail: ToDoDetail) =>
      axios.delete(
        'http://localhost/api/toDoDetails/' + toDoDetail.id.toString()
      ),
    {
      onMutate: async (toDoDetail) => {
        await queryClient.cancelQueries('ToDoList');
        const previousToDoList = queryClient.getQueriesData('ToDoList');
        // キャッシュ更新してui仮変更
        queryClient.setQueryData<ToDo[]>('ToDoList', (oldToDoList) =>
          oldToDoList!.map((oldToDo) => {
            let newToDoDetails: ToDoDetail[] = [];
            oldToDo.to_do_details?.map((oldToDodetail) => {
              //削除対象を除外したリストを作成
              if (oldToDodetail.id !== toDoDetail.id) {
                newToDoDetails.push(oldToDodetail);
              }
            });
            oldToDo.to_do_details = newToDoDetails;
            return oldToDo;
          })
        );
        return { previousToDoList };
      },
      onSettled: () => {
        queryClient.invalidateQueries('ToDoList');
      },
    }
  );
  return { deleteToDoDetailMutateTask };
};
