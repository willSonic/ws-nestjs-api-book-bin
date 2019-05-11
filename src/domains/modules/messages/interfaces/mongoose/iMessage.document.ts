import {  Document }   from 'mongoose';
import {IUserDocument} from "../../../user/interfaces/mongoose/iUser.document";

export interface IMessageDocument extends Document {
  id: string,
  user:IUserDocument,
  messageType:string,
  messageText:string,
  reviewedAt:Date,
  createdAt: Date,
  modifiedAt: Date
}
