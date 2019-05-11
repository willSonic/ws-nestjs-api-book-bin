import {  Document, Types }   from 'mongoose';
import {IUserDocument} from "../../../user/interfaces/mongoose/iUser.document";
import { IBooksDocument } from "../../../books/interfaces/mongoose/iBooks.document";

export interface IBookedDocument extends Document{
  id: string,
  book: IBooksDocument,
  user: IUserDocument,
  returnDate: Date,
  active: boolean,
  createdAt: Date,
  modifiedAt: Date
}
