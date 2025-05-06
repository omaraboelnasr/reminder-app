import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateMedicationDTO {
  @IsString()
  @IsNotEmpty()
  medicationName: string;

  @IsString()
  @IsNotEmpty()
  dosage: string;

  @IsString()
  @IsNotEmpty()
  frequency: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  duration: number;

  @IsOptional()
  medicationNotes: string;

  @IsNumber()
  @IsNotEmpty()
  initialStock: number;

  @IsOptional()
  @IsDateString()
  firstIntake?: string;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;

  @IsOptional()
  @IsUUID()
  userId?: string;
}
