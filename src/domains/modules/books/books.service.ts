import { Model } from 'mongoose';
import { Injectable, NotAcceptableException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IBookResponse} from "./interfaces/responses/iBook.response";
import { IBooksDocument } from "./interfaces/mongoose/iBooks.document";


@Injectable()
export class BooksService {

  constructor(
    @InjectModel("Book") private readonly bookModel:Model<IBooksDocument>
    ) {}

  public async createNewBook(book:any):Promise<IBookResponse> {
      let newBook = <IBooksDocument>(book);
      let previousBook =  await this.bookModel.findOne({ googleId : newBook.id});
      if(previousBook){
          throw  new HttpException({
              status: HttpStatus.CONFLICT,
              error: `A book with an id of ${book.googleId} previously created!`,
          }, 409);
      }
      let newBookResult =  await this.bookModel.create(newBook);
      if(newBookResult.errors){
          throw new HttpException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: 'DB is unable to process request',
            }, 422);
      }
      return <IBookResponse>(newBookResult);
  }

  public async getBookByTitle(title:string):Promise<IBookResponse> {
      let book =  await this.bookModel.find({ title : title});
      if(!book){
          throw  new HttpException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: `There is no book present with a title ${ title }!`,
            }, 404);
      }
      return <IBookResponse>(book);
  }

  public async getBookByGoogleId( googleId:string):Promise<IBookResponse>{
      let book =  await this.bookModel.findOne({ googleId : googleId});
      if(!book){
          throw  new HttpException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: `There is no book present with a googleId, of${ googleId }!`,
              }, 401);
      }
      return <IBookResponse>(book);
  }

  public async getBookById( bookId:string):Promise<any>{
      let bookResult = await this.bookModel.findById(bookId);
      if(!bookResult){
          throw  new HttpException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: `There is no book present with an id, of ${ bookId }!`,
              }, 401);
      }
      return <IBookResponse>(bookResult);
  }

  public async deleteExistingBook(bookId:string):Promise<any> {
      let deleteBookResult = await this.bookModel.findByIdAndRemove(bookId);
      if(deleteBookResult.errors){
          throw new HttpException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: 'DB is unable to process request',
            }, 422);
      }
      return deleteBookResult;
  }


}
