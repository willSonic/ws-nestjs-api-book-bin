import {  Document, Types }   from 'mongoose';
import {IBookedDocument} from "../../../booked/interfaces/mongoose/iBooked.document";

export interface IBookedExpireEventDocument extends Document{
  id: string,
  booked:IBookedDocument,
  createdAt?: Date,
}
