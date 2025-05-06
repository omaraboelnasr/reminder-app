import { MedicationSchedule } from 'src/schemas/medication-schedule.schema';
import { MedicationScheduleResponseDto } from './medicationResponse.dto';

export class MedicationScheduleListResponseDto {
  data: MedicationScheduleResponseDto[];
  limit: number;
  skip: number;
  totalRecords: number;
  totalPages: number;
  constructor(
    data: MedicationSchedule[],
    limit: number,
    skip: number,
    totalRecords: number,
  ) {
    this.data = data.map(
      (medication) => new MedicationScheduleResponseDto(medication),
    );
    this.limit = limit;
    this.skip = skip;
    this.totalRecords = totalRecords;
    this.totalPages = Math.ceil(totalRecords / this.limit);
  }
}
