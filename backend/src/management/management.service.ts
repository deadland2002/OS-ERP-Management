import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BasicResponse } from '../../interface/response/basic';
import errorHandler from '../../helper/errorHandler';
import { Employee_Add } from './management.dto';
import saveFile from '../../helper/saveFile';
import stringToPassword from '../../helper/stringToPassword';
import deleteFile from '../../helper/deleteFile';

@Injectable()
export class ManagementService {
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

      imagePath = await saveFile(file, 'TEACHER');

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
            role: 'TEACHER',
          },
        });

        if (!user) return false;

        const clone = structuredClone(data);
        delete clone.email;
        delete clone.mobile_no;
        delete clone.employee_image;

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
}
