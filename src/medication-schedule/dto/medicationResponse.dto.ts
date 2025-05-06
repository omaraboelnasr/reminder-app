import { MedicationSchedule } from 'src/schemas/medication-schedule.schema';

export class MedicationScheduleResponseDto {
  id: string;
  userId: any;
  medication: any;
  dosage: string;
  date: Date;
  time: string;
  isNotified: boolean;
  constructor(MedicationSchedule: MedicationSchedule) {
    this.id = MedicationSchedule.id;
    this.userId = MedicationSchedule.user.id;
    this.medication = MedicationSchedule.medication;
    this.dosage = MedicationSchedule.dosage;
    this.date = MedicationSchedule.date;
    this.time = MedicationSchedule.time;
    this.isNotified = MedicationSchedule.isNotified;
  }
}
