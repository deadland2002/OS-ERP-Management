import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class StudentAdd {
  @IsOptional()
  @IsString()
  student_image: string;

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

  @IsOptional()
  @IsString()
  alternate_no: string;

  @IsNotEmpty()
  @IsString()
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
  pincode: number;

  @IsNotEmpty()
  @IsString()
  country_code: number;

  @IsOptional()
  @IsString()
  guardian_name: number;

  @IsOptional()
  @IsString()
  guardian_relation: number;

  @IsNotEmpty()
  @IsString()
  uid: number;

  @IsNotEmpty()
  @IsString()
  class_id: number;
}
