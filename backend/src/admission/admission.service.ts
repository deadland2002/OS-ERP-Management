import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BasicResponse } from '../../interface/response/basic';
import errorHandler from '../../helper/errorHandler';
import { StudentAdd } from './admission.dto';
import saveFile from '../../helper/saveFile';
import stringToPassword from '../../helper/stringToPassword';
import deleteFile from '../../helper/deleteFile';

@Injectable()
export class AdmissionService {
  constructor(private prisma: PrismaService) {}

  async newAdmission(
    file: Express.Multer.File[],
    data: StudentAdd,
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
          message: ['user exist'],
          error: false,
        };
      }

      imagePath = await saveFile(file);

      if (!imagePath)
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          data: '',
          message: ['student image not saved'],
          error: false,
        };

      console.log('image saved');

      await this.prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            image_url: imagePath as string,
            name: data.first_name + ' ' + data.last_name,
            email: data.email,
            password: await stringToPassword(data.mobile_no),
            mobileNo: data.mobile_no,
            role: 'STUDENT',
          },
        });

        if (!user) return false;

        const clone = structuredClone(data);
        delete clone.email;
        delete clone.mobile_no;
        delete clone.student_image;

        await tx.student_Details.create({
          data: {
            ...(clone as any),
            student_id: user.user_id,
            pincode: parseInt(clone.pincode),
            country_code: parseInt(clone.country_code),
            class_id: parseInt(clone.class_id),
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
      }
      return errorHandler(err);
    }
  }
}
