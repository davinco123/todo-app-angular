export class TodoListModel {
  public todo: string;
  public status: string;
  public id: number;

  constructor(todo: string, status: string = 'inprogress', id: number) {
    this.todo = todo;
    this.status = status;
    this.id = id;
  }
}

export enum TodoListStatus {
  INPROGRESS = 'inprogress',
  COMPLETED = 'completed',
  REMOVED = 'removed',
}
