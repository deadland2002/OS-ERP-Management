import { Body, Controller, Delete, Get, Post, Request } from '@nestjs/common';
import { BasicResponse } from '../../interface/response/basic';
import { TimetableService } from './timetable.service';
import {
  ClassTimetable,
  CreateTimeTable,
  DeleteTimetable,
  TeachersTimetable,
} from './timetable.dto';
import { Roles } from '../Role/role.decorator';
import { Role } from '../Role/role.enum';

@Controller()
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Roles(Role.Admin, Role.Management)
  @Post('timetable/create')
  async signUpUser(@Body() data: CreateTimeTable): Promise<BasicResponse> {
    return this.timetableService.create(data);
  }

  @Roles(Role.Admin, Role.Management)
  @Delete('timetable/delete')
  async delete(@Body() data: DeleteTimetable): Promise<BasicResponse> {
    return this.timetableService.delete(data);
  }

  @Roles(Role.Admin, Role.Admission, Role.Management)
  @Get('timetable/get_all')
  async get_all(): Promise<BasicResponse> {
    return this.timetableService.get_all();
  }

  @Roles(Role.Admin, Role.Admission, Role.Management)
  @Get('timetable/get_specific_teacher')
  async get_specific_teacher_only(
    @Body() data: TeachersTimetable,
  ): Promise<BasicResponse> {
    return this.timetableService.get_specific_teacher_only(data);
  }

  @Roles(Role.Admin, Role.Admission, Role.Management)
  @Get('timetable/get_specific_class')
  async get_specific_class_only(
    @Body() data: ClassTimetable,
  ): Promise<BasicResponse> {
    return this.timetableService.get_specific_class_only(data);
  }

  @Roles(Role.Admin, Role.Admission, Role.Management)
  @Get('timetable/order_by_class')
  async get_by_class(): Promise<BasicResponse> {
    return this.timetableService.get_by_class();
  }

  @Roles(Role.Admin, Role.Admission, Role.Management)
  @Get('timetable/order_by_teacher')
  async get_by_teacher(): Promise<BasicResponse> {
    return this.timetableService.get_by_teacher();
  }

  @Roles(Role.Admin, Role.Admission, Role.Management)
  @Get('timetable/get_empty_class')
  async get_empty_class(): Promise<BasicResponse> {
    return this.timetableService.get_empty_class();
  }

  @Roles(Role.Admin, Role.Admission, Role.Management)
  @Get('timetable/get_initialised_class')
  async get_initialised_class(): Promise<BasicResponse> {
    return this.timetableService.get_initialised_class();
  }

  @Roles(Role.Student)
  @Get('timetable/get_student_personal_timetable')
  async get_student_personal_timetable(
    @Request() req: Request,
  ): Promise<BasicResponse> {
    return this.timetableService.get_student_personal_timetable(
      req.headers['authorization'],
    );
  }
}
