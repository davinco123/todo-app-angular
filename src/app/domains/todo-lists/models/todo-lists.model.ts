export class TodoListModel {
  public todo: string;
  public mode: string;

  constructor(todo: string, mode: string = 'inProgress') {
    this.todo = todo;
    this.mode = mode;
  }
}
