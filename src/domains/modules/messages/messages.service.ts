
import { Injectable, NotAcceptableException, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IMessageResponse, IMessageResponses } from "./interfaces/responses/iMessage.response";
import { IMessageDocument } from "./interfaces/mongoose/iMessage.document";
import { MessageSchema } from "./schema/message.schema";
import { IUserResponse } from "../user/interfaces/responses/iUser.response";


@Injectable()
export class MessagesService {


  constructor(
    @InjectModel("Message") private readonly messageModel:Model<IMessageDocument>
    ) {}

  public async createNewMessage(message:any):Promise<any> {
      let newMessage = <IMessageDocument>(message);
      let newMessageResult =  await this.messageModel.create(newMessage);
      if(newMessageResult.errors){
           throw new HttpException({
                  status: HttpStatus.UNPROCESSABLE_ENTITY,
                  error: 'DB is unable to process request',
                }, 422);
      }

      return  <IMessageResponse>(newMessageResult);
  }

  public async getMessagesByUserRef(userRef:string):Promise<any> {
      let messages =  await this.messageModel.find({ userRef : userRef});
      if(!messages){
            return  {
              thrown:true,
              status:404,
              message: "this user does not have any messages"};
      }
      return <IMessageResponses>(messages);
  }

  public async deleteExistingMessage(messageId:string):Promise<any> {
      let objectId = mongoose.Types.ObjectId;
      if(! objectId.isValid(messageId)){
            return  {
              thrown:true,
              status:401,
              message: "incorrect message id"};
      }
      let deleteMessageResult = await MessageRepo.findByIdAndRemove(messageId);
      if(deleteMessageResult.errors){
          return  {
            status:422,
            message: "db is currently unable to process message delete request"};
      }
      return deleteMessageResult;
  }

}
