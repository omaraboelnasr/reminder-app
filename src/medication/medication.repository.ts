import { Injectable } from '@nestjs/common';

import { Medication } from '../schemas/medication.schema';
import { CreateMedicationParams, UpdateMedicationParams } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/schemas/user.schema';
import { MedicationScheduleService } from 'src/medication-schedule/medication-schedule.service';

@Injectable()
export class MedicationRepository {
  constructor(
    @InjectRepository(Medication)
    private medicationRepo: Repository<Medication>,
    private medicationScheduleService: MedicationScheduleService,
  ) {}

  async createMedication(medicationData: CreateMedicationParams) {
    const medication = this.medicationRepo.create({
      ...medicationData,
      user: { id: medicationData.userId } as User,
    });
    const savedMedication = await this.medicationRepo.save(medication);
    if (
      medicationData.startDate &&
      medicationData.frequency &&
      medicationData.duration
    ) {
      await this.medicationScheduleService.generateSchedule({
        userId: medicationData.userId,
        medicationId: savedMedication.id,
        dosage: medicationData.dosage,
        frequency: medicationData.frequency,
        duration: medicationData.duration,
        startDate: medicationData.startDate,
      });
    }

    return savedMedication;
  }

  async findMedicationById(id: string) {
    return this.medicationRepo.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async updateMedication(id: string, medication: UpdateMedicationParams) {
    await this.medicationRepo.update(id, medication);
    return this.medicationRepo.findOne({ where: { id } });
  }

  async deleteMedication(id: string) {
    return this.medicationRepo.delete(id);
  }

  async getAllMedication(limit: number, skip: number, userId: string) {
    const [medications, total] = await this.medicationRepo.findAndCount({
      where: { user: { id: userId } },
      relations: ['user'],
      skip,
      take: limit,
    });
    return { medications, total };
  }
}
