interface IExpressEnv{
   port:number;
   debug:number;
   host:string;
}
interface ISwaggerEnv{
   path:string;
}

interface IJwtSecurityEnv{
    jwt_secret:string;
    jwt_short_time_secret:string;
    expireTime:number;
}

interface IMongodbEnv{
    port:number;
    replicaSetName:string;
    replicaPrimary:string;
    dataBaseName:string;
    urlDocker:string;
    urlClient:string;
}

interface IRedisEnv {
    TTL:number;
    port:number;
    urlDocker:string;
}

interface IWaitListOpp{
     expireTime:number;
}

interface IBorrowTime{
     expireTime:string;
}

export interface EnvConfig {
     express:IExpressEnv;
     swagger:ISwaggerEnv;
     auth:IJwtSecurityEnv;
     mongo:IMongodbEnv;
     redis:IRedisEnv;
     waitListOpp:IWaitListOpp;
     borrowTime:IBorrowTime;
}
