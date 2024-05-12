import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from '@prisma/client';

export class Employee_Add {
  @IsOptional()
  @IsString()
  employee_image: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  middle_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  mobile_no: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  father_name: string;

  @IsNotEmpty()
  @IsString()
  mother_name: string;

  @IsNotEmpty()
  @IsString()
  alternate_number: string;

  @IsNotEmpty()
  @IsDateString()
  date_of_birth: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  pincode: string;

  @IsNotEmpty()
  @IsString()
  country_code: string;

  @IsNotEmpty()
  @IsEnum({
    TEACHER: Role.TEACHER,
    ACCOUNTS: Role.ACCOUNTS,
    MANAGEMENT: Role.MANAGEMENT,
    ADMISSION: Role.ADMISSION,
  })
  role: Role;

  @IsOptional()
  @IsString()
  guardian_name: string;

  @IsOptional()
  @IsString()
  guardian_relation: string;

  @IsNotEmpty()
  @IsString()
  uid: string;
}

export class Employee_Update {
  @IsNotEmpty()
  @IsNumber()
  employee_id: number;

  @IsOptional()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  middle_name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsString()
  mobile_no: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  father_name: string;

  @IsOptional()
  @IsString()
  mother_name: string;

  @IsOptional()
  @IsString()
  alternate_number: string;

  @IsOptional()
  @IsDateString()
  date_of_birth: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsNumber()
  pincode: number;

  @IsOptional()
  @IsNumber()
  country_code: number;

  @IsOptional()
  @IsEnum({
    TEACHER: Role.TEACHER,
    ACCOUNTS: Role.ACCOUNTS,
    MANAGEMENT: Role.MANAGEMENT,
    ADMISSION: Role.ADMISSION,
  })
  role: Role;

  @IsOptional()
  @IsString()
  guardian_name: string;

  @IsOptional()
  @IsString()
  guardian_relation: string;

  @IsOptional()
  @IsString()
  uid: string;
}
