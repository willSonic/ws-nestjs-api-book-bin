import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUserDocument } from "./interfaces/mongoose/iuser.document";
import { IUserModel } from "./interfaces/mongoose/IUserModel";

@Injectable()
export class UserService {

  constructor(@InjectModel('User') private readonly userModel: Model<IUserModel>) {}

  public async createNewUser(user:any):Promise<any> {
      let newUser = <IUserDocument>(user);
      let previousUser =  await this.userModel.findOne({ userName : newUser.userName});
      if(previousUser){
         return  {thrown:true, success:false, status:409,  message: "userName is already in use"};
      }
      newUser.isLoggedIn = true;
      let newUserResult =  await this.userModel.create(newUser);
      if(newUserResult.errors){
          return  {thrown:true, success:false,  status:422,  message: "db is currently unable to process request"};
      }
      return newUserResult;
  }


  public async getAuthorizedUser(auth:any):Promise<any> {
      let authorizedUserResult = await this.userModel.findOne({ userName:auth.userName});
      if(!authorizedUserResult){
            return  {thrown:true, status:401,  message: "no userName "+auth.userName+" currently exist"};
      }
      let passwordsMatch =   await UserSchema.methods.comparePassword( auth.password, authorizedUserResult);
      if(!passwordsMatch){
            return  {thrown:true, status:401,  message: "userName or password is incorrect"};

      }
      var userProfile = <IUserDocument>authorizedUserResult;
      userProfile.isLoggedIn = true;
      let savedResult = await userProfile.save();
      if(savedResult.errors){
          return  {thrown:true, status:422,  message: "db is currently unable to process request"};
      }
      return authorizedUserResult;
  }


  public async getByUsername(userName:string):Promise<any> {
      let authUser =  await this.userModel.findOne({ userName : userName});
      if(!authUser){
            return  {thrown:true, status:404,  message: "userName does not exit"};
      }
      return authUser;
  }

  public async getUserById( userId:string):Promise<any>{
      let objectId = mongoose.Types.ObjectId;
      if(! objectId.isValid(userId)){
            return  {status:401,  message: "incorrect user id"};
      }
      let result = await this.userModel.findById(userId);
      return result;
  }

  public async updateUser(user:any):Promise<any> {
      let objectId = mongoose.Types.ObjectId;
      if(! objectId.isValid(user.id)){
            return  {thrown:true, status:401,  message: "incorrect user id"};
      }
      let resultUserById = await this.userModel.findById(user.id);
      if(resultUserById){
         return  {thrown:true, status:409,  message: "this user does not exist"};
      }
      let savedResult = await resultUserById.save();
      if(savedResult.errors){
          return  {status:422,  message: "db is currently unable to process request"};
      }

      return savedResult;

  }

    public async destroy() {
    throw new Error('todo!');
  }

}
