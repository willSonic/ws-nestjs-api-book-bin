import {Controller, Post, Response, HttpStatus, Body, HttpException, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from "../user/user.service";
import { ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthenticationService } from "./authentication.service";
import { AuthenticationLoginDTO } from "./authenticationDTO/authentication.dto";
import {IUserResponse} from "../user/interfaces/responses/iuser.response";


@ApiUseTags('authentication')
@Controller('auth')
export class AuthenticationController {
	constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly userService: UserService
	   ) {}


	@Post('login')
	@ApiResponse({ status: 201, description: 'Successful Login' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	@ApiResponse({ status: 404, description: 'Bad Request' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	public async login(@Body() authLoginRequest: AuthenticationLoginDTO){
		return await this.userService.getAuthorizedUser(authLoginRequest);

	}


	@Post('logout')
	@ApiBearerAuth()
	@UseGuards(AuthGuard('JWT'))
	@ApiResponse({ status: 201, description: 'Successful logout' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	public async logout(@Body() authLoginRequest: AuthenticationLoginDTO){
		return await this.userService.getAuthorizedUser(authLoginRequest);

	}


}
