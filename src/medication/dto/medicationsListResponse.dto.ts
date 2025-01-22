import { MedicationResponseDto } from './medicationResponse.dto';
import { Medication } from 'src/schemas/medication.schema';

export class MedicationListResponseDto {
  data: MedicationResponseDto[];
  limit: number;
  skip: number;
  totalRecords: number;
  totalPages: number;
  constructor(
    data: Medication[],
    limit: number,
    skip: number,
    totalRecords: number,
  ) {
    this.data = data.map((medication) => new MedicationResponseDto(medication));
    this.limit = limit;
    this.skip = skip;
    this.totalRecords = totalRecords;
    this.totalPages = Math.ceil(totalRecords / this.limit);
  }
}
