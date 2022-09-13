export class TodoListModel {
  public todo: string;
  public mode: string;
  public id: number;

  constructor(todo: string, mode: string = 'inprogress', id: number) {
    this.todo = todo;
    this.mode = mode;
    this.id = id;
  }
}
