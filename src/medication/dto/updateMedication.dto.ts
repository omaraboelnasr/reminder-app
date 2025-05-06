import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMedicationDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  dosage?: string;

  @IsString()
  @IsOptional()
  frequency?: string;

  @IsNumber()
  @IsOptional()
  duration?: number;

  @IsOptional()
  firstIntake?: Date;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;
}
