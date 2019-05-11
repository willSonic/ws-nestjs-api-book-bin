import mongoose = require('mongoose');
import {IBooksDocument} from "../../../books/interfaces/mongoose/iBooks.document";
import { IUserDocument } from "../../../user/interfaces/mongoose/iUser.document";

export interface ICommentDocument extends mongoose.Document {
  id: string,
  book: IBooksDocument, //book Id
  user: IUserDocument, //user Id
  text: string,
  createdAt: Date,
  modifiedAt: Date
}
