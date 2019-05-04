import { Module, forwardRef} from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from  './strategies/jwt.strategy'
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import {ConfigModule} from "../../../core/modules/config/config.module";
import {UserModule} from "../user/user.module";
import {ConfigService} from "../../../core/modules/config/config.service";
import {UserSchema} from "../user/schema/user.schema";

@Module({
  imports: [
     // handle circular dependency... we need UserModule here to check validation
    //  userModule will need  to use Authentication Services
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.registerAsync(
    {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>({
        secretOrPrivateKey:config.get('auth').get('jwt_secret'),
        signOptions: {
          expiresIn: config.get('auth').get('expireTime'),
        },
      })
    }),
    ConfigModule,
    UserModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy],
  exports: [PassportModule, AuthenticationService]
})
export class AuthenticationModule {}
