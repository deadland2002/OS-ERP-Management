import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddAttendance {
  @IsNotEmpty()
  @IsNumber()
  student_id: number;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  lecture: number;

  @IsNotEmpty()
  @IsString()
  student_name: string;
}

export class DeleteAttendance {
  @IsNotEmpty()
  @IsNumber()
  student_id: number;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  lecture: number;
}

export class GetByClassAttendance {
  @IsNotEmpty()
  @IsNumber()
  class_id: number;
}
