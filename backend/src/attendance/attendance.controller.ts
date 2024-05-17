import {Body, Controller, Delete, Get, Post, Request} from '@nestjs/common';
import {BasicResponse} from '../../interface/response/basic';
import {AttendanceService} from './attendance.service';
import {AddAttendance, AddBulkAttendance, DeleteAttendance, GetByClassAttendance,} from './attendance.dto';
import {Roles} from '../Role/role.decorator';
import {Role} from '../Role/role.enum';

@Controller()
export class AttendanceController {
  constructor(private readonly classService: AttendanceService) {}

  @Roles(Role.Management , Role.Teacher)
  @Post('attendance/create')
  async signUpUser(
    @Body() data: AddAttendance,
    @Request() req: Request,
  ): Promise<BasicResponse> {
    return this.classService.create(data, req.headers['authorization']);
  }

  @Roles(Role.Management , Role.Teacher)
  @Post('attendance/create_bulk')
  async createBulk(
    @Body() data: AddBulkAttendance,
    @Request() req: Request,
  ): Promise<BasicResponse> {
    return this.classService.createBulk(data, req.headers['authorization']);
  }

  @Roles(Role.Admin, Role.Management)
  @Get('attendance/get_all')
  async getAll(): Promise<BasicResponse> {
    return this.classService.getAll();
  }

  @Roles(Role.Admin, Role.Management)
  @Delete('attendance/delete')
  async delete(@Body() data: DeleteAttendance): Promise<BasicResponse> {
    return this.classService.delete(data);
  }

  @Roles(Role.Admin, Role.Management)
  @Get('attendance/get_attendance_by_class')
  async getAllByClass(
    @Body() data: GetByClassAttendance,
  ): Promise<BasicResponse> {
    return this.classService.getAllByClass(data);
  }

  @Roles(Role.Student)
  @Get('attendance/get_attendance_personal')
  async getPersonal(@Request() req: Request): Promise<BasicResponse> {
    return this.classService.getPersonal(req.headers['authorization']);
  }
}
