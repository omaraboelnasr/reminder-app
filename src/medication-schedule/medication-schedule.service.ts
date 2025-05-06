import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { addDays, addMinutes, format } from 'date-fns';
import { MedicationSchedule } from 'src/schemas/medication-schedule.schema';
import { MedicationScheduleRepository } from './medication-schedule.repository';
import { ListMedicationScheduleParams } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MedicationScheduleService {
  constructor(
    @InjectRepository(MedicationSchedule)
    private scheduleRepo: Repository<MedicationSchedule>,
    private MedicationScheduleRepository: MedicationScheduleRepository,
  ) {}

  async generateSchedule({
    userId,
    medicationId,
    dosage,
    frequency,
    duration,
    startDate,
  }) {
    const schedules: MedicationSchedule[] = [];
    const intervalMinutes = Math.floor((24 * 60) / frequency); // e.g., 3/day → every 480 minutes

    for (let day = 0; day < duration; day++) {
      for (let dose = 0; dose < frequency; dose++) {
        const doseTime = addMinutes(
          addDays(startDate, day),
          dose * intervalMinutes,
        );
        const schedule = this.scheduleRepo.create({
          user: { id: userId },
          medication: { id: medicationId },
          dosage,
          date: doseTime,
          time: format(doseTime, 'HH:mm'),
          isNotified: false,
        });

        schedules.push(schedule);
      }
    }

    await this.scheduleRepo.save(schedules);
    return schedules;
  }

  async getMedicationSchedule(id: string, userId: string) {
    try {
      const existingMedicationSchedule =
        await this.MedicationScheduleRepository.findMedicationScheduleById(id);
      if (!existingMedicationSchedule) {
        throw new NotFoundException(
          `Medication schedule with ID "${id}" not found`,
        );
      }
      if (existingMedicationSchedule.user.id !== userId) {
        throw new UnauthorizedException(
          'You are not authorized to get this medication',
        );
      }
      return existingMedicationSchedule;
    } catch (error) {
      throw error;
    }
  }

  async getAllMedicationSchedule(
    params: ListMedicationScheduleParams,
    userId: string,
    medicationId: string,
  ) {
    try {
      const safeLimit = Math.min(params.limit, 20);
      const { medications, total } =
        await this.MedicationScheduleRepository.getAllMedicationSchedule(
          safeLimit,
          params.skip,
          medicationId,
        );
      if (medications[0].user.id !== userId) {
        throw new UnauthorizedException(
          'You are not authorized to get this medication',
        );
      }
      return { data: medications, limit: safeLimit, skip: params.skip, total };
    } catch (error) {
      throw error;
    }
  }
}
