import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicationSchedule } from 'src/schemas/medication-schedule.schema';

@Injectable()
export class MedicationScheduleRepository {
  constructor(
    @InjectRepository(MedicationSchedule)
    private MedicationScheduleRepo: Repository<MedicationSchedule>,
  ) {}

  async findMedicationScheduleById(id: string) {
    return this.MedicationScheduleRepo.findOne({
      where: { id },
      relations: ['user', 'medication'],
    });
  }

  async getAllMedicationSchedule(
    limit: number,
    skip: number,
    medicationId: string,
  ) {
    const [medications, total] = await this.MedicationScheduleRepo.findAndCount(
      {
        where: { medication: { id: medicationId } },
        relations: ['user', 'medication'],
        skip,
        take: limit,
      },
    );
    return { medications, total };
  }
}
