import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  CreateClass,
  DeleteClass,
  SingleClass,
  TransferClass,
  UpdateClassDetails,
} from './class.dto';
import { BasicResponse } from '../../interface/response/basic';
import errorHandler from '../../helper/errorHandler';

@Injectable()
export class ClassService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateClass): Promise<BasicResponse> {
    try {
      await this.prisma.class.create({
        data: {
          ...data,
        },
      });

      return {
        status: HttpStatus.CREATED,
        data: 'class created successfully',
        error: false,
      };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async delete_one(data: DeleteClass): Promise<BasicResponse> {
    try {
      await this.prisma.class.delete({
        where: {
          class_id: data.class_id,
        },
      });

      return {
        status: HttpStatus.CREATED,
        data: 'class deleted successfully',
        error: false,
      };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async update_details(data: UpdateClassDetails): Promise<BasicResponse> {
    try {
      await this.prisma.class.update({
        where: {
          class_id: data.class_id,
        },
        data: {
          ...data,
        },
      });

      return {
        status: HttpStatus.CREATED,
        data: 'class updated successfully',
        error: false,
      };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async transfer_class(data: TransferClass): Promise<BasicResponse> {
    if (data.new_class_id === data.old_class_id) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: 'New class same as old class',
        error: true,
      };
    }

    try {
      await this.prisma.student_Details.updateMany({
        where: {
          class_id: data.old_class_id,
        },
        data: {
          class_id: data.new_class_id,
        },
      });

      return {
        status: HttpStatus.CREATED,
        data: 'class transferred successfully',
        error: false,
      };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async get_all(): Promise<BasicResponse> {
    try {
      const classes = await this.prisma.class.findMany();

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

  async get_student_by_class(data: SingleClass): Promise<BasicResponse> {
    try {
      const classes = await this.prisma.student_Details.findMany({
        where: {
          class_id: data.class_id,
        },
        select: {
          first_name: true,
          last_name: true,
          student_id: true,
          rollnumber: true,
          studentRelation: {
            select: {
              image_url: true,
            },
          },
        },
      });

      if (classes) {
        return {
          status: HttpStatus.OK,
          data: classes,
          error: false,
        };
      } else
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
}
