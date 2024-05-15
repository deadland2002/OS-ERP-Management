import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  AddAttendance,
  DeleteAttendance,
  GetByClassAttendance,
} from './attendance.dto';
import { BasicResponse } from '../../interface/response/basic';
import errorHandler from '../../helper/errorHandler';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async create(data: AddAttendance, token: string): Promise<BasicResponse> {
    try {
      const teacher = await this.prisma.token.findFirst({
        where: {
          token: token,
        },
      });

      await this.prisma.attendance.create({
        data: {
          ...data,
          teacher_id: teacher.user_id,
        },
      });

      return {
        status: HttpStatus.CREATED,
        data: 'Attendance created successfully',
        error: false,
      };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async delete(data: DeleteAttendance): Promise<BasicResponse> {
    try {
      await this.prisma.attendance.delete({
        where: {
          student_id_date_lecture: {
            student_id: data.student_id,
            lecture: data.lecture,
            date: data.date,
          },
        },
      });

      return {
        status: HttpStatus.CREATED,
        data: 'Attendance deleted successfully',
        error: false,
      };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async getAll(): Promise<BasicResponse> {
    try {
      const result = await this.prisma.attendance.findMany();
      return {
        status: HttpStatus.CREATED,
        data: result,
        error: false,
      };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async getAllByClass(data: GetByClassAttendance): Promise<BasicResponse> {
    try {
      const result = await this.prisma.attendance.findMany({
        where: {
          student_relation: {
            class_id: data.class_id,
          },
        },
      });

      return {
        status: HttpStatus.OK,
        data: result,
        error: false,
      };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async getPersonal(token: string): Promise<BasicResponse> {
    try {
      const student = await this.prisma.token.findFirst({
        where: {
          token: token,
        },
        select: {
          user_id: true,
        },
      });

      const result = await this.prisma.attendance.findMany({
        where: {
          student_id: student.user_id,
        },
      });

      return {
        status: HttpStatus.OK,
        data: result,
        error: false,
      };
    } catch (err) {
      return errorHandler(err);
    }
  }
}
