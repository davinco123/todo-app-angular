export class TodoListModel {
  public todo: string;
  public mode: string;

  constructor(todo: string, mode: string = 'inprogress') {
    this.todo = todo;
    this.mode = mode;
  }
}
