import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AdmissionService } from './admission.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { StudentAdd } from './admission.dto';

@Controller()
export class AdmissionController {
  constructor(private readonly classService: AdmissionService) {}

  // @Roles(Role.Admin, Role.Admission)
  @Post('admission/new')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'student_image', maxCount: 1 }]),
  )
  async uploadFile(
    @UploadedFiles()
    files: {
      student_image?: Express.Multer.File[];
    },
    @Body() data: StudentAdd,
  ) {
    if (
      !files ||
      !files.student_image ||
      files.student_image.length === 0 ||
      files.student_image[0].size <= 1000
    ) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: '',
        message: ['student image not found'],
        error: false,
      };
    }

    console.log(files.student_image[0].size);

    return this.classService.newAdmission(files.student_image, data);
  }
}
