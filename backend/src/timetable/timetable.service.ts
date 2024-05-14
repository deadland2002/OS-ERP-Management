import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  ClassTimetable,
  CreateTimeTable,
  DeleteTimetable,
  TeachersTimetable,
  UpdateTimeTable,
} from './timetable.dto';
import { BasicResponse } from '../../interface/response/basic';
import errorHandler from '../../helper/errorHandler';

@Injectable()
export class TimetableService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTimeTable): Promise<BasicResponse> {
    try {
      await this.prisma.timeTable.create({
        data: {
          class_id: data.class_id,
          subject_id: data.subject_id,
          teacher_id: data.teacher_id,
          subject_name: data.subject_name,
          teacher_name: data.teacher_name,
          day: data.days,
          lecture: data.lecture,
          class_name: data.class_name,
        },
      });

      return {
        status: HttpStatus.CREATED,
        data: 'Timetable created successfully',
        error: false,
      };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async update(data: UpdateTimeTable): Promise<BasicResponse> {
    try {
      await this.prisma.timeTable.update({
        data: {
          subject_id: data.subject_id,
          teacher_id: data.teacher_id,
          subject_name: data.subject_name,
          teacher_name: data.teacher_name,
        },
        where: {
          class_id: data.class_id,
          subject_id: data.subject_id,
          teacher_id: data.teacher_id,
          teacher_id_day_lecture: {
            teacher_id: data.teacher_id,
            day: data.days,
            lecture: data.lecture,
          },
        },
      });

      return {
        status: HttpStatus.CREATED,
        data: 'Timetable created successfully',
        error: false,
      };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async get_all(): Promise<BasicResponse> {
    try {
      const subject = await this.prisma.timeTable.findMany();

      if (subject)
        return {
          status: HttpStatus.OK,
          data: subject,
          error: false,
        };
      else
        return {
          status: HttpStatus.NOT_FOUND,
          data: '',
          message: ['Timetable not found'],
          error: false,
        };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async get_by_teacher(): Promise<BasicResponse> {
    try {
      const timetable = await this.prisma.timeTable.findMany({});

      if (timetable) {
        const ans = {};

        for (const fields of timetable) {
          const temp = {
            ...fields,
          };

          const modified_name = `${fields.teacher_name} : ${fields.teacher_id}`;

          if (ans[modified_name]) {
            ans[modified_name].push(temp);
          } else {
            ans[modified_name] = [temp];
          }
        }

        return {
          status: HttpStatus.OK,
          data: ans,
          error: false,
        };
      } else
        return {
          status: HttpStatus.NOT_FOUND,
          data: '',
          message: ['Timetable not found'],
          error: false,
        };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async get_by_class(): Promise<BasicResponse> {
    try {
      const timetable = await this.prisma.timeTable.findMany({});

      if (timetable) {
        const ans = {};

        for (const fields of timetable) {
          const temp = {
            ...fields,
          };

          if (ans[fields.class_name]) {
            ans[fields.class_name].push(temp);
          } else {
            ans[fields.class_name] = [temp];
          }
        }

        return {
          status: HttpStatus.OK,
          data: ans,
          error: false,
        };
      } else
        return {
          status: HttpStatus.NOT_FOUND,
          data: '',
          message: ['Timetable not found'],
          error: false,
        };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async get_specific_teacher_only(
    data: TeachersTimetable,
  ): Promise<BasicResponse> {
    try {
      const teacher = await this.prisma.timeTable.findMany({
        where: {
          teacher_id: data.teacher_id,
        },
      });

      if (teacher)
        return {
          status: HttpStatus.OK,
          data: teacher,
          error: false,
        };
      else
        return {
          status: HttpStatus.NOT_FOUND,
          data: '',
          message: ['Timetable not found'],
          error: false,
        };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async get_specific_class_only(data: ClassTimetable): Promise<BasicResponse> {
    try {
      const tableData = await this.prisma.timeTable.findMany({
        where: {
          class_id: data.class_id,
        },
      });

      const class_data = await this.prisma.class.findFirst({
        where: {
          class_id: data.class_id,
        },
        select: {
          class_id: true,
          class_name: true,
          start_date: true,
          end_date: true,
          coordinator: true,
        },
      });

      if (tableData)
        return {
          status: HttpStatus.OK,
          data: {
            class_data,
            table_data: tableData,
          },
          error: false,
        };
      else
        return {
          status: HttpStatus.NOT_FOUND,
          data: '',
          message: ['Timetable not found'],
          error: false,
        };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async get_student_personal_timetable(token: string): Promise<BasicResponse> {
    try {
      const userObj = await this.prisma.token.findFirst({
        where: {
          token,
        },
        select: {
          user: {
            select: {
              student_Details: {
                select: {
                  class_id: true,
                },
              },
            },
          },
        },
      });

      if (!userObj)
        return {
          status: HttpStatus.NOT_FOUND,
          data: '',
          message: ['Class not found'],
          error: false,
        };

      console.log(userObj);

      return this.get_specific_class_only({
        class_id: userObj.user.student_Details.class_id,
      });
    } catch (err) {
      return errorHandler(err);
    }
  }

  async get_empty_class(): Promise<BasicResponse> {
    try {
      const classes = await this.prisma.class.findMany({
        where: {
          TimeTable: {
            none: {},
          },
        },
        select: {
          class_id: true,
          class_name: true,
        },
      });

      if (classes)
        return {
          status: HttpStatus.OK,
          data: classes,
          error: false,
        };
      else
        return {
          status: HttpStatus.NOT_FOUND,
          data: '',
          message: ['Classes not found'],
          error: false,
        };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async get_initialised_class(): Promise<BasicResponse> {
    try {
      const classes = await this.prisma.class.findMany({
        where: {
          TimeTable: {
            some: {},
          },
        },
        select: {
          class_id: true,
          class_name: true,
        },
      });

      if (classes)
        return {
          status: HttpStatus.OK,
          data: classes,
          error: false,
        };
      else
        return {
          status: HttpStatus.NOT_FOUND,
          data: '',
          message: ['Classes not found'],
          error: false,
        };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async delete(data: DeleteTimetable): Promise<BasicResponse> {
    try {
      const classes = await this.prisma.timeTable.delete({
        where: {
          teacher_id_day_lecture: {
            teacher_id: data.teacher_id,
            day: data.days,
            lecture: data.lecture,
          },
        },
      });

      if (classes)
        return {
          status: HttpStatus.OK,
          data: classes,
          error: false,
        };
      else
        return {
          status: HttpStatus.NOT_FOUND,
          data: '',
          message: ['Timetable not found'],
          error: false,
        };
    } catch (err) {
      return errorHandler(err);
    }
  }
}
