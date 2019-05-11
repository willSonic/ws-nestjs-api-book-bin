import { IUserResponse } from '../../../user/interfaces/responses/iUser.response';
import { IBookResponse } from '../../../books/interfaces/responses/iBook.response';

export interface IBookedResponse{
  id?: string;
  user:IUserResponse;
  book:IBookResponse;
  returnDate?: Date;
  active:boolean,
  createdAt?: Date;
  modifiedAt?: Date
}
