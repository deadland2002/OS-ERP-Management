import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateClass {
  @IsNotEmpty()
  @IsString()
  class_name: string;

  @IsOptional()
  @IsNumber()
  coordinator: number;

  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @IsNotEmpty()
  @IsNumber()
  fees_per_month: number;
}
