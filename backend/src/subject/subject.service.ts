import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  AssignSubjectTeacher,
  CreateSubject,
  DeleteSubject,
  UpdateSubjectDetails,
  UpdateSubjectTeacher,
} from './subject.dto';
import { BasicResponse } from '../../interface/response/basic';
import errorHandler from '../../helper/errorHandler';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSubject): Promise<BasicResponse> {
    try {
      await this.prisma.subject.create({
        data: {
          ...data,
        },
      });

      return {
        status: HttpStatus.CREATED,
        data: 'Subject created successfully',
        error: false,
      };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async delete_one(data: DeleteSubject): Promise<BasicResponse> {
    try {
      await this.prisma.subject.delete({
        where: {
          subject_id: data.subject_id,
        },
      });

      return {
        status: HttpStatus.CREATED,
        data: 'Subject deleted successfully',
        error: false,
      };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async update_details(data: UpdateSubjectDetails): Promise<BasicResponse> {
    try {
      const clone = structuredClone(data);
      delete clone.subject_id;
      await this.prisma.subject.update({
        where: {
          subject_id: data.subject_id,
        },
        data: {
          ...clone,
        },
      });

      return {
        status: HttpStatus.CREATED,
        data: 'Subject updated successfully',
        error: false,
      };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async update_teacher(data: UpdateSubjectTeacher): Promise<BasicResponse> {
    if (data.old_teacher_id === data.new_teacher_id) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: 'New teacher same as old class',
        error: true,
      };
    }

    try {
      const result = await this.prisma.teaches.update({
        where: {
          teacher_id_subject_id: {
            teacher_id: data.old_teacher_id,
            subject_id: data.subject_id,
          },
        },
        data: {
          teacher_id: data.new_teacher_id,
        },
      });

      if (!result)
        return {
          status: HttpStatus.NOT_FOUND,
          data: 'Record not found',
          error: false,
        };

      return {
        status: HttpStatus.CREATED,
        data: 'Teacher updated successfully',
        error: false,
      };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async assign_teacher(data: AssignSubjectTeacher): Promise<BasicResponse> {
    try {
      const result = await this.prisma.teaches.create({
        data: {
          teacher_id: data.teacher_id,
          subject_id: data.subject_id,
        },
      });

      if (!result)
        return {
          status: HttpStatus.BAD_REQUEST,
          data: 'Teacher not assigned',
          error: false,
        };

      return {
        status: HttpStatus.CREATED,
        data: 'Teacher assigned successfully',
        error: false,
      };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async get_subject_with_teacher(): Promise<BasicResponse> {
    try {
      const subject_with_teacher = await this.prisma.teaches.findMany({
        include: {
          teacherRelation: {
            select: {
              father_name: true,
              middle_name: true,
              last_name: true,
            },
          },
          subjectRelation: {
            select: {
              subject_name: true,
              subject_code: true,
            },
          },
        },
      });

      if (subject_with_teacher)
        return {
          status: HttpStatus.OK,
          data: subject_with_teacher,
          error: false,
        };
      else
        return {
          status: HttpStatus.NOT_FOUND,
          data: '',
          message: ['Subject not found'],
          error: false,
        };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async get_all(): Promise<BasicResponse> {
    try {
      const subject = await this.prisma.subject.findMany();

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
          message: ['Subject not found'],
          error: false,
        };
    } catch (err) {
      return errorHandler(err);
    }
  }
}
