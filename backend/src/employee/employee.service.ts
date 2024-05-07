import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateEmployeeDetailsDto } from './employee.dto';
import { BasicResponse } from '../../interface/response/basic';
import errorHandler from '../../helper/errorHandler';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async updateEmployee(data: UpdateEmployeeDetailsDto): Promise<BasicResponse> {
    try {
      const dataClone: UpdateEmployeeDetailsDto = { ...data };
      delete dataClone.employee_id;

      const user = await this.prisma.employee_Details.findFirst({
        where: {
          employee_id: data.employee_id,
        },
      });

      if (user) {
        await this.prisma.employee_Details.update({
          data: {
            ...dataClone,
          },
          where: {
            employee_id: data.employee_id,
          },
        });
        return {
          status: HttpStatus.OK,
          data: 'details updated successfully',
          error: false,
        };
      } else {
        console.log(data);
        await this.prisma.employee_Details.create({
          data: {
            ...data,
            employee_id: data.employee_id,
          },
        });

        return {
          status: HttpStatus.CREATED,
          data: 'details added successfully',
          error: false,
        };
      }
    } catch (err) {
      return errorHandler(err);
    }
  }
}
