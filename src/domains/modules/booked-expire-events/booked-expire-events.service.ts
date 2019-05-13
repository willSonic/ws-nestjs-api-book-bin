import { Model } from 'mongoose';
import { Injectable, NotAcceptableException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IBookedExpireEventDocument} from "./interfaces/mongoose/iBookedExpireEvent.document";
import { IBookedExpireEventResponse } from "./interfaces/responses/iBookedExpireEvent.response";
import {ConfigService} from "../../../core/modules/config";

@Injectable()
export class BookedExpireEventsService {

  constructor(
        @InjectModel("BookedExpireEvents" ) private  bookedExpireEventModel: Model<IBookedExpireEventDocument>,
        private readonly configService:ConfigService
      ) {

      this.bookedExpireEventModel.watch().on('change', (change)=>{
       console.log('BookExpireEventRepo   -- change.operationType === ', change.operationType );
       console.log('BookExpireEventRepo   -- getExpireTime === ', configService.getExpireTime()/1000 );
            if(change.operationType === 'delete') {
                console.log('BookExpireEventRepo   -- change.documentKey._id =', change.documentKey._id);
            }
        });
  }

   public async createBookedExpireEvent( bookId:string):Promise<any> {
      let previousBExpiredEvent = await this.bookedExpireEventModel.findOne(
        {booked:bookId }
        );
      if(previousBExpiredEvent && previousBExpiredEvent.id){
         return  {  thrown:true,
                    success:false,
                    status:409,
                    message: "BookedExpireEvent for this Booked  entity was previously established"
                    };
      }
      let bookedExpireEventResult =  await this.bookedExpireEventModel.create({booked:bookId } );

      if(!bookedExpireEventResult){
          return  {thrown:true,
                   success:false,
                   status:422,
                   message: "db is currently unable to process this.bookedExpireEventModel create request"};
      }
      return <IBookedExpireEventResponse>(bookedExpireEventResult);
    }
}
