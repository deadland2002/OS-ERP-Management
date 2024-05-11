import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ManagementService } from './management.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Employee_Add } from './management.dto';
import { Roles } from '../Role/role.decorator';
import { Role } from '../Role/role.enum';

@Controller()
export class ManagementController {
  constructor(private readonly classService: ManagementService) {}

  @Roles(Role.Admin, Role.Management)
  @Post('employee/new')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'employee_image', maxCount: 1 }]),
  )
  async uploadFile(
    @UploadedFiles()
    files: {
      employee_image?: Express.Multer.File[];
    },
    @Body() data: Employee_Add,
  ) {
    if (
      !files ||
      !files.employee_image ||
      files.employee_image.length === 0 ||
      files.employee_image[0].size <= 1000
    ) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: '',
        message: ['employee image not found'],
        error: true,
      };
    }

    console.log(files.employee_image[0].size);

    return this.classService.new_employee(files.employee_image, data);
  }
}
