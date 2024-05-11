import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsNumber()
  total_months: number;
}

export class UpdateClassDetails {
  @IsNotEmpty()
  @IsNumber()
  class_id: number;

  @IsOptional()
  @IsString()
  class_name: string;

  @IsOptional()
  @IsNumber()
  coordinator: number;

  @IsOptional()
  @IsNumber()
  capacity: number;

  @IsOptional()
  @IsNumber()
  fees_per_month: number;

  @IsOptional()
  @IsNumber()
  total_lectures: number;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsNumber()
  total_months: number;
}

export class DeleteClass {
  @IsNotEmpty()
  @IsNumber()
  class_id: number;
}

export class UpdateClassLectures {
  @IsNotEmpty()
  @IsNumber()
  class_id: number;

  @IsNotEmpty()
  @IsNumber()
  total_lectures: number;
}

export class TransferClass {
  @IsNotEmpty()
  @IsNumber()
  old_class_id: number;

  @IsNotEmpty()
  @IsNumber()
  new_class_id: number;
}
