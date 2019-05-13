import { Schema } from "mongoose";
import { Inject, Injectable } from '@nestjs/common';
import { IBookedDocument } from '../interfaces/mongoose/iBooked.document';
import { ConfigService } from "../../../../core/modules/config";

 @Injectable()
class BookedSchemaService {
  _bookedSchema:Schema;
    constructor(@Inject() configService:ConfigService) {
      this._bookedSchema =  new Schema({
                       user:{
                            type: Schema.Types.ObjectId,
                            ref: 'user',
                            required: true,
                      },

                      book:{
                            type: Schema.Types.ObjectId,
                            ref: 'book',
                            required: true,
                      },

                      returnDate: {
                          type: Date,
                          default: configService.createDate( configService.getExpireTime()),
                          required: true,
                      },

                      active:{
                          type: Boolean,
                          default:true,
                      },

                      createdAt: {
                           type: Date,
                           default : Date.now(),
                      },

                      modifiedAt: {
                           type: Date,
                           default : Date.now(),
                      }
                    });

      this.bookedSchema.pre("save", function (next : any) {
          if (this) {
            let doc = <IBookedDocument>this;
            let now = new Date();

            if (!doc.createdAt) {
              doc.createdAt = now;
            }

            doc.modifiedAt = now;

          }

          next();
      });
  }

    get bookedSchema():Schema{
         return this._bookedSchema;
    }
}

const  bookedSchemaService = new BookedSchemaService()

export {  BookedSchemaService }
