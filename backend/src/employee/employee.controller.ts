import { Body, Controller, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { BasicResponse } from '../../interface/response/basic';
import { UpdateEmployeeDetailsDto } from './employee.dto';
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
    return this.employeeService.updateEmployee(userData);
  }
}
