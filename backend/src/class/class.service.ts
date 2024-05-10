import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateClass } from './class.dto';
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
}
