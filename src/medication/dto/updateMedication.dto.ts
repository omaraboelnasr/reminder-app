import { IsOptional, IsString } from 'class-validator';

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

  @IsString()
  @IsOptional()
  duration?: string;

  @IsOptional()
  firstIntakeDate?: Date;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;
}
