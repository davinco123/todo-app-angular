export class TodoListModel {
  public completed: boolean;
  public _id: string;
  public description: string;
  public owner: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(todoList: TodoListModel) {
    Object.assign({}, todoList);
  }
}

export enum TodoListStatus {
  INPROGRESS = 'inprogress',
  COMPLETED = 'completed',
}
