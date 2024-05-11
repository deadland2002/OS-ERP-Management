import { Body, Controller, Get, Post } from '@nestjs/common';
import { BasicResponse } from '../../interface/response/basic';
import { ClassService } from './class.service';
import {
  CreateClass,
  DeleteClass,
  TransferClass,
  UpdateClassDetails,
  UpdateClassLectures,
} from './class.dto';
import { Roles } from '../Role/role.decorator';
import { Role } from '../Role/role.enum';

@Controller()
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Roles(Role.Admin, Role.Management)
  @Post('class/create')
  async signUpUser(@Body() data: CreateClass): Promise<BasicResponse> {
    return this.classService.create(data);
  }

  @Roles(Role.Admin, Role.Admission, Role.Management)
  @Get('class/get_all')
  async get_all(): Promise<BasicResponse> {
    return this.classService.get_all();
  }

  @Roles(Role.Admin, Role.Management)
  @Post('class/delete')
  async delete_one(@Body() data: DeleteClass): Promise<BasicResponse> {
    return this.classService.delete_one(data);
  }

  @Roles(Role.Admin, Role.Management)
  @Post('class/update_details')
  async update_details(
    @Body() data: UpdateClassDetails,
  ): Promise<BasicResponse> {
    return this.classService.update_details(data);
  }

  @Roles(Role.Admin, Role.Management)
  @Post('class/transfer')
  async transfer_all(@Body() data: TransferClass): Promise<BasicResponse> {
    return this.classService.transfer_class(data);
  }
}
