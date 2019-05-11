import {  Document }   from 'mongoose';
import { IBookedDocument } from "../../../booked/interfaces/mongoose/iBooked.document";

export interface IInventoryDocument extends Document {
  id: string,
  bookGoogleId:string,
  booked:IBookedDocument,
  available: boolean,
  waitList: [{
        userId:string,
        requestDate: Date,
    }]
  createdAt: Date,
  modifiedAt: Date
}
