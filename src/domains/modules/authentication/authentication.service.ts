import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import {IUserDocument} from "../user/interfaces/mongoose/iuser.document";
import {ConfigService} from "../../../core/modules/config/config.service";

@Injectable()
export class AuthenticationService {
    constructor(
    private readonly userService: UserService,
    private readonly configService:ConfigService,
    private readonly jwtService: JwtService ) {}

    createToken(user:IUserDocument) {
        const accessToken = this.jwtService.sign(user.id);
        return {
          expiresIn: (8*60*60),
          accessToken,
        };
    }

    async validateUser(payload: {
        userName: string
    }): Promise<boolean> {
        const user = await this.userService.findOne({
            where: { userName: payload.userName }
        });
        return !!user;
    }
}
