import { Body, Controller, Get, Post } from '@nestjs/common';
import { BasicResponse } from '../../interface/response/basic';
import { ClassService } from './class.service';
import { CreateClass } from './class.dto';
import { Roles } from '../Role/role.decorator';
import { Role } from '../Role/role.enum';

@Controller()
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post('class/create')
  async signUpUser(@Body() data: CreateClass): Promise<BasicResponse> {
    return this.classService.create(data);
  }

  @Roles(Role.Admin, Role.Admission)
  @Get('class/get_all')
  async get_all(): Promise<BasicResponse> {
    return this.classService.get_all();
  }
}
