import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ToDo } from '../../typs';

export const useUpdateToDoMutateTask = () => {
  const queryClient = useQueryClient();
  const updateToDoMutation = useMutation(
    (toDo: ToDo) =>
      axios.put('http://localhost/api/toDos/' + toDo.id.toString(), {
        title: toDo.title,
      }),
    {
      //リクエストをするときの処理
      //toDoは更新対象
      onMutate: async (toDo) => {
        //事前に走っているリクエストがある場合はキャンセルする（楽観的な更新を上書きしないため）
        await queryClient.cancelQueries('ToDoList');
        //既存のToDoリストを取得(キャッシュから取得)
        const previousToDoList = queryClient.getQueriesData<ToDo[]>('ToDoList');
        //ToDoリストのキャッシュを更新、setQueryDataでToDoListのキャッシュ更新=>ここでUI上のデータが書き換えられる
        queryClient.setQueryData<ToDo[]>('ToDoList', (oldToDoList) =>
          //oldToDoListは既存のもの
          oldToDoList!.map((oldToDo) => {
            if (oldToDo.id == toDo.id) {
              return {
                ...oldToDo,
                title: toDo.title,
              };
            }
            return oldToDo;
          })
        );
        //更新できなかった場合既存データ返す
        return { previousToDoList };
      },
      //サーバーへリクエストが完了した場合実行
      onSettled: () => {
        // fetcherを再実行してデータを取得、キャッシュを上書き。
        queryClient.invalidateQueries('ToDoList');
      },
    }
  );

  return { updateToDoMutation };
};
