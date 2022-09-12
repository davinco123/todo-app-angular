export class TodoListModel {
  public todo: string;
  public isInProgress: boolean;
  public isCompleted: boolean;
  public isRemoved?: boolean;

  constructor(
    todo: string,
    isInProgress: boolean = true,
    isCompleted: boolean = false,
    isRemoved: boolean = false
  ) {
    this.todo = todo;
    this.isInProgress = isInProgress;
    this.isCompleted = isCompleted;
    this.isRemoved = isRemoved;
  }
}
