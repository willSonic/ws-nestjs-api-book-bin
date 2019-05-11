import {IUserResponse} from "../../user/interfaces/responses/iUser.response";

export interface IAuthResponse {
    readonly user:IUserResponse;
    readonly token: string;
}
