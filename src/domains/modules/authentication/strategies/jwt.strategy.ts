import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { AuthenticationService } from '../authentication.service';
import {ConfigService} from "../../../../core/modules/config/config.service";

@Injectable()
export  class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authenticationService: AuthenticationService,
     private readonly config: ConfigService) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: config.get('auth').get('jwt_secret'),
        });
    }

   async validate(payload: JwtPayload) {
    const user = await this.authenticationService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
