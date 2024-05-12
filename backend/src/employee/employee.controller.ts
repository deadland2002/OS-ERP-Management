import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  Employee_Add,
  Employee_Update,
  GetEmployeeForTimetable,
} from './employee.dto';
import { Roles } from '../Role/role.decorator';
import { Role } from '../Role/role.enum';
import { UpdateClassDetails } from '../class/class.dto';
import { BasicResponse } from '../../interface/response/basic';

@Controller()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Roles(Role.Admin, Role.Management)
  @Post('employee/new')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'employee_image', maxCount: 1 }]),
  )
  async uploadFile(
    @UploadedFiles()
    files: {
      employee_image?: Express.Multer.File[];
    },
    @Body() data: Employee_Add,
  ) {
    if (
      !files ||
      !files.employee_image ||
      files.employee_image.length === 0 ||
      files.employee_image[0].size <= 1000
    ) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: '',
        message: ['employee image not found'],
        error: true,
      };
    }

    console.log(files.employee_image[0].size);

    return this.employeeService.new_employee(files.employee_image, data);
  }

  @Roles(Role.Admin, Role.Management)
  @Post('employee/update')
  async update_employee(@Body() data: Employee_Update): Promise<BasicResponse> {
    return this.employeeService.update_details(data);
  }

  @Roles(Role.Admin, Role.Management)
  @Get('employee/get_unassigned_coordinator')
  async get_unassigned_coordinator(): Promise<BasicResponse> {
    return this.employeeService.get_unassigned_coordinator();
  }

  @Roles(Role.Admin, Role.Management)
  @Get('employee/get_assigned_coordinator')
  async get_assigned_coordinator(): Promise<BasicResponse> {
    return this.employeeService.get_assigned_coordinator();
  }

  @Roles(Role.Admin, Role.Management)
  @Get('employee/get_free_employee_for_timetable')
  async get_free_employee_for_timetable(
    @Body() data: GetEmployeeForTimetable,
  ): Promise<BasicResponse> {
    return this.employeeService.get_free_employee_for_timetable(data);
  }
}
