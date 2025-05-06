import { Module } from '@nestjs/common';
import { MedicationScheduleService } from './medication-schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medication } from 'src/schemas/medication.schema';
import { User } from 'src/schemas/user.schema';
import { MedicationSchedule } from 'src/schemas/medication-schedule.schema';
import { MedicationScheduleController } from './medication-schedule.controller';
import { MedicationScheduleRepository } from './medication-schedule.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Medication, User, MedicationSchedule])],
  providers: [MedicationScheduleService, MedicationScheduleRepository],
  exports: [MedicationScheduleService],
  controllers: [MedicationScheduleController],
})
export class MedicationScheduleModule {}
