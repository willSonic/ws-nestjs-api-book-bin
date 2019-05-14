import {Controller, Post, Get,Put, Response, Res, Req,
HttpStatus,Param, Body, HttpException, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import {ProfileCreateDTO} from "./profilesDTO/profile.create.dto";
import {ProfilesService} from "./profiles.service";
import {UserService} from "../user/user.service";


@ApiUseTags('profile')
@Controller('profile')
export class ProfilesController {

	constructor(
	  private readonly profilesService:ProfilesService,
    ){}

    @Post('create')
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @ApiOperation({ title: 'Create a user Profile' })
	@ApiResponse({ status: 201, description: 'Successful created a new user Profile' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
    public async  createNewUserProfile(@Body() profileCreateRequest:ProfileCreateDTO){
        return await this.profilesService.createNewProfile(profileCreateRequest.userId)
    }



}
