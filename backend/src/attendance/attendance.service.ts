import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  AddAttendance,
  AddBulkAttendance,
  DeleteAttendance,
  GetByClassAttendance,
  GetByFilteredAttendance,
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
          student_id: data.student_id,
          teacher_id: teacher.user_id,
          date: data.date,
          lecture: data.lecture,
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

  async createBulk(
    data: AddBulkAttendance,
    token: string,
  ): Promise<BasicResponse> {
    try {
      const teacher = await this.prisma.token.findFirst({
        where: {
          token: token,
        },
      });

      const all_arr = [];
      for (const lecture of data.lectures) {
        for (const id of data.student_id) {
          all_arr.push({
            student_id: id,
            teacher_id: teacher.user_id,
            date: data.date.split('T')[0],
            lecture: lecture,
          });
        }
      }

      console.log(all_arr);

      await this.prisma.attendance.createMany({
        data: all_arr,
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

  async getAllFiltered(data: GetByFilteredAttendance): Promise<BasicResponse> {
    try {
      let result = [];

      if (data.type === 'ABSENT') {
        result = await this.prisma.attendance.findMany({
          where: {
            student_relation: {
              class_id: data.class_id,
            },
            lecture: {
              in: data.lecture,
            },
            date: data.date,
          },
          include: {
            student_relation: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
          },
        });
      } else {
        result = await this.prisma.student_Details.findMany({
          where: {
            Attendance: {
              none: {
                lecture: {
                  in: data.lecture,
                },
                date: data.date,
              },
            },
            class_id: data.class_id,
          },
        });
      }

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
