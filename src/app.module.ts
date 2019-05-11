import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './domains/modules/authentication/authentication.module';
import { UserModule } from './domains/modules/user/user.module';
import { ProfilesModule } from './domains/modules/profiles/profiles.module';
import { MongooseMongoDBModule } from "./core/modules/databases/mongoose/mongoose.module";

@Module({
  imports: [
    AuthenticationModule,
    UserModule,
    MongooseMongoDBModule,
    ProfilesModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
