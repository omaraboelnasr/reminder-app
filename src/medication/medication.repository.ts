import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Medication } from './schemas/medication.schema';
import { CreateMedicationParams, UpdateMedicationParams } from './types';

@Injectable()
export class MedicationRepository {
  constructor(
    @InjectModel(Medication.name) private medicationModel: Model<Medication>,
  ) {}

  async createMedication(medication: CreateMedicationParams) {
    const newMedication = new this.medicationModel(medication);
    return newMedication.save();
  }

  async findMedicationById(id: string) {
    return this.medicationModel.findById(id).exec();
  }

  async updateMedication(id: string, medication: UpdateMedicationParams) {
    return this.medicationModel.findByIdAndUpdate(id, medication, {
      new: true,
    });
  }

  async deleteMedication(id: string) {
    return this.medicationModel.findByIdAndDelete(id);
  }
}
