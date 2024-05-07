import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, SignInUserDto } from './user.dto';
import { BasicResponse } from '../../interface/response/basic';
import { Roles } from '../Role/role.decorator';
import { Role } from '../Role/role.enum';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Roles(Role.Admin)
  @Post('user/create')
  async signUpUser(
    @Body() userData: CreateUserDto,
    @Request() req: Request,
  ): Promise<BasicResponse> {
    console.log(req.headers['authorization']);
    return this.userService.createUser(userData);
  }

  @Get('user/signIn')
  async signInUser(@Body() userData: SignInUserDto): Promise<BasicResponse> {
    return this.userService.getUser(userData);
  }

  @Roles()
  @Get('user/signOut')
  async signOutUser(@Request() req: Request): Promise<BasicResponse> {
    return this.userService.signOut(req.headers['authorization']);
  }
}