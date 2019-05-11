import {HttpException, Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { IUserDocument } from "../user/interfaces/mongoose/iUser.document";
import { ConfigService } from "../../../core/modules/config/config.service";
import { AuthenticationLoginDTO } from "./authenticationDTO/authentication.dto";
import {IUserResponse} from "../user/interfaces/responses/iUser.response";
import {IAuthResponse} from "./interfaces/iauth.response";
import {JwtPayload} from "./interfaces/jwt-payload.interface";

@Injectable()
export class AuthenticationService {
    constructor(
    @InjectModel('User') private readonly userModel:Model<IUserDocument> ,
    private readonly userService: UserService,
    private readonly configService:ConfigService,
    private readonly jwtService: JwtService,) {}

    createToken(userId:string) {
        let timeToExp = this.configService.get('auth').get('expireTime');
        console.log(' createToken timeToExp ', timeToExp)
        const user:JwtPayload = { id:userId};
        const accessToken = this.jwtService.sign(user,  { expiresIn:timeToExp });
        return {
          expiresIn:timeToExp,
          accessToken,
        };
    }


    async login( user:AuthenticationLoginDTO): Promise< IAuthResponse | HttpException >{
       const loginResult = await this.userService.getAuthorizedUser(user);
       const loggedInUser = <IUserResponse>(loginResult);
       const newToken = this.createToken(loggedInUser.id);
       // TODO
       // udpdate set up redis
       console.log('AuthenticationService login -- loggedInUser =  ', loggedInUser)
       console.log('AuthenticationService login -- newToken.accessToken =  ', newToken.accessToken)
       return  <IAuthResponse>({ user:loggedInUser, token:newToken.accessToken })
    }



    async validateUser(payload: { id: string  }): Promise< any> {
           console.log( 'AuthenticationService login --  validateUser =', payload)
          return  await this.userService.getUserById(payload.id);
    }
}
