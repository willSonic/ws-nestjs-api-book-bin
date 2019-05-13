import { Injectable, NotAcceptableException, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IMessageResponse, IMessageResponses } from "./interfaces/responses/iMessage.response";
import { IMessageDocument } from "./interfaces/mongoose/iMessage.document";


@Injectable()
export class MessagesService {

  constructor(
    @InjectModel("Message") private readonly messageModel:Model<IMessageDocument>
    ) {}

  public async createNewMessage(message:any):Promise<IMessageResponse> {
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

  public async getMessagesByUserRef(userRef:string):Promise<IMessageResponses> {
      let messages =  await this.messageModel.find({ userRef : userRef});
      if(!messages){
          throw  new HttpException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: "This user does not have any messages",
            }, 404);
      }
      return <IMessageResponses>(messages);
  }

  public async deleteExistingMessage(messageId:string):Promise<any> {

      let deleteMessageResult = await this.messageModel.findByIdAndRemove(messageId);
      if(deleteMessageResult.errors){
        throw new HttpException({
                  status: HttpStatus.UNPROCESSABLE_ENTITY,
                  error: 'DB is unable to process request',
                }, 422);
      }
      return deleteMessageResult;
  }

}
