import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  ClassTimetable,
  CreateTimeTable,
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
          class_id_day_lecture: {
            class_id: data.class_id,
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

          if (ans[fields.teacher_name]) {
            ans[fields.teacher_name].push(temp);
          } else {
            ans[fields.teacher_name] = [temp];
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
      const subject = await this.prisma.timeTable.findMany({
        where: {
          class_id: data.class_id,
        },
      });

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
}