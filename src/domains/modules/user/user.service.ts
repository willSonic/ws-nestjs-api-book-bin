import { Model } from 'mongoose';
import { Injectable, NotAcceptableException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUserDocument } from "./interfaces/mongoose/iUser.document";
import { IUserResponse } from "./interfaces/responses/iUser.response";
import { UserSchema } from "./schema/user.schema";

@Injectable()
export class UserService {

  constructor(
    @InjectModel("User" ) private readonly userModel: Model<IUserDocument>
    ) {}

  public async createNewUser(user:any):Promise<IUserResponse> {
      let newUser = <IUserDocument>(user);
      let previousUser =  await this.userModel.findOne({ userName : newUser.userName});
      if(previousUser){
         throw  new HttpException({
                      status: HttpStatus.CONFLICT,
                      error: `A user with a userName ${newUser.userName} already exist`,
                    }, 409);
      }
      newUser.isLoggedIn = true;
      let newUserResult =  await this.userModel.create(newUser);
      if(newUserResult.errors){
          throw  new HttpException({
                      status: HttpStatus.UNPROCESSABLE_ENTITY,
                      error: 'DB is unable to process request',
                    }, 422);
      }
      return <IUserResponse>(newUserResult);
  }


  public async getAuthorizedUser(auth:any):Promise<IUserResponse> {
      let authorizedUserResult = await this.userModel.findOne({ userName:auth.userName});
      if(!authorizedUserResult){
            throw new HttpException({
                    status: HttpStatus.UNAUTHORIZED,
                    error: `No user exist with a userName ${auth.userName}`,
                  }, 401);
      }
      let passwordsMatch =   await UserSchema.methods.comparePassword( auth.password, authorizedUserResult);
      if(!passwordsMatch){
            throw  new HttpException({
                    status: HttpStatus.UNAUTHORIZED,
                    error: 'The userName or password is incorrect',
                  }, 401);

      }
      // var userProfile = <IUserDocument>authorizedUserResult;
      // userProfile.isLoggedIn = true;
      // let savedResult = await userProfile.save();
      // if(savedResult.errors){
      //     return  new HttpException({
      //                     status: HttpStatus.UNPROCESSABLE_ENTITY,
      //                     error: 'DB is unable to process request',
      //                   }, 422);
      // }
       return <IUserResponse>(authorizedUserResult);
  }


  public async getByUsername(userName:string):Promise<IUserResponse> {
      let userResult =  await this.userModel.findOne({ userName : userName});
      if(!userResult){
            throw  new HttpException({
                          status: HttpStatus.UNPROCESSABLE_ENTITY,
                          error: `No user exist with a userName ${userName}`,
                        }, 404);
      }
      return <IUserResponse>(userResult);
  }

  public async getUserById( userId:string):Promise<IUserResponse>{
      let userResult = await this.userModel.findById(userId);
      if(!userResult){
          throw  new HttpException({
                      status: HttpStatus.UNPROCESSABLE_ENTITY,
                      error: `No user exist with an id { ${userId} }`,
                    }, 404);
      }
      return <IUserResponse>(userResult);
  }

  public async updateUser(user:any):Promise<IUserResponse>{
      let resultUserById = await this.userModel.findById(user.id);
      if(resultUserById){
          throw new HttpException({
                  status: HttpStatus.UNPROCESSABLE_ENTITY,
                  error: `No user exist with an id { ${user.id} }`,
                }, 404);
      }
      let savedResult = await resultUserById.save();
      if(savedResult.errors){
           throw new HttpException({
                  status: HttpStatus.UNPROCESSABLE_ENTITY,
                  error: 'DB is unable to process request',
                }, 422);
      }

      return <IUserResponse>(savedResult);

  }

  //   public async destroy() {
  //   throw new Error('todo!');
  // }

}
