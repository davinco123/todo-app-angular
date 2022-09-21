export class TodoListModel {
  public completed: boolean;
  public _id: string;
  public description: string;
  public owner: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    description: string,
    completed: boolean = false,
    id: string,
    owner: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.completed = completed;
    this._id = id;
    this.description = description;
    this.owner = owner;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export enum TodoListStatus {
  INPROGRESS = 'inprogress',
  COMPLETED = 'completed',
  REMOVED = 'removed',
}
