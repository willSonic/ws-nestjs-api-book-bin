import { IProfileResponse } from './iProfile.response';

export interface IProfileAddBookResponse{
  isWaitListOption:boolean,
  bookId?:string,
  listPosition?:number,
  waitTime?:number,
  profile?:IProfileResponse
}
