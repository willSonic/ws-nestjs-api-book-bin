import { Model } from 'mongoose';
import { Injectable, NotAcceptableException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICommentDocument } from "./interfaces/mongoose/iComment.document";
import { ICommentResponse, ICommentResponses } from "./interfaces/responses/iComment.response";

@Injectable()
export class CommentsService {

  constructor(
    @InjectModel("Comment" ) private readonly commentModel: Model<ICommentDocument>
  ) {}

  public async createNewComment(comment:any):Promise<ICommentResponse> {
      let newComment = <ICommentDocument>(comment);
      let newCommentResult =  await this.commentModel.create(newComment);
      if(newCommentResult.errors){
          throw  new HttpException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: 'DB is unable to process request',
            }, 422);
      }
      return <ICommentResponse>(newCommentResult);
  }

  public async updateComment(comment:any):Promise<ICommentResponse> {
      let resultCommentById = await this.commentModel.findById(comment.id);
      if(!resultCommentById){
           throw  new HttpException({
                  status: HttpStatus.CONFLICT,
                  error: `A comment with an id of ${comment.id}  does not exist!`,
                }, 409);
      }

      Object.keys( resultCommentById).forEach(item =>{
              if(comment[item] && comment[item] !== undefined){
                  resultCommentById[item] = comment[item];
              }
      });

      let savedResult = await resultCommentById.save();
      if(savedResult.errors){
          throw  new HttpException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: 'DB is unable to process request',
            }, 422);
      }

      return <ICommentResponse>(savedResult);
  }

  public async getAllCommentsByUserId(userId:any):Promise<ICommentResponses> {
      let commentsByUserRefResult = await this.commentModel.find({ userRef:userId});
      if(!commentsByUserRefResult){
           throw  new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: `There are comments from a user with an id  of, ${userId}!`,
              }, 401);
      }
      return <ICommentResponses>(commentsByUserRefResult);
  }

  public async getAllCommentsByBookId(bookId:string):Promise<ICommentResponses> {
      let commentsByBookRefResult = await this.commentModel.find({ bookRef:bookId});
      if(!commentsByBookRefResult){
          throw  new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: `There are comments for a book with an id ${bookId}!`,
              }, 401);
      }
      return <ICommentResponses>(commentsByBookRefResult);
  }


  public async deleteComment(commentId:string):Promise<any> {
      let deleteCommentResult = await this.commentModel.findByIdAndRemove(commentId);
      if(deleteCommentResult.errors){
          throw  new HttpException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: 'DB is unable to process request',
            }, 422);
      }
      return deleteCommentResult;
  }


}
