import {  Document, Types }   from 'mongoose';
import { IBookedDocument } from "../../../booked/interfaces/mongoose/iBooked.document";
import { ICommentDocument } from "../../../comments/interfaces/mongoose/iComment.document";
import { IMessageDocument } from "../../../messages/interfaces/mongoose/iMessage.document";
import { IInventoryDocument } from "../../../inventory/interfaces/mongoose/iInventory.document";
import { IUserDocument } from "../../../user/interfaces/mongoose/iUser.document";


export interface IProfileDocument extends Document {
  id: string,
  user: IUserDocument,
  checkedOutCount: number,
  waitListCount: number,
  comments: Types.DocumentArray<ICommentDocument>,
  messages: Types.DocumentArray<IMessageDocument>,
  booksOut:Types.DocumentArray<IBookedDocument>,
  inventories: Types.DocumentArray<IInventoryDocument>,
  interestCategories: string[],
  createdAt: Date,
  modifiedAt: Date
}
