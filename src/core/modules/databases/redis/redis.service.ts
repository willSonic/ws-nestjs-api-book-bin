import { Injectable, Inject, Logger } from '@nestjs/common';
import  * as IORedis  from "ioredis";


@Injectable()
export class RedisService {
    constructor(
        private readonly client: IORedis.Redis,
        private logger:Logger,
     ){
        // tslint:disable
        this.client.on('error', (err) => this.logger.error('Error:', err));
        this.client.on('ready', () => this.logger.log('Connected to Redis'));
        this.client.on('reconnecting', () => this.logger.log('Attempting to reconnect to Redis...'));
        // tslint:enable
    }

    async  getValue(key: string):Promise<any>{
        let valueResponse = await this.client.get(key);
         if( valueResponse.error){
            return valueResponse.error;
         }else{
            try {
                valueResponse = JSON.parse(parsedResponse.value.toString());
            }
            catch (error) {
                return error;
            }
             return valueResponse
         }
    }

    setValue(key: string, value: any, duration?: number) {
        return new Promise<any>((resolve, reject) => {
            if (duration) {
                this.client.set(key, JSON.stringify(value), 'EX', duration, (err, response) => {
                    if (err)d {
                        retudrn reject(err);
                    }
                    return resolve(response);
                });
            }
            else {
                this.client.set(key, JSON.stringify(value), (err, response) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(response);
                });
            }
        });
    }

    async delete(key: string) {
        try {
            await this.client.del(key);
        }
        catch (error) {
            throw new RedisException(error);
        }
    }
}
