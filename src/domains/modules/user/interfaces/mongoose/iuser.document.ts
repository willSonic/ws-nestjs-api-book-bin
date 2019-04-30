import { Document } from "mongoose";

export interface IUserDocument extends Document {
  id: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  admin: boolean;
  isLoggedIn: boolean;
  createdAt: Date;
  modifiedAt: Date;
}
