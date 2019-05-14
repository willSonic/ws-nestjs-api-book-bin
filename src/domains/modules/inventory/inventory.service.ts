import { Model } from 'mongoose';
import { Injectable, NotAcceptableException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IInventoryDocument } from "./interfaces/mongoose/iInventory.document";
import { IInventoryResponse} from "./interfaces/responses/iInventory.response";

@Injectable()
export class InventoryService {

  constructor(
    @InjectModel("Inventory" ) private readonly inventoryModel: Model<IInventoryDocument>
    ) {}

  public async createNewInventory(inventory:any):Promise<IInventoryResponse> {
      let newInventory = <IInventoryDocument>(inventory);
      let previousInventory =  await this.inventoryModel.findOne({ bookGoogleId: inventory.bookGoogleId});
      if(previousInventory){
         throw  new HttpException({
                    status: HttpStatus.CONFLICT,
                    error: "An inventory for this book was previously established\"",
                }, 409);
      }
      let newInventoryResult =  await this.inventoryModel.create(newInventory);
      if(newInventoryResult.errors){
         throw  new HttpException({
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    error: 'DB is unable to process request',
                }, 422);
      }

      return <IInventoryResponse>(newInventoryResult);
  }

  public async updateInventory(inventory:any):Promise<IInventoryResponse> {
      let updatedInventory = await this.inventoryModel.findById(inventory.id);
      if(!updatedInventory){
         throw  new HttpException({
                      status: HttpStatus.CONFLICT,
                      error: "An inventory for the book ref does does not exist",
                    }, 409);
      }
      Object.keys( updatedInventory).forEach(item =>{
              if(inventory[item] && inventory[item] !== undefined){
                  updatedInventory[item] = inventory[item];
              }
        });
      let savedResult = await updatedInventory.save();
      if(savedResult.errors){
            throw  new HttpException({
                  status: HttpStatus.UNPROCESSABLE_ENTITY,
                  error: 'DB is unable to process request',
                }, 422);
      }

      return <IInventoryResponse>(savedResult);
  }


  public async getInventoryByGoogleId(googleId):Promise<IInventoryResponse>{
      let inventoryForBook =  await this.inventoryModel.find({ "bookGoogleId" : googleId});
      if(! inventoryForBook){
            throw  new HttpException({
                          status: HttpStatus.UNPROCESSABLE_ENTITY,
                          error: "No inventory exist for this book",
                        }, 404);
      }

      return <IInventoryResponse>(inventoryForBook);
  }

  public async getInventoryByBookRef(bookRef:string):Promise<IInventoryResponse> {
      let inventoryForBook =  await this.inventoryModel.findOne({ bookRef : bookRef});
      if(!inventoryForBook){
            throw  new HttpException({
                          status: HttpStatus.UNPROCESSABLE_ENTITY,
                          error: "No inventory exist for this book",
                        }, 404);
      }

      return <IInventoryResponse>(inventoryForBook);
  }



  public async deleteInventory(inventoryId:string):Promise<any> {
      let deleteInventoryResult = await this.inventoryModel.findByIdAndRemove(inventoryId);
      if(deleteInventoryResult.errors){
            throw  new HttpException({
                  status: HttpStatus.UNPROCESSABLE_ENTITY,
                  error: 'DB is unable to process request',
                }, 422);
      }

      return deleteInventoryResult;
  }


}
