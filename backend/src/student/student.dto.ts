import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignClass {
  @IsNotEmpty()
  @IsNumber()
  class_id: number;

  @IsNotEmpty()
  @IsNumber()
  student_id: number;
}
