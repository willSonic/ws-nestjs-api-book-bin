import { Schema } from "mongoose";
import { IBookedDocument } from '../interfaces/mongoose/iBooked.document';
import { getExpireTime, createDate } from '../../../../business-layer/utils/bizRules';

/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
 const  BookedSchema:Schema = new Schema({
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
      default: createDate(getExpireTime()),
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

BookedSchema.pre("save", function (next : any) {
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


export { BookedSchema };
