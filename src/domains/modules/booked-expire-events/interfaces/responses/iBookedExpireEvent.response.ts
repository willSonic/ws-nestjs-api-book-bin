import { IBookedResponse } from "../../../booked/interfaces/responses/iBooked.response";

export interface IBookedExpireEventResponse{
    id: string;
    booked: IBookedResponse;
    createdAt: Date;
}
