import {Controller, Post, Get, Response, HttpStatus,Param, Body, HttpException, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from "../user/user.service";
import { ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import {UserCreateDTO} from "./userDTO/user.create.dto";
import {AuthenticationService} from "../authentication/authentication.service";
import {IUserResponse} from "./interfaces/responses/iuser.response";
import {IAuthResponse} from "../authentication/interfaces/iauth.response";


@ApiUseTags('user')
@Controller('user')
export class UserController {
	constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly userService: UserService
	   ) {}


    @Post()
	@ApiResponse({ status: 201, description: 'Successful created a new user' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
    public async registerNewUser(@Body()  userCreateRequest: UserCreateDTO){
       let newUserAttempt = await this.userService.createNewUser(userCreateRequest);
       if( newUserAttempt.hasOwnProperty('id')){
           const loggedInUser = <IUserResponse>(newUserAttempt);
           const newToken = this.authenticationService.createToken(loggedInUser.id);
           // TODO
           // udpdate set up redis
		   return  <IAuthResponse>({
		    user:loggedInUser,
		    token:newToken.accessToken
		    })
		}
        return <HttpException>(newUserAttempt);
    }


    @Get('userId')
	@ApiBearerAuth()
	@UseGuards(AuthGuard('JWT'))
	@ApiResponse({ status: 201, description: 'Successful Login' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	@ApiResponse({ status: 404, description: 'Bad Request' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
    public async getUserById(@Param() userId:string){
        return await this.userService.getUserById(userId);
    }


    @Response<IErrorResponse>('404','no such user exist' )
    @Get('userName/{userName}')
    public async GetUserByUsername( @Path() userName: string) {
        let result =  await this.userService.getByUsername(userName)
        if( result && result.userName){
               var aUser = new UserModel(result);
               return <IUserResponse>( {user:aUser.getClientUserModel()});
        }else{
              throw result;
        }
    }


    @Patch()
    public async UpdateUser(@Body() request: IUserUpdateRequest ) {
        let result =  await this.userService.updateUser(request);
        if(result.id){
              var aUser = new UserModel(result);
               return <IUserResponse>(aUser.getClientUserModel());
        }else{
          throw result
        }
    }


}
