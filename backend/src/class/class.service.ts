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
}
