import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

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

enum attendanceType {
  ABSENT = 'ABSENT',
  PRESENT = 'PRESENT',
}

export class GetByFilteredAttendance {
  @IsNotEmpty()
  @IsNumber()
  class_id: number;

  @IsNotEmpty()
  @IsArray()
  lecture: number[];

  @IsNotEmpty()
  @IsEnum(attendanceType)
  type: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;
}
