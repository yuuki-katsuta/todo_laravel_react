import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ToDo, ToDoDetail } from '../../typs';

export const useUpdateToDoDetailMutateTask = () => {
  const queryClient = useQueryClient();
  const updateToDoDetailMutation = useMutation(
    (toDoDetail: ToDoDetail) =>
      axios.put(
        'http://localhost/api/toDoDetails/' + toDoDetail.id.toString(),
        {
          name: toDoDetail.name,
          completed_flag: toDoDetail.completed_flag,
        }
      ),
    {
      onMutate: async (ToDoDetail) => {
        //事前に走っているリクエストがある場合はキャンセルする
        await queryClient.cancelQueries('ToDoList');
        //既存のToDoリストを取得(キャッシュから取得)
        const previousToDoList = queryClient.getQueriesData('ToDoList');
        //ToDoリストのキャッシュを更新
        queryClient.setQueryData<ToDo[]>('ToDoList', (oldToDoList) =>
          oldToDoList!.map((oldToDo) => {
            //そのToDoが、更新対象のToDoDetailの親の場合実行
            if (oldToDo.id === ToDoDetail.to_do_id) {
              let newToDoDetails: ToDoDetail[] = [];
              oldToDo.to_do_details!.map((oldToDodetail) => {
                //更新対象のToDoDetailのidが、oldToDodetail(キャッシュ?) のidと一致
                if (oldToDodetail.id === ToDoDetail.id) {
                  //上書き
                  newToDoDetails.push({
                    ...oldToDodetail,
                    name: ToDoDetail.name,
                    completed_flag: ToDoDetail.completed_flag,
                  });
                } else {
                  newToDoDetails.push(oldToDodetail);
                }
              });
              oldToDo.to_do_details = newToDoDetails;
            }
            return oldToDo;
          })
        );
        return { previousToDoList };
      },

      //リクエスト終わったら、キャッシュを古いものと認識させ、キャッシュデータが強制的にstaleになったうえでデータ再取得が行われる。
      onSettled: () => {
        queryClient.invalidateQueries('ToDoList');
      },
    }
  );
  return { updateToDoDetailMutation };
};
