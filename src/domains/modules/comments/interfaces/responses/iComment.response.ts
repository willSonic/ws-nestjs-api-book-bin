import { IUserResponse } from '../../../user/interfaces/responses/iUser.response';
import { IBookResponse } from '../../../books/interfaces/responses/iBook.response';
export interface ICommentResponse{
  id?: string;
  book?: IBookResponse; //book Id
  user?: IUserResponse; //user Id
  text?: string;
  createdAt?: Date;
  modifiedAt?: Date
}

export type ICommentResponses = ICommentResponse[];
