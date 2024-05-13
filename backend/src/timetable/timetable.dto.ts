import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Days } from '@prisma/client';

export class CreateTimeTable {
  @IsNotEmpty()
  @IsNumber()
  class_id: number;

  @IsNotEmpty()
  @IsString()
  class_name: string;

  @IsNotEmpty()
  @IsEnum(Days)
  days: Days;

  @IsNotEmpty()
  @IsNumber()
  lecture: number;

  @IsNotEmpty()
  @IsNumber()
  subject_id: number;

  @IsNotEmpty()
  @IsNumber()
  teacher_id: number;

  @IsNotEmpty()
  @IsString()
  subject_name: string;

  @IsNotEmpty()
  @IsString()
  teacher_name: string;
}

export class UpdateTimeTable {
  @IsNotEmpty()
  @IsString()
  class_id: number;

  @IsNotEmpty()
  @IsEnum(Days)
  days: Days;

  @IsNotEmpty()
  @IsNumber()
  lecture: number;

  @IsNotEmpty()
  @IsNumber()
  subject_id: number;

  @IsNotEmpty()
  @IsNumber()
  teacher_id: number;

  @IsNotEmpty()
  @IsString()
  subject_name: string;

  @IsNotEmpty()
  @IsString()
  teacher_name: string;
}

export class TeachersTimetable {
  @IsNotEmpty()
  @IsNumber()
  teacher_id: number;
}

export class ClassTimetable {
  @IsNotEmpty()
  @IsNumber()
  class_id: number;
}

export class DeleteTimetable {
  @IsNotEmpty()
  @IsEnum(Days)
  days: Days;

  @IsNotEmpty()
  @IsNumber()
  teacher_id: number;

  @IsNotEmpty()
  @IsNumber()
  lecture: number;
}
