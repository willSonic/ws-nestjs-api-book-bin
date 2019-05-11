import {Controller, Post, Get,Put, Response, Res, Req,
HttpStatus,Param, Body, HttpException, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from "../authentication/guards/jwt-auth.guard";
import { UserService } from "../user/user.service";
import { ApiResponse, ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import {UserCreateDTO} from "./userDTO/user.create.dto";
import {AuthenticationService} from "../authentication/authentication.service";
import {IUserResponse} from "./interfaces/responses/iUser.response";
import {IAuthResponse} from "../authentication/interfaces/iauth.response";
import {UserUpdateDTO} from "./userDTO/user.update.dto";


@ApiUseTags('user')
@Controller('user')
export class UserController {
	constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly userService: UserService
	   ) {}


    @Post('register')
    @ApiOperation({ title: 'Register a new User' })
	@ApiResponse({ status: 201, description: 'Successful created a new user' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
    public async registerNewUser(@Body()  userCreateRequest: UserCreateDTO){
       let newUserAttempt = await this.userService.createNewUser(userCreateRequest);
	   const loggedInUser = <IUserResponse>(newUserAttempt);
	   const newToken = this.authenticationService.createToken(loggedInUser.id);
	   // TODO
	   // udpdate set up redis
	   return  <IAuthResponse>({
		user:loggedInUser,
		token:newToken.accessToken
		})
    }


    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ title: 'Fetch User by id attribute' })
	@ApiResponse({ status: 201, description: 'Successful Login' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	@ApiResponse({ status: 404, description: 'Bad Request' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@UseGuards(AuthGuard())
    public async getUserById(@Param('id') id:string ){
        return await this.userService.getUserById(id);
    }


    @Get(':userName}')
    @ApiOperation({ title: 'Fetch User by userName attribute' })
	@ApiResponse({ status: 201, description: 'Successful fetch of user by user name' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	@ApiResponse({ status: 404, description: 'Bad Request' })
    public async  getUserByUsername( @Param('userName') userName: string) {
        return  await this.userService.getByUsername(userName)
    }


    @Put()
    @ApiOperation({ title: 'Update Current User' })
	@ApiBearerAuth()
	@ApiResponse({ status: 201, description: 'Successful update of user' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	@ApiResponse({ status: 404, description: 'Bad Request' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
    public async UpdateUser(@Body() updateUserRequest:UserUpdateDTO ) {
       return await this.userService.updateUser(updateUserRequest);
    }


}
