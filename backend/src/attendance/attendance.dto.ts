import { IsArray, IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

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
}

export class AddBulkAttendance {
  @IsNotEmpty()
  @IsArray()
  student_id: number[];

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsArray()
  lectures: number[];
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
