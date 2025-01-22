import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMedicationDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  dosage: string;

  @IsString()
  @IsNotEmpty()
  frequency: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsOptional()
  firstIntakeDate?: Date;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;

  userId: string;
}
