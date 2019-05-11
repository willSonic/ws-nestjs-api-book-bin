import { IUserResponse } from '../../../user/interfaces/responses/iUser.response';

export interface IMessageResponse{
  id: string;
  user: IUserResponse
  messageType: string;
  messageText: string;
  reviewedAt: Date
  modifiedAt: Date
  createdAt: Date
}

export type IMessageResponses = IMessageResponse[];
