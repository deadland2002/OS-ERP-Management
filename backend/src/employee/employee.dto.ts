import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
