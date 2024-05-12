import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AssignClass } from './student.dto';
import { BasicResponse } from '../../interface/response/basic';
import errorHandler from '../../helper/errorHandler';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async assign_class(data: AssignClass): Promise<BasicResponse> {
    try {
      await this.prisma.student_Details.update({
        where: {
          student_id: data.student_id,
        },
        data: {
          class_id: data.class_id,
        },
      });

      return {
        status: HttpStatus.CREATED,
        data: 'Student assigned successfully',
        error: false,
      };
    } catch (err) {
      return errorHandler(err);
    }
  }
}
