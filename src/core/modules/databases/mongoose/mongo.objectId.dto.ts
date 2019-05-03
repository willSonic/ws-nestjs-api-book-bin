import { IsMongoId } from 'class-validator';

export class MongoObjectIdDTO {
  @IsMongoId() id: string;
}
