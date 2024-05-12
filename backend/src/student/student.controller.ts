import { Body, Controller, Post } from '@nestjs/common';
import { BasicResponse } from '../../interface/response/basic';
import { StudentService } from './student.service';
import { AssignClass } from './student.dto';
import { Roles } from '../Role/role.decorator';
import { Role } from '../Role/role.enum';

@Controller()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Roles(Role.Admin, Role.Management)
  @Post('student/assign_class')
  async signUpUser(@Body() data: AssignClass): Promise<BasicResponse> {
    return this.studentService.assign_class(data);
  }
}
