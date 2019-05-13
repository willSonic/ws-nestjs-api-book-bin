import { Injectable } from '@nestjs/common';
import { EnvConfig } from './env-config.interface';
import * as config from 'config';

@Injectable()
export class ConfigService {
  private readonly env: EnvConfig;
  readonly messageTypes = {
      BOOK_CHECKED_OUT:'BOOK_CHECKED_OUT',
      BOOK_CHECKED_IN:'BOOK_CHECKED_IN',
      BOOK_FORCE_CHECKED_IN:'BOOK_FORCE_CHECKED_IN',
      BOOK_USER_WAIT_LISTED:'BOOK_USER_WAIT_LISTED'
  };

  static  borrowerRules = {
    // ten days
    tenDayMS:7*24*60*60*1000,

    //dev fun 2Hours
    twoHrMS:2*60*60*1000,
    //dev fun 10 minutes
    tenMinMS:10*60*1000,
    //wait time for response from waitlist request
    twoMinMS: 2*60*1000,
    //maximum books a use can checkout
    maxCheckout:5,
    //maximum inventory waitlists a user can subscribe to
    maxWaitlist:10
  };


  constructor() {
    this.env = (config as any) as EnvConfig;
  }

  get(key: keyof EnvConfig): any {
    return this.env[key];
  }


  createMessageText(type, options):any{
    let message='';
    switch(type){
      case this.messageTypes.BOOK_CHECKED_OUT:
          message = `You have checked out ${ options.bookTitle } on`+
                     ` ${ options.checkOutDate } and it will need to be returned`+
                      `${ options.checkInDate }.`;
      break;
      case this.messageTypes.BOOK_USER_WAIT_LISTED:
          message = `You have been added to the waitList ${ options.bookTitle }.`;
       break;
    }
    return message;
  };



  static createDate( time:number ):any {
     return new Date(Date.now() + time);
  };




  static getExpireTime():any {
    const env  = (config as any) as EnvConfig;
    return this.borrowerRules[ env['borrowTime.expireTime'] ];
  };

}
