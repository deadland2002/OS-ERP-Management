import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  AssignEmployeeClassDto,
  AssignEmployeeSubjectDto,
  UpdateEmployeeDetailsDto,
} from './employee.dto';
import { BasicResponse } from '../../interface/response/basic';
import errorHandler from '../../helper/errorHandler';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async assignClass(data: AssignEmployeeClassDto): Promise<BasicResponse> {
    try {
    } catch (err) {
      return errorHandler(err);
    }
  }

  async assignSubject(data: AssignEmployeeSubjectDto): Promise<BasicResponse> {
    try {
    } catch (err) {
      return errorHandler(err);
    }
  }
}
