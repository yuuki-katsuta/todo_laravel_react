export type ToDo = {
  id: number;
  title: string;
  to_do_details?: ToDoDetail[];
};

export type ToDoDetail = {
  id: number;
  name: string;
  completed_flag: boolean;
};
