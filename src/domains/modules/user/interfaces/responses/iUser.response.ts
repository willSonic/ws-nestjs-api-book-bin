
export interface IUserResponse {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  admin: boolean;
  isLoggedIn: boolean;
  createdAt: Date;
  modifiedAt: Date;
}
