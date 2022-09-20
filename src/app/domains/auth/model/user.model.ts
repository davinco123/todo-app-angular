export class User {
  constructor(
    public name: string,
    public email: string,
    public age: number,
    public id: string,
    public createdAt: Date,
    public updatedAt: Date,
    private _token: string
  ) {}

  get token() {
    return this._token;
  }
}
