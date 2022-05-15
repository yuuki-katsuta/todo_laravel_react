import { useQueryClient } from 'react-query';
import { ToDo } from '../../typs';

export const useCurrentToDoList = (): ToDo[] | undefined => {
  // ToDOListに格納したデータ=>useQueryClientを経由してアクセス
  const queryClient = useQueryClient();
  //getQueryDataでQueryClientで管理するデータを取り出す
  return queryClient.getQueryData('ToDoList');
};
