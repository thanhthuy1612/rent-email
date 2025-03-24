export interface IUser {
  id: string;
  userName: string;
  balance: number;
  apiToken: string;
  scopes: string;
  creationDate: Date;
  modificationDate: Date;
  accessToken: string;
  refreshToken: string;
}
