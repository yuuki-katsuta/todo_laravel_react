export type ToDo<T> = {
  id: number;
  title: string;
  to_do_details?: ToDoDetail<T>[];
};

export type ToDoDetail<T> = {
  id: number;
  name: string;
  completed_flag: T;
};
