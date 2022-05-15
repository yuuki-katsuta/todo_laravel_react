import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { ToDo } from '../../typs';

const getToDoList = async () => {
  const { data } = await axios.get<ToDo[]>('http://localhost/api/toDos');
  return data;
};

export const useGetToDoList = () => {
  const queryClient = useQueryClient();
  //ToDoListにデータを詰め込む？
  return useQuery('ToDoList', getToDoList, {
    //errorの場合ToDoListにnullを格納
    onError: () => {
      queryClient.setQueryData('ToDoList', null);
    },
  });
};
