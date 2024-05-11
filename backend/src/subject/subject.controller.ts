import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { BasicResponse } from '../../interface/response/basic';
import { SubjectService } from './subject.service';
import {
  AssignSubjectTeacher,
  CreateSubject,
  DeleteSubject,
  UpdateSubjectDetails,
  UpdateSubjectTeacher,
} from './subject.dto';
import { Roles } from '../Role/role.decorator';
import { Role } from '../Role/role.enum';

@Controller()
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Roles(Role.Admin, Role.Management)
  @Post('subject/create')
  async signUpUser(@Body() data: CreateSubject): Promise<BasicResponse> {
    return this.subjectService.create(data);
  }

  @Roles(Role.Admin, Role.Admission, Role.Management)
  @Get('subject/get_all')
  async get_all(): Promise<BasicResponse> {
    return this.subjectService.get_all();
  }

  @Roles(Role.Admin, Role.Admission, Role.Management)
  @Get('subject/get_joined')
  async get_joined(): Promise<BasicResponse> {
    return this.subjectService.get_subject_with_teacher();
  }

  @Roles(Role.Admin, Role.Management)
  @Delete('subject/delete')
  async delete_one(@Body() data: DeleteSubject): Promise<BasicResponse> {
    return this.subjectService.delete_one(data);
  }

  @Roles(Role.Admin, Role.Management)
  @Patch('subject/update_details')
  async update_details(
    @Body() data: UpdateSubjectDetails,
  ): Promise<BasicResponse> {
    return this.subjectService.update_details(data);
  }

  @Roles(Role.Admin, Role.Management)
  @Post('subject/update_teacher')
  async update_teacher(
    @Body() data: UpdateSubjectTeacher,
  ): Promise<BasicResponse> {
    return this.subjectService.update_teacher(data);
  }

  @Roles(Role.Admin, Role.Management)
  @Post('subject/assign_teacher')
  async assign_teacher(
    @Body() data: AssignSubjectTeacher,
  ): Promise<BasicResponse> {
    return this.subjectService.assign_teacher(data);
  }
}
