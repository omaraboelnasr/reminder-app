import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addDays, addMinutes, format } from 'date-fns';
import { MedicationSchedule } from 'src/schemas/medication-schedule.schema';
import { Repository } from 'typeorm';

@Injectable()
export class MedicationScheduleService {
  constructor(
    @InjectRepository(MedicationSchedule)
    private scheduleRepo: Repository<MedicationSchedule>,
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
}
