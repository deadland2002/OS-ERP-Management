import { Controller, Post, Body } from '@nestjs/common';
import { BasicResponse } from '../../interface/response/basic';
import { ClassService } from './class.service';
import { CreateClass } from './class.dto';

@Controller()
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post('class/create')
  async signUpUser(@Body() data: CreateClass): Promise<BasicResponse> {
    return this.classService.create(data);
  }
}
