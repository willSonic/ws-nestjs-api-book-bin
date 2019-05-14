import { Injectable, NotAcceptableException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProfileResponse} from "./interfaces/responses/iProfile.response";
import { IProfileDocument } from "./interfaces/mongoose/iProfile.document";

@Injectable()
export class ProfilesService {

  constructor(
    @InjectModel("profiles" ) private readonly profileModel: Model<IProfileDocument>
  ) {}

  public async createNewProfile(userId:string):Promise<IProfileResponse> {
      let previousProfile =  await this.profileModel.findOne({ user : userId});
      if(previousProfile){
          throw  new HttpException({
              status: HttpStatus.CONFLICT,
              error: `A Profile for User with id ${userId} was previously created!`,
          }, 409);
      }
      try{
         let newProfileResult =  await this.profileModel.create({ user : userId});
         console.log('ProfilesService createNewProfile--- newProfileResult =', newProfileResult._id );
         let newProfileWithSubs = await this.profileModel.findById(newProfileResult._id).populate('user');
         console.log('ProfilesService createNewProfile--- newProfileWithSubs =', newProfileWithSubs );
         return <IProfileResponse>(newProfileWithSubs);
      }catch(error){
           console.log('ProfilesService createNewProfile--- error =', error )
          throw  new HttpException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: 'DB is unable to process request',
            }, 422);
      }
  }

  public async getProfileById(profileId:string):Promise<IProfileResponse> {
   let profile =  await this.profileModel.findById( profileId)
        .populate('user')
        .populate('messages')
        .populate('comments')
        .populate({ path:'booksOut', populate:{ path:'book' }})
        .populate('inventories');
      if(!profile){
            throw  new HttpException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: `Profile  with id  ${ profileId} does not exist!`,
            }, 404);
      }
      return  <IProfileResponse>(profile);
  }


  public async getProfileByUserId(userId:string):Promise<IProfileResponse> {
      let profile =  await this.profileModel.findOne({ user : userId})
        .populate('user')
        .populate('messages')
        .populate('comments')
        .populate({ path:'booksOut', populate:{ path:'book' }})
        .populate({ path:'inventories.waitList', match:{userId: {   $eq: userId} }});
      if(!profile){
            throw  new HttpException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: `Profile for a User with id  ${ userId} does not exist!`,
            }, 404);
      }
      return  <IProfileResponse>(profile);
  }


  public async updateProfile(profile:any):Promise<IProfileResponse> {
      let resultProfileById = await this.profileModel.findById(profile.id);
      if(!resultProfileById){
          throw  new HttpException({
              status: HttpStatus.CONFLICT,
              error: `A Profile with id ${profile.id} does not exist!`,
          }, 409);
      }
      Object.keys( resultProfileById).forEach(item =>{
              if(profile[item] && profile[item] !== undefined){
                  resultProfileById[item] = profile[item];
              }
        });
      let savedResult = await resultProfileById.save();
     savedResult = savedResult.populate('user')
        .populate('messages')
        .populate('comments')
        .populate({ path:'booksOut', populate:{ path:'book' }})
        .populate({ path:'inventories'});
      if(savedResult.errors){
          throw  new HttpException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: 'DB is unable to process request',
            }, 422);
      }

      return  <IProfileResponse>(savedResult);
  }


  public async deleteExistingProfile(profileId:string):Promise<any> {
      let deleteProfileResult = await this.profileModel.findByIdAndRemove(profileId);
      if(deleteProfileResult.errors){
          throw  new HttpException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: 'DB is unable to process request',
            }, 422);
      }
      return  <IProfileResponse>(deleteProfileResult);
  }


}
