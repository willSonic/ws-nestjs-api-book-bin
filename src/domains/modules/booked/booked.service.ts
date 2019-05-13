import { Model } from 'mongoose';
import { Injectable, NotAcceptableException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IBookedDocument } from "./interfaces/mongoose/iBooked.document";
import { IBookedResponse, IBookedResponses } from "./interfaces/responses/iBooked.response";
import {ConfigService} from "../../../core/modules/config";

@Injectable()
export class BookedService {
  constructor(
    private config: ConfigService,
    @InjectModel("Booked") private readonly bookedModel:Model<IBookedDocument>
    ) {}

  public async createNewBooked(booked:any):Promise<IBookedResponse> {
      let newBooked = <IBookedDocument>(booked);

      let previousBooked =  await this.bookedModel.findOne(
        { user : newBooked.user, book:newBooked.book }
        );
      if(previousBooked){
         previousBooked.active = true;
         previousBooked.returnDate = this.config.createDate( this.config.getExpireTime() );
         previousBooked = await previousBooked.save();
         if(previousBooked.errors){
            throw new HttpException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: 'DB is unable to process request',
            }, 422);
         }
         return <IBookedResponse>(previousBooked);
      }

      let newBookedResult =  await this.bookedModel.create(newBooked);
      if(newBookedResult.errors){
          throw new HttpException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: 'DB is unable to process request',
            }, 422);
      }
      return <IBookedResponse>(newBookedResult);
  }

  public async updateBooked(booked:any):Promise<IBookedResponse>{
      let resultBookedById = await this.bookedModel.findById(booked.id);
      if(!resultBookedById){
          throw  new HttpException({
              status: HttpStatus.CONFLICT,
              error: `A booked record with an id of ${booked.id} does not exist!`,
          }, 409);
      }

      Object.keys( resultBookedById).forEach(item =>{
              if(booked[item] && booked[item] !== undefined){
                  resultBookedById[item] = booked[item];
              }
        });
      let savedResult = await resultBookedById.save();
      if(savedResult.errors){
          throw new HttpException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: 'DB is unable to process request',
            }, 422);
      }
      return <IBookedResponse>(savedResult);
  }

  public async getBookedById( bookedId:string):Promise<IBookedResponse>{
      let bookedResult = await this.bookedModel.findById(bookedId);
      if(bookedResult.errors){
          throw new HttpException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: 'DB is unable to process request',
            }, 422);
      }
      return <IBookedResponse>(bookedResult);
  }

  public async getBookedByUserRef(userRef:string):Promise<IBookedResponses> {
      let userBookRefs =  await this.bookedModel.find({ userRef : userRef});
      if(!userBookRefs){
          throw  new HttpException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: `User  with the id ${ userRef } does not have any current books booked!`,
            }, 404);
      }
      return <IBookedResponses>(userBookRefs);
  }

  public async getBookedByBookRef( bookRef:string):Promise<IBookedResponse>{
      let booked =  await this.bookedModel.findOne({ bookRef : bookRef});
      if(!booked){
          throw  new HttpException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: `There is no Booked for present with a book id, of ${ bookRef }!`,
              }, 401);
      }
      return <IBookedResponse>(booked);
  }

}
