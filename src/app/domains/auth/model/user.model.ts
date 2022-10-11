export class User {
  constructor(public user: IUser, private _token: string) {
    Object.assign({}, user);
  }

  get token() {
    return this._token;
  }
}

export interface AuthResponseData {
  user: IUser;
  token: string;
}

export interface IUser {
  name: string;
  email: string;
  age: number;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
