import { Medication } from './../../schemas/medication.schema';

export class MedicationResponseDto {
  _id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  userId: string;
  firstIntakeDate?: Date;
  startDate?: Date;
  endDate?: Date;
  constructor(medication: Medication) {
    this._id = medication._id.toString();
    this.name = medication.name;
    this.dosage = medication.dosage;
    this.frequency = medication.frequency;
    this.duration = medication.duration;
    this.userId = medication.userId.toString();
    this.firstIntakeDate = medication.firstIntakeDate;
    this.startDate = medication.startDate;
    this.endDate = medication.endDate;
  }
}
