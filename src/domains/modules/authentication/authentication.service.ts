import {HttpException, Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { IUserDocument } from "../user/interfaces/mongoose/iuser.document";
import { ConfigService } from "../../../core/modules/config/config.service";
import { AuthenticationLoginDTO } from "./authenticationDTO/authentication.dto";
import {IUserResponse} from "../user/interfaces/responses/iuser.response";
import {IAuthResponse} from "./interfaces/iauth.response";

@Injectable()
export class AuthenticationService {
    constructor(
    @InjectModel('User') private readonly userModel:Model<IUserDocument> ,
    private readonly userService: UserService,
    private readonly configService:ConfigService,
    private readonly jwtService: JwtService,) {}

    createToken(userId:string) {
        const accessToken = this.jwtService.sign(userId);
        return {
          expiresIn:this.configService.get('auth').get('expireTime'),
          accessToken,
        };
    }


    async login( user:AuthenticationLoginDTO): Promise< IAuthResponse | HttpException >{
       const loginResult = await this.userService.getAuthorizedUser(user);
       if( loginResult.hasOwnProperty('id')){
           const loggedInUser = <IUserResponse>(loginResult);
           const newToken = this.createToken(loggedInUser.id);
           // TODO
           // udpdate set up redis

		   return  <IAuthResponse>({
		    user:loggedInUser,
		    token:newToken.accessToken
		    })
		}
        return <HttpException>(loginResult);
    }



    async validateUser(payload: { userName: string  }): Promise< IUserResponse | HttpException > {
          return  await this.userService.getByUsername(payload.userName);
    }
}
