import { Body, Controller, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { BasicResponse } from '../../interface/response/basic';
import {
  AssignEmployeeClassDto,
  AssignEmployeeSubjectDto,
  UpdateEmployeeDetailsDto,
} from './employee.dto';
import { Roles } from '../Role/role.decorator';
import { Role } from '../Role/role.enum';

@Controller()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Roles(Role.Admin)
  @Post('employee/update')
  async signUpUser(
    @Body() userData: UpdateEmployeeDetailsDto,
  ): Promise<BasicResponse> {
    return this.employeeService.updateDetails(userData);
  }

  @Roles(Role.Admin)
  @Post('employee/assign/class')
  async assignClass(
    @Body() userData: AssignEmployeeClassDto,
  ): Promise<BasicResponse> {
    return this.employeeService.assignClass(userData);
  }

  @Roles(Role.Admin)
  @Post('employee/assign/subject')
  async assignSubject(
    @Body() userData: AssignEmployeeSubjectDto,
  ): Promise<BasicResponse> {
    return this.employeeService.assignSubject(userData);
  }
}
