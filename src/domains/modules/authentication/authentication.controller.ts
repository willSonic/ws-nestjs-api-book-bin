import {Controller, Post, Response, HttpStatus, Body, HttpException} from '@nestjs/common';
import { UserService } from "../user/user.service";
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import {AuthenticationService} from "./authentication.service";
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
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	async login(@Body() authLoginRequest: AuthenticationLoginDTO, @Response() res){
		const response:IUserResponse|HttpException  = await this.userService.getAuthorizedUser(authLoginRequest);

	}

}
