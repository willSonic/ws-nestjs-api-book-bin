import {Document} from 'mongoose';
import {IUserDocument} from './iuser.document';
export interface IUserModel extends Document, IUserDocument {
}
