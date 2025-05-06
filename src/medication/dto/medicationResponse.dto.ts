import { Medication } from './../../schemas/medication.schema';

export class MedicationResponseDto {
  id: string;
  userId: any;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: number;
  initialStock: number;
  lowStock?: boolean;
  medicationNotes?: string;
  firstIntake?: Date;
  startDate?: Date;
  endDate?: Date;
  constructor(medication: Medication) {
    this.id = medication.id;
    this.userId = medication.user.id;
    this.medicationName = medication.medicationName;
    this.dosage = medication.dosage;
    this.frequency = medication.frequency;
    this.duration = medication.duration;
    this.initialStock = medication.initialStock;
    this.lowStock = medication.lowStock;
    this.medicationNotes = medication.medicationNotes;
    this.firstIntake = medication.firstIntake;
    this.startDate = medication.startDate;
    this.endDate = medication.endDate;
  }
}
