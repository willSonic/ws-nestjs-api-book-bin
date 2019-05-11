import { IBookedResponse } from '../../../booked/interfaces/responses/iBooked.response';

export interface IInventoryResponse {
  id?: string;
  bookGoogleId?: string
  booked?: IBookedResponse;
  available?: boolean;
  waitList?: Array<{  userId:string,  requestDate: Date }>
  createdAt?: Date;
  modifiedAt?: Date
}
