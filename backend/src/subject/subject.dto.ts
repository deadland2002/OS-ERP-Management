import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSubject {
  @IsNotEmpty()
  @IsString()
  subject_name: string;

  @IsNotEmpty()
  @IsString()
  subject_code: string;
}

export class UpdateSubjectDetails {
  @IsNotEmpty()
  @IsNumber()
  subject_id: number;

  @IsOptional()
  @IsString()
  subject_name: string;

  @IsOptional()
  @IsString()
  subject_code: string;
}

export class DeleteSubject {
  @IsNotEmpty()
  @IsNumber()
  subject_id: number;
}

export class UpdateSubjectTeacher {
  @IsNotEmpty()
  @IsNumber()
  subject_id: number;

  @IsNotEmpty()
  @IsNumber()
  old_teacher_id: number;

  @IsNotEmpty()
  @IsNumber()
  new_teacher_id: number;
}

export class AssignSubjectTeacher {
  @IsNotEmpty()
  @IsNumber()
  subject_id: number;

  @IsNotEmpty()
  @IsNumber()
  teacher_id: number;
}
