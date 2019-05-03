import {IUserResponse} from "../../user/interfaces/responses/iuser.response";

export interface IAuthResponse {
    readonly user:IUserResponse
    readonly token: string;
}
