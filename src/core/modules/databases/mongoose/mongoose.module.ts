import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService  } from "../../config";

@Module({
  imports: [
        MongooseModule.forRootAsync({
            imports: [ ConfigModule],
            inject:  [ConfigService],
            useFactory: async (config: ConfigService) =>
                  ({ uri: config.get('mongo').get('urlClient') })
            }),
    ],
  exports: [MongooseModule],
})

export class MongooseMongoDBModule {}
