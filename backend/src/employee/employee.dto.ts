import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

class EmployeeDetailsDto {
  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  alternate_mob_number: string;

  @IsOptional()
  @IsString()
  guardian_name: string;

  @IsOptional()
  @IsString()
  guardian_relation: string;

  @IsOptional()
  @IsString()
  uid: string;

  @IsOptional()
  @IsString()
  uid_type: string;
}

export class UpdateEmployeeDetailsDto extends EmployeeDetailsDto {
  @IsNotEmpty()
  @IsNumber()
  employee_id: number;
}

export class AssignEmployeeClassDto {
  @IsNotEmpty()
  @IsNumber()
  teacher_id: number;

  @IsNotEmpty()
  @IsNumber()
  class_id: number;

  @IsOptional()
  @IsBoolean()
  override: boolean;
}

export class AssignEmployeeSubjectDto {
  @IsNotEmpty()
  @IsNumber()
  teacher_id: number;

  @IsNotEmpty()
  @IsNumber()
  subject_id: number;
}
