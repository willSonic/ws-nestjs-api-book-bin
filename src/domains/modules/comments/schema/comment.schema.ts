import { Schema } from "mongoose";
import { ICommentDocument } from '../interfaces/mongoose/iComment.document';

/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
const CommentSchema:Schema = new Schema({
  text: {
     type: String,
     required: true,
     trim: true,
  },
  bookRef:{
      type: Schema.Types.ObjectId,
      ref: 'book',
      required: true,
  },
  userRef:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
  },
  createdAt: {
	   type: Date,
	   default : Date.now()
  },

  modifiedAt: {
	   type: Date,
	   default : Date.now()
  }

});

CommentSchema.pre("save", function (next : any) {
      if (this) {
        let doc = <ICommentDocument>this;
        let now = new Date();

        if (!doc.createdAt) {
          doc.createdAt = now;
        }

        doc.modifiedAt = now;

      }

      next();
});


export { CommentSchema };
