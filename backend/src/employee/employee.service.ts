import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BasicResponse } from '../../interface/response/basic';
import errorHandler from '../../helper/errorHandler';
import {
  Employee_Add,
  Employee_Update,
  GetEmployeeForTimetable,
} from './employee.dto';
import saveFile from '../../helper/saveFile';
import stringToPassword from '../../helper/stringToPassword';
import deleteFile from '../../helper/deleteFile';
import { UpdateClassDetails } from '../class/class.dto';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async new_employee(
    file: Express.Multer.File[],
    data: Employee_Add,
  ): Promise<BasicResponse> {
    let imagePath: string | boolean = false;

    try {
      const user = await this.prisma.user.findFirst({
        where: {
          OR: [{ email: data.email }, { mobileNo: data.mobile_no }],
        },
      });

      if (user) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: '',
          message: ['employee exist'],
          error: false,
        };
      }

      imagePath = await saveFile(file, data.role);

      if (!imagePath)
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          data: '',
          message: ['teacher image not saved'],
          error: false,
        };

      console.log('image saved', imagePath);

      await this.prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            image_url: imagePath as string,
            name: data.first_name + ' ' + data.last_name,
            email: data.email,
            password: await stringToPassword(data.mobile_no),
            mobileNo: data.mobile_no,
            role: data.role,
          },
        });

        if (!user) return false;

        const clone = structuredClone(data);
        delete clone.email;
        delete clone.mobile_no;
        delete clone.employee_image;
        delete clone.role;

        await tx.employee_Details.create({
          data: {
            ...(clone as any),
            employee_id: user.user_id,
            pincode: parseInt(clone.pincode),
            country_code: parseInt(clone.country_code),
          },
        });
      });

      console.log('user created');

      return {
        status: HttpStatus.OK,
        data: 'created',
        error: false,
      };
    } catch (err) {
      console.log('error occured');
      if (imagePath) {
        await deleteFile(imagePath);
        console.log('file deleted', imagePath);
      }
      return errorHandler(err);
    }
  }

  async update_details(data: Employee_Update): Promise<BasicResponse> {
    try {
      const { employee_id, ...rest } = data;
      await this.prisma.employee_Details.update({
        where: {
          employee_id: employee_id,
        },
        data: {
          ...rest,
        },
      });

      return {
        status: HttpStatus.CREATED,
        data: 'Employee updated successfully',
        error: false,
      };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async get_unassigned_coordinator(): Promise<BasicResponse> {
    try {
      const list = await this.prisma.employee_Details.findMany({
        where: {
          coordinatorRelation: {
            none: {},
          },
        },
        select: {
          employee_id: true,
          first_name: true,
          last_name: true,
        },
      });

      return {
        status: HttpStatus.OK,
        data: list,
        error: false,
      };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async get_assigned_coordinator(): Promise<BasicResponse> {
    try {
      const list = await this.prisma.employee_Details.findMany({
        where: {
          coordinatorRelation: {
            some: {},
          },
        },
        select: {
          employee_id: true,
          first_name: true,
          last_name: true,
          coordinatorRelation: {
            select: {
              class_id: true,
              class_name: true,
            },
          },
        },
      });

      return {
        status: HttpStatus.OK,
        data: list,
        error: false,
      };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async get_free_employee_for_timetable(
    data: GetEmployeeForTimetable,
  ): Promise<BasicResponse> {
    try {
      const list = await this.prisma.employee_Details.findMany({
        where: {
          TimeTable: {
            none: {
              day: data.day,
              lecture: data.lecture,
            },
          },
          employeeRelation: {
            role: 'TEACHER',
          },
        },
        select: {
          employee_id: true,
          first_name: true,
          last_name: true,
        },
      });

      const newList = [];
      for (const entry of list)
        newList.push({
          id: entry.employee_id,
          name:
            entry.first_name +
            ' ' +
            entry.last_name +
            ' : ' +
            entry.employee_id,
        });

      return {
        status: HttpStatus.OK,
        data: newList,
        error: false,
      };
    } catch (err) {
      return errorHandler(err);
    }
  }
}
