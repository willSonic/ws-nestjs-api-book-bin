import { IBookedResponse } from '../../../booked/interfaces/responses/iBooked.response';
import { IMessageResponse } from '../../../messages/interfaces/responses/iMessage.response';
import { IUserResponse } from '../../../user/interfaces/responses/iUser.response';
import { ICommentResponse } from '../../../comments/interfaces/responses/iComment.response';

export interface IProfileResponse{
  id:string,
  user: IUserResponse,
  checkedOutCount: number,
  waitListCount: number,
  comments?:ICommentResponse[],
  messages?: IMessageResponse[],
  booksOut?: IBookedResponse[],
  waitList?: Array<{  userId:string,  requestDate: Date }>,
  interestCategories?: string[],
  createdAt:Date,
  modifiedAt: Date
}
